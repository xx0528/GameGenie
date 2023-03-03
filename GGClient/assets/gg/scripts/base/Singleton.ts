export class Singleton<T> {
    
    private static _instance: any = null

    public static getInstance<T>(c: {new(): T}): T{
        if (this._instance == null)
            this._instance = new c()

        return this._instance
    }

    onCreate() {
        
    }

    onRelease() {
        
    }
}


