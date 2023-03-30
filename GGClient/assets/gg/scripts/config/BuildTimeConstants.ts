/*
 * @Author: xx
 * @Date: 2023-03-29 15:27:42
 * @LastEditTime: 2023-03-29 17:20:11
 * @Description: 游戏运行环境
 */

import * as buildTimeConstants from 'cc/env'

const keys = (Object.keys(buildTimeConstants) as (keyof typeof buildTimeConstants)[]).sort()

export class BuildTimeConstants {
    constructor() {
        
        const keyNameMaxLen = keys.reduce((len, key) => Math.max(len, key.length), 0)
        var enviroment = `${keys.map((key) => {
            const value =  buildTimeConstants[key]
            const valueRep = typeof value == 'boolean' ? (value ? 'ture' : 'false') : value
            const paddedKey = key.toString().padStart ? key.toString().padStart(keyNameMaxLen, ' ') : key.toString()
            return `\n${paddedKey} : ${valueRep}`
        })}`
        

        console.log(enviroment)
    }
}