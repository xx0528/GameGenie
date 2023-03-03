import { IMgr } from '../base/IMgr'
import { Singleton } from '../base/Singleton'

export class NetMgr extends IMgr {
    private static instance: NetMgr;
    public static getInstance(): NetMgr {
        if (!NetMgr.instance) {
          NetMgr.instance = new NetMgr();
        }
    
        return NetMgr.instance
      }
  
}


