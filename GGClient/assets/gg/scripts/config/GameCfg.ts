/*
 * @Author: xx
 * @Date: 2023-03-29 16:24:25
 * @LastEditTime: 2023-03-31 18:28:19
 * @Description: 游戏配置解析
 */

import { GG } from "../../GG"

/** 对应resources/config/config.json文件 */
export class GameCfg {

    /** 客户端版本号配置 */
    get version(): string {
        return this._data.config.version
    }
    /** 包名 */
    get package(): string {
        return this._data.config.package
    }
    /** 游戏每秒传输帧数 */
    get frameRate(): string {
        return this._data.config.frameRate
    }
    /** 本地存储内容加密 key */
    get localDataKey(): string {
        return this._data.config.localDataKey 
    }
    /** 本地存储内容加密 iv */
    get localDataIv(): string {
        return this._data.config.localDataIv 
    }
    /** Http 服务器地址 */
    get httpServer(): string {
        return this._data.config.httpServer 
    }
    /** Http 请求超时时间 */
    get httpTimeout(): number {
        return this._data.config.httpTimeout 
    }

    /** 获取当前客户端支持的语言类型 */
    get language(): Array<string> {
        return this._data.language.type || ["zh"] 
    }
    /** 获取当前客户端支持的语言 Json 配置路径 */
    get languagePathJson(): string {
        return this._data.language.path.json || "language/json" 
    }
    /** 获取当前客户端支持的语言纹理配置路径 */
    get languagePathTexture(): string {
        return this._data.language.path.texture || "language/texture" 
    }

    /** 是否启用远程资源 */
    get bundleEnable(): string {
        return this._data.bundle.enable 
    }
    /** 远程资源服务器地址 */
    get bundleServer(): string {
        return this._data.bundle.server 
    }
    /** 远程资源名 */
    get bundleName(): string {
        return this._data.bundle.name 
    }
    /** 远程资源版本号 */
    get bundleVersion(): string {
        return this._data.bundle.version 
    }

    private _data: any = null 
    /** 游戏配置数据 */
    public get data(): any {
        return this._data 
    }
    constructor(config: any) {
        let data = config.json
        this._data = Object.freeze(data)

        GG.log.logConfig(this._data, "游戏配置")
    }
}
    
