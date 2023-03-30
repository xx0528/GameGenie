/*
 * @Author: xx
 * @Date: 2023-03-14 18:39:24
 * @LastEditTime: 2023-03-29 18:28:47
 * @Description: 
 */
import { AudioManager } from "./scripts/audio/AudioMgr"
import { Config } from "./scripts/config/Config"
import { LanguageMgr } from "./scripts/language/LanguageMgr"
import { Logger } from "./scripts/log/Logger"
import { HttpRequest } from "./scripts/network/HttpRequest"
import { StorageMgr } from "./scripts/storage/StorageMgr"
import { TimerMgr } from "./scripts/timer/TimerMgr"

export class GG {
    /** 配置 */
    static cfg = new Config()
    /** 日志 */
    static log = Logger
    /** 本地存储 */
    static storage: StorageMgr = new StorageMgr()
    /** 游戏时间管理 */
    static timer: TimerMgr
    /** 游戏音乐管理 */
    static audio: AudioManager
    /** 多语言模块 */
    static language: LanguageMgr
    /** HTTP */
    static http: HttpRequest = new HttpRequest()
}


