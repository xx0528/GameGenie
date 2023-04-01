/*
 * @Author: xx
 * @Date: 2023-03-29 16:24:25
 * @LastEditTime: 2023-03-29 17:32:03
 * @Description: 
 */
import { IProtocolHelper, IRequestProtocol, IResponseProtocol, NetData } from "./NetInterface"

/** Protobuf.js 数据压缩协议 */
export class NetProtocolProtobuf implements IProtocolHelper {
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
                // respProtocol.data
                // const p = Person.decode(msg)
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
            // reqProtocol.data
            // const msg = Person.encode({ name: "xx", id: 1 }).finish()
        }
        return rspCmd
    }

    getPackageId(respProtocol: IResponseProtocol): string {
        return respProtocol.callback!
    }
}