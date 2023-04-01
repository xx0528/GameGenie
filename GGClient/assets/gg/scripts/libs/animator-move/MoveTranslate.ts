
/*
 * @Author: xx
 * @Date: 2022-03-25 18:12:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-04-01 19:18:23
 */
import { Component, Node, Vec3, _decorator } from "cc" 
import { Vec3Util } from "../../utils/Vec3Util" 

const { ccclass, property } = _decorator 

/** 角色坐标方式移动 */
@ccclass('MoveTranslate')
export class MoveTranslate extends Component {
    /** 移动方向 */
    velocity: Vec3 = Vec3Util.zero 
    /** 移动速度 */
    speed: number = 0 

    private vector: Vec3 = new Vec3() 

    update(dt: number) {
        if (this.speed > 0) {
            Vec3.multiplyScalar(this.vector, this.velocity, this.speed * dt) 
            this.node.translate(this.vector, Node.NodeSpace.WORLD) 
        }
    }
}