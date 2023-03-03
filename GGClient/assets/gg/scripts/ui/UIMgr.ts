
import { IMgr } from '../base/IMgr'
import { UIView } from './UIView'

export class UIMgr extends IMgr {

    private static instance: UIMgr;
    private mViews = new Map<string, UIView>()
  
    public static getInstance(): UIMgr {
      if (!UIMgr.instance) {
        UIMgr.instance = new UIMgr();
      }
  
      return UIMgr.instance
    }

    onLoad(){

    }

    getView(viewName: string) : UIView{
        if (!this.hasView(viewName))
            return null
        return this.mViews.get(viewName)
    }

    openView(viewName: string, param: any = null, bAni: boolean = true) : UIView {
        let view = this.getView(viewName)
        if(view == null)
            return
        view.open(param, bAni)
        return view
    }

    closeView(viewName: string) : UIView {
        let view = this.getView(viewName)
        if(view == null)
            return
        view.close()
        return view
    }

    private hasView(viewName : string) : boolean{
        if (!this.mViews.has(viewName)) {
            console.error("con't find view by name " + viewName)
            return false
        }
        return true
    }
}
