/*
 * @Author: xx
 * @Date: 2023-03-29 16:40:54
 * @LastEditTime: 2023-03-29 17:26:11
 * @Description: 
 */

import { sys } from "cc"
import { GG } from "../../GG"
import { StringUtil } from "../utils/StringUtil"

/**
 * 获取和处理浏览器地址栏参数
 * @example
 * config.query.data.username
 */
export class GameQueryConfig {
    /** 调试模式开关 */
    public get debug(): string {
        return this._data["debug"]
    }

    /** 玩家帐号名 */
    public get username(): string {
        return this._data["username"]
    }

    /** 语言 */
    public get lang(): string {
        return this._data["lang"] || "zh"
    }

    private _data: any = null
    /** 浏览器地址栏原始参数 */
    public get data(): any {
        return this._data
    }

    /** 构造函数 */
    constructor() {
        if (!sys.isBrowser) {
            this._data = {}
            return
        }
        this._data = this.parseUrl()

        if (!this._data["username"]) {
            this._data["username"] = StringUtil.guid()
        }

        GG.log.logConfig(this._data, "查询参数")
    }

    private parseUrl() {
        if (typeof window !== "object") return {}
        if (!window.document) return {}

        let url = window.document.location.href.toString()
        let u = url.split("?")
        if (typeof (u[1]) == "string") {
            u = u[1].split("&")
            let get: any = {}
            for (let i = 0, l = u.length; i < l; ++i) {
                let j = u[i]
                let x = j.indexOf("=")
                if (x < 0) {
                    continue
                }
                let key = j.substring(0, x)
                let value = j.substring(x + 1)
                get[decodeURIComponent(key)] = value && decodeURIComponent(value)
            }
            return get
        }
        else {
            return {}
        }
    }
}