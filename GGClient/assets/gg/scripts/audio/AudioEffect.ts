/*
 * @Author: xx
 * @Date: 2023-03-14 18:39:25
 * @LastEditTime: 2023-03-29 19:05:18
 * @Description: 音效
 */

import { AudioClip, AudioSource, error, _decorator } from 'cc'
const { ccclass, menu } = _decorator

/**
 * 注：用playOneShot播放的音乐效果，在播放期间暂时没办法即时关闭音乐
 */

/** 游戏音效 */
@ccclass('AudioEffect')
export class AudioEffect extends AudioSource {
    private effects: Map<string, AudioClip> = new Map<string, AudioClip>()

    /**
     * 加载音效并播放
     * @param url           音效资源地址
     * @param callback      资源加载完成并开始播放回调
     */
    load(url: string, callback?: Function) {
        // GG.res.load(url, AudioClip, (err: Error | null, data: AudioClip) => {
        //     if (err) {
        //         error(err)
        //     }

        //     this.effects.set(url, data)
        //     this.playOneShot(data, this.volume)
        //     callback && callback()
        // })
    }

    /** 释放所有已使用过的音效资源 */
    release() {
        // for (let key in this.effects) {
        //     GG.res.release(key)
        // }
        this.effects.clear()
    }
}
