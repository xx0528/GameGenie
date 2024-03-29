import { Component, AudioClip, Game, JsonAsset, Node, _decorator, director, game, log, sys, view, Vec2, CCFloat, CCInteger } from "cc";
import { oops } from "../../../../extensions/oops-plugin-framework/assets/core/Oops";

const { ccclass, property } = _decorator;

@ccclass
export default class MainControl extends Component {
    @property(Node)
    bandit = null;
  
    @property({type: CCInteger})
    tileCount = 4;
  
    @property({type: Vec2})
    machineSize = new Vec2(3, 5);
    
    private block = false;
  
    private result = null;
  
    private probability = [50, 33, 10, 7]

    start(): void {
        // Set up Armed bandit
        this.bandit.getComponent('BanditControl').createBandit();
    }

    update(): void {
        if (this.block && this.result != null) {
            this.informStop();
            this.result = null;
        }
    }

    click(): void {
        // Sound
        oops.audio.playEffect("game/slots/audios/mouseClick")
    
        if (this.bandit.getComponent('BanditControl').spinning === false) {
          this.block = false;
          this.bandit.getComponent('BanditControl').spin();
          this.requestResult()
        } else if (!this.block) {
          this.block = true;
          this.bandit.getComponent('BanditControl').lock();
        }
    }

    async requestResult(): Promise<void> {
        this.result = null;
        this.result = await this.getAnswer();
    }

    getAnswer(): Promise<Array<Array<number>>> {
        let slotResult: Array<Array<number>> = [];
        return new Promise<Array<Array<number>>>(resolve => {
          setTimeout(() => {
            let pattern = this.getRandomPattern();
            let equalLines = this.getRandomEqualLines(pattern, this.machineSize.x);
            slotResult = this.getResultWithEqualLines(equalLines, this.machineSize);
            resolve(slotResult);
          }, 1000 + 500 * Math.random());
        });
    }
    
    informStop(): void {
        let resultRelayed = this.result; 
        this.bandit.getComponent('BanditControl').stop(resultRelayed);
    }
    
    getRandomEqualLines(linesCount: number, lineSize: number): Array<number>{
        let equalLines = Array(lineSize).fill(0).map((v,i)=>i);
        equalLines = this.shuffleArray(equalLines);
        return equalLines.slice(0, linesCount);
    }
    
    getResultWithEqualLines(equalLines: Array<number>, machineSize: Vec2): Array<Array<number>> {
        if(equalLines.length == 0){
          return [];
        }
        const slotResult = Array(machineSize.y).fill(Array(machineSize.x).fill(-1));
        let value = 0;
        equalLines.forEach(pivvot => {
          value = this.getRandomInt(0, this.tileCount - 1);
          for (let index = 0; index < machineSize.y; index++) {
            slotResult[index][pivvot] = value;
          }
        });
        return slotResult;
    }
    
    getRandomInt(min, max): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    shuffleArray(array: Array<number>): Array<number> {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        };
        return array;
    }
    
    getRandomPattern(): number{
        let occurrence = 0;
        let random = this.getRandomInt(0, 99);
        for (let index = 3; index >=0; index--) {
            occurrence += this.probability[index];
            if( random <= occurrence)
            return index;
        }
        return 0;
    }
}
