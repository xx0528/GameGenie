import { _decorator, Component, Node } from 'cc';
import { SoundMgr } from './sound/SoundMgr';
import { UIMgr } from './ui/UIMgr';
const { ccclass, property } = _decorator;

@ccclass('GGMain')
export class GGMain extends Component {
    onLoad() {
        UIMgr.getInstance().load()
        SoundMgr.getInstance().load()
    }

    start(){
        UIMgr.getInstance().openView("UILogin")
    }
    
    update(deltaTime: number) {
        
    }
}


