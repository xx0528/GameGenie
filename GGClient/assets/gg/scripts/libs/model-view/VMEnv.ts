/*
 * @Author: xx
 * @Date: 2023-04-01 18:20:40
 * @LastEditTime: 2023-04-01 19:43:49
 * @Description: 
 */
import { EDITOR } from "cc/env" 

/** VM组件环境验证 */
export class VMEnv {
    /** 编辑状态 */
    static get editor() {
        // @ts-ignore
        return EDITOR && !GAME_VIEW
    }
}