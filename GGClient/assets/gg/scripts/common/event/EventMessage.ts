/*
 * @Author: xx
 * @Date: 2023-03-29 16:24:25
 * @LastEditTime: 2023-03-29 16:35:30
 * @Description: 
 */

/**
 * 全局事件监听方法
 * @param event      事件名
 * @param args       事件参数
 */
export type ListenerFunc = (event: string, args: any) => void

/** 框架内部全局事件  */
export enum EventMessage {
    /** 游戏从后台进入 */
    GAME_ENTER = "EventMessage.GAME_ENTER",
    /** 游戏切到后台 */
    GAME_EXIT = "EventMessage.GAME_EXIT",
    /** 游戏画笔尺寸变化事件 */
    GAME_RESIZE = "EventMessage.GAME_RESIZE"
}
