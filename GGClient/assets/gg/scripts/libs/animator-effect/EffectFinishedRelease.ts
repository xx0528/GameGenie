/*
 * @Author: xx
 * @Date: 2022-08-19 15:36:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-04-01 19:21:40
 */

import { Animation, Component, ParticleSystem, _decorator, sp } from 'cc'
import { GG } from '../../../GG'
import { EffectEvent } from './EffectEvent'

const { ccclass, property } = _decorator

/** 动画播放完释放特效 - Animation、ParticleSystem */
@ccclass('EffectFinishedRelease')
export class EffectFinishedRelease extends Component {
    /** 动画最大播放时间 */
    private maxDuration: number = 0

    protected onEnable() {
        // SPINE动画
        let spine = this.getComponent(sp.Skeleton)
        if (spine) {
            // 播放第一个动画
            let json = (spine.skeletonData.skeletonJson as any).animations
            for (var name in json) {
                spine.setCompleteListener(this.onRecovery.bind(this))
                spine.setAnimation(0, name, false)
                break
            }
        }
        else {
            // COCOS动画
            let anims: Animation[] = this.node.getComponentsInChildren(Animation)
            if (anims.length > 0) {
                anims.forEach(animator => {
                    let aniName = animator.defaultClip?.name
                    if (aniName) {
                        let aniState = animator.getState(aniName)
                        if (aniState) {
                            let duration = aniState.duration
                            this.maxDuration = duration > this.maxDuration ? duration : this.maxDuration
                        }
                    }
                    animator.play()
                })
                this.scheduleOnce(this.onRecovery.bind(this), this.maxDuration)
            }
            // 粒子动画
            else if (ParticleSystem) {
                let particles: ParticleSystem[] = this.node.getComponentsInChildren(ParticleSystem)
                particles.forEach(particle => {
                    particle.clear()
                    particle.stop()
                    particle.play()

                    let duration: number = particle.duration
                    this.maxDuration = duration > this.maxDuration ? duration : this.maxDuration
                })
                this.scheduleOnce(this.onRecovery.bind(this), this.maxDuration)
            }
        }
    }

    private onRecovery() {
        if (this.node.parent) GG.eventMgr.dispatchEvent(EffectEvent.Put, this.node)
    }
}
