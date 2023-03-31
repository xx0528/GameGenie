import { instantiate, assetManager, director, Node, Prefab, isValid } from "cc"
import UIBase, { UIClass } from "./UIBase"
import { ViewZorder } from "./ViewZOrder"

export default class UIMgr {
    private static instance: UIMgr

    private uiList: UIBase[] = []

    public static getInstance(): UIMgr {
        if (this.instance == null) {
            this.instance = new UIMgr()
        }
        return this.instance
    }

    private constructor() {

    }

    /**
     * 打开UI
     * @param uiClass 
     * @param zOrder 
     * @param callback 打开完毕回调函数
     * @param onProgress 打开过程进度函数
     * @param args 传入到UI的参数
     */
    public openUI<T extends UIBase>(uiClass: UIClass<T>, zOrder: number = ViewZorder.UI, callback?: Function, onProgress?: Function, ...args: any[]) {
        if (this.getUI(uiClass)) {
            console.error(`UIMgr OpenUI 1: ui ${uiClass.getName()} is already exist, please check`)
            return
        }
        assetManager.loadRemote(uiClass.getUrl(), (completedCount: number, totalCount: number, item: any) => {
            onProgress && onProgress(completedCount, totalCount, item)
        }, (error: Error | null, prefab: Prefab) => {
            if (error) {
                console.error(`UIMgr OpenUI: load ui error: ${error}`)
                return
            }
            if (this.getUI(uiClass)) {
                console.error(`UIMgr OpenUI 2: ui ${uiClass.getName()} is already exist, please check`)
                return
            }

            let uiNode: Node = instantiate(prefab)
            let ui = uiNode.getComponent(uiClass) as UIBase
            if (!ui) {
                console.error(`${uiClass.getUrl()}没有绑定UI脚本!!!`)
                return
            }
            ui.init(args)
            // let uiRoot = director.getScene().getChildByName('UIRoot')
            let uiRoot = director.getScene()
            if (!uiRoot) {
                console.error(`当前场景${director.getScene()!.name}Canvas!!!`)
                return
            }
            uiNode.parent = uiRoot
            uiNode.setSiblingIndex(zOrder)
            this.uiList.push(ui)
            ui.tag = uiClass

            callback && callback(ui)
        })
    }


    /**
     * 清除依赖资源
     * @param prefabUrl 
     */
    private clearDependsRes(prefabUrl: string) {
        let deps =  assetManager.dependUtil.getDepsRecursively(prefabUrl)
        // console.log(`UIMgr clearDependsRes: release ${prefabUrl} depends resources `, deps)
        deps.forEach((item) => {
            // todo：排除公共资源，然后清理
            // if (item.indexOf('common') === -1) {
            //     loader.release(item)
            // }
        })
    }

    public closeUI<T extends UIBase>(uiClass: UIClass<T>) {
        for (let i = 0; i < this.uiList.length; ++i) {
            if (this.uiList[i].tag === uiClass) {
                if (isValid(this.uiList[i].node)) {
                    this.uiList[i].node.destroy()
                    this.clearDependsRes(uiClass.getUrl())
                }
                this.uiList.splice(i, 1)
                return
            }
        }
    }

    public closeAllUI() {
        if (this.uiList.length == 0) {
            return
        }
        this.closeUI(this.uiList[0].tag)
        while (this.uiList.length > 0) {
            this.closeUI(this.uiList[0].tag)
        }
    }

    public showUI<T extends UIBase>(uiClass: UIClass<T>, callback?: Function) {
        let ui = this.getUI(uiClass)
        if (!ui) {
            console.error(`UIMgr showUI: ui ${uiClass.getName()} not exist`)
            return
        }
        ui.node.active = true
    }

    public hideUI<T extends UIBase>(uiClass: UIClass<T>) {
        let ui = this.getUI(uiClass)
        if (ui) {
            ui.node.active = false
        }
    }

    public getUI<T extends UIBase>(uiClass: UIClass<T>): UIBase | null{
        for (let i = 0; i < this.uiList.length; ++i) {
            if (this.uiList[i].tag === uiClass) {
                return this.uiList[i]
            }
        }
        return null
    }

    public isShowing<T extends UIBase>(uiClass: UIClass<T>) {
        let ui = this.getUI(uiClass)
        if (!ui) {
            return false
        }
        return ui.node.active
    }
}