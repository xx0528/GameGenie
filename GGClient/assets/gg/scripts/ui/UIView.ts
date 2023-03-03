import { _decorator, Component, Node } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('UIView')
export class UIView extends Component {

    @property
    aniName : string = ""

    private _isOpen : boolean = false
    private _isAniOpening : boolean = false
    private _isAniClosing : boolean = false
    private _order : number = 0
    private _isInit : boolean = false
    
    private _node: Node = null
    private _anim: Animation = null!
    private _param : any = null

    init(){
        this._isOpen = false
        this._anim = this.getComponent(Animation)
        this.onInit()
    }
    open(param : any, bAni : boolean = true){
        
        if (this._isAniOpening) {
            console.error("open ani playing")
            return
        }
        
        if (this._isAniClosing) {
            console.error("close ani playing")
            return
        }
        this._param = param
        this._isAniOpening = true
        this._isAniClosing = false
        this._node.active = true

        if (this.aniName == "" || !bAni) {

            this.clearAni()
            this.onOpen(param)
            this.onOpenEnd()
        }
        else {
            this.playAni(this.aniName)
            this.onOpen(param)
        }
    }
    fresh(){
        if (!this._isOpen || this.isAniPlaying())
            return
        this.onOpen(this._param)
        this.onOpenEnd()
    }
    close(){
        this.onClose()
    }

    isAniPlaying(){
        return this._isAniOpening || this._isAniClosing
    }
    playAni(name : string) {
        
    }

    clearAni() {}

    onInit(){}
    onOpen(param : any){}
    onOpenEnd(){}
    onClose(){}
}
