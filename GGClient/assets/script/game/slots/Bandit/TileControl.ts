/*
 * @Author: xx
 * @Date: 2023-07-25 16:16:53
 * @LastEditTime: 2023-07-25 17:34:11
 * @Description: 
 */
import { _decorator, Component, SpriteFrame, loader, Sprite, Node } from "cc";

const {ccclass, property} = _decorator;

@ccclass('TileControl')
export default class TileControl extends Component {

    @property({ type: [SpriteFrame], visible: true })
    private textures = [];
    
    // Glow over tile
    @property({type: Node})
    glowNode = null!;

    async onLoad(): Promise<void> {
        await this.loadTextures();
        this.glowNode.active = false;
    }

    async resetInEditor(): Promise<void> {
        await this.loadTextures();
        this.glowNode.active = false;
        this.setRandom();
    }

    // Load images and fill texture array
    async loadTextures(): Promise<boolean> {
        const self = this;
        return new Promise<boolean>(resolve => {
            loader.loadResDir('bundle/game/slots/texture/tiles', SpriteFrame, function afterLoad(err, loadedTextures) {
                self.textures = loadedTextures;
                resolve(true);
            });
        });
    }

    // Set tile to random image
    setRandom(): void {
        const randomIndex = Math.floor(Math.random() * this.textures.length);
        this.setTile(randomIndex);
    }
    
    // Set tile by index number
    setTile(index: number): void {
        this.node.getComponent(Sprite).spriteFrame = this.textures[index];
    }

    // Show glow underneath
    activateGlow(option: boolean) {
        this.glowNode.active = option;
    }
}
