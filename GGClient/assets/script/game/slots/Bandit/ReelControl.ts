import { _decorator, Component, Prefab, instantiate, Vec3, Vec2, Node, tween } from "cc";
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import TileControl from "./TileControl";

const {ccclass, property} = _decorator;

@ccclass('ReelControl')
export default class ReelControl extends Component {    

    @property({ type: Node })
    public reelAnchor = null;

    // Tiles
    @property({ type: [Node], visible: false })
    private tiles = [];
    @property({ type: Prefab })
    public _tilePrefab = null;
    @property({ type: Prefab })
    get tilePrefab(): Prefab {
      return this._tilePrefab;
    }
    set tilePrefab(newPrefab: Prefab) {
      this._tilePrefab = newPrefab;
      this.reelAnchor.removeAllChildren();
      this.tiles = [];
  
      if (newPrefab !== null) {
        this.createReel();
        this.shuffle();
      }
    }
    
    // Reel result
    private result: Array<number> = [];
    public stopSpinning = false; 

    createReel(): void {
      // Create number of tiles forming a reel
      for (let i = 0; i < 5; i += 1) {
        const newTile = instantiate(this.tilePrefab);
        this.reelAnchor.addChild(newTile);
        this.tiles[i] = newTile;
      }
    }
    
    shuffle(): void {
      // Randomise each 
      for (let i = 0; i < this.tiles.length; i += 1) {
        this.tiles[i].getComponent('TileControl').setRandom();
      }
    }
    
    readyStop(newResult: Array<number>): void {
      this.result = (newResult == null) ? newResult : newResult.reverse();
      this.stopSpinning = true;
    }
    
    changeCallback(element: Node = null): void {
      if (element.position.y < -288) {
        element.position = new Vec3(0, 288);
  
        let pop = null;
        if (this.result != null && this.result.length > 0) {
          pop = this.result.pop();
        }
  
        if (pop != null && pop >= 0) {
          (element.getComponent('TileControl') as TileControl).setTile(pop);
          (element.getComponent('TileControl') as TileControl).activateGlow(true);
        } else {
          (element.getComponent('TileControl') as TileControl).setRandom();
        }
      }
    }

    // Check if stopSpinning is true
    checkEndCallback(element: Node = null): void {
      const el = element;
      if (this.stopSpinning) {
        this.doStop(el);
      } else {
        this.doSpinning(el);
      }
    }
    
    // Start Spinning reel with windUp delay
    doSpin(windUp: number): void {
      this.stopSpinning = false;
      // Sound
      oops.audio.playEffect("game/slots/audios/reelStart")
  
      this.reelAnchor.children.forEach(element => {   
        const delay = tween(element).delay(windUp);
        const start = tween().by(0.25, { position: new Vec3(0, -144, 0) }, { easing: 'backIn' });
        const doChange = tween().call(() => this.changeCallback(element));
        const callSpinning = tween(element).call(() => this.doSpinning(element, 5));
        
        element.getComponent(TileControl).activateGlow(false);
        delay
          .then(start)
          .then(doChange)
          .then(callSpinning)
          .start();
      });
    }
    
    // Spin reel. Repeated until checkEnd is true
    doSpinning(element: Node = null, times = 1): void {   
      // Sound
      oops.audio.playEffect("game/slots/audios/reelStop")
      
      const move = tween().by(0.04, { position: new Vec3(0, -144, 0) });
      const doChange = tween().call(() => this.changeCallback(element));
      const repeat = tween(element).repeat(times, move.then(doChange));
      const checkEnd = tween().call(() => this.checkEndCallback(element));
  
      repeat.then(checkEnd).start();
    }
    
    // Stop the reel from spinning
    doStop(element: Node = null): void {
      // Sound
      oops.audio.playEffect("game/slots/audios/reelStop")

      const move = tween(element).by(0.04, { position: new Vec3(0, -144, 0) } as any);
      const doChange = tween().call(() => this.changeCallback(element));
      const end = tween().by(0.2, { position: new Vec3(0, -144, 0) }, { easing: 'bounceOut' });
      
      move
        .then(doChange)
        .then(move)
        .then(doChange)
        .then(end)
        .then(doChange)
        .start();
    }

    activateGlow(option: boolean): void {
      this.reelAnchor.children.forEach(element => {
        element.getComponent('TileControl').activateGlow(option);
      });
    }
}
    