/*
 * @Author: xx
 * @Date: 2023-03-29 16:24:25
 * @LastEditTime: 2023-03-29 17:24:28
 * @Description: 
 */
import { IProtocolHelper, IRequestProtocol, IResponseProtocol, NetData } from "./NetInterface"

var unzip = function (str: string) {
    let charData = str.split('').map(function (x) {
        return x.charCodeAt(0)
    })
    let binData = new Uint8Array(charData)
    //@ts-ignore
    let data = pako.inflate(binData, { to: 'string' })
    return data
}

var zip = function (str: string) {
    //@ts-ignore
    let binaryString = pako.gzip(str, { to: 'string' })
    return binaryString
}

/** Pako.js 数据压缩协议 */
export class NetProtocolPako implements IProtocolHelper {
    getHeadlen(): number {
        return 0
    }

    getHearbeat(): NetData {
        return ""
    }

    getPackageLen(msg: NetData): number {
        return msg.toString().length
    }

    checkResponsePackage(respProtocol: IResponseProtocol): boolean {
        return true
    }

    handlerResponsePackage(respProtocol: IResponseProtocol): boolean {
        if (respProtocol.code == 1) {
            if (respProtocol.isCompress) {
                respProtocol.data = unzip(respProtocol.data)
            }
            respProtocol.data = JSON.parse(respProtocol.data)

            return true
        }
        else {
            return false
        }
    }

    handlerRequestPackage(reqProtocol: IRequestProtocol): string {
        var rspCmd = reqProtocol.action + "_" + reqProtocol.method
        reqProtocol.callback = rspCmd
        if (reqProtocol.isCompress) {
            reqProtocol.data = zip(reqProtocol.data)
        }
        return rspCmd
    }

    getPackageId(respProtocol: IResponseProtocol): string {
        return respProtocol.callback!
    }
}