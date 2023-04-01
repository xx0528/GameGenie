/*
 * @Author: xx
 * @Date: 2021-08-11 16:41:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-04-01 19:21:27
 */

import { Component, _decorator } from 'cc'
import { EffectSingleCase } from './EffectSingleCase'
const { ccclass, property } = _decorator

/** 延时释放特效 */
@ccclass('EffectDelayRelease')
export class EffectDelayRelease extends Component {
    /** 延时释放时间(单位秒) */
    @property
    public delay: number = 1

    protected onEnable() {
        this.scheduleOnce(this.onDelay, this.delay)
    }

    private onDelay() {
        EffectSingleCase.instance.put(this.node)
    }
}
