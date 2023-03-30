/*
 * @Author: xx
 * @Date: 2023-03-29 15:55:39
 * @LastEditTime: 2023-03-29 16:43:17
 * @Description: 配置
 */

import { BuildTimeConstants } from "./BuildTimeConstants"
import { GameConfig } from "./GameConfig"
import { GameQueryConfig } from "./GameQueryConfig"

/** 游戏配置静态访问类 */
export class Config {
    /** 环境变量 */
    public btc!: BuildTimeConstants

    public game!: GameConfig

    public query!: GameQueryConfig
}

