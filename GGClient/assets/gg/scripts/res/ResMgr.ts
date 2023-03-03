import { _decorator, Component, Prefab } from 'cc';
import { IMgr } from '../base/IMgr'
import { UIView } from '../ui/UIView';
const { ccclass, property } = _decorator;

@ccclass('ResMgr')
export class ResMgr extends Component {
    private static instance: ResMgr;
    @property(Prefab)
    viewList : Prefab[] = []
    public static getInstance(): ResMgr {
        return ResMgr.instance
    }

    onLoad(){
        ResMgr.instance = this
    }

    start(){

    }

    onEnable(){

    }
}


