import { IMgr } from '../base/IMgr'
import { Singleton } from '../base/Singleton'

export class SoundMgr extends IMgr {
    private static instance: SoundMgr;
    public static getInstance(): SoundMgr {
        if (!SoundMgr.instance) {
          SoundMgr.instance = new SoundMgr();
        }
    
        return SoundMgr.instance
      }
}


