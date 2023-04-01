/*
 * @Author: xx
 * @Date: 2023-03-14 18:39:24
 * @LastEditTime: 2023-04-01 18:52:08
 * @Description: 
 */
import { ecs } from "./scripts/libs/ecs/ECS"
import { ECSRootSystem } from "./scripts/libs/ecs/ECSSystem"
import { AudioManager } from "./scripts/common/audio/AudioMgr"
import { Config } from "./scripts/config/Config"
import { EventMgr } from "./scripts/common/event/EventMgr"
import { LanguageMgr } from "./scripts/libs/language/LanguageMgr"
import { ResLoader } from "./scripts/common/loader/ResLoader"
import { Logger } from "./scripts/common/log/Logger"
import { HttpRequest } from "./scripts/libs/network/HttpRequest"
import { StorageMgr } from "./scripts/common/storage/StorageMgr"
import { TimerMgr } from "./scripts/common/timer/TimerMgr"
import UIMgr from "./scripts/ui/UIMgr"

export class GG {
    /** 配置 */
    static cfg = new Config()
    /** 日志 */
    static log = Logger
    /** 全局消息 */
    static eventMgr: EventMgr
    /** 本地存储 */
    static storage: StorageMgr = new StorageMgr()
    /** 游戏时间管理 */
    static timer: TimerMgr
    /** 游戏音乐管理 */    
    static audio: AudioManager
    /** 2d界面管理 */
    static uiMgr: UIMgr
    /** 资源管理 */
    static res = new ResLoader()
    /** 多语言模块 */
    static language: LanguageMgr
    /** HTTP */
    static http: HttpRequest = new HttpRequest()
    /** ECS */
    static ecs: ECSRootSystem = new ecs.RootSystem()
}


