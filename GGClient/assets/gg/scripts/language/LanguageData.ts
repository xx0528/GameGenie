/*
 * @Author: xx
 * @Date: 2023-03-29 16:24:25
 * @LastEditTime: 2023-03-29 17:18:52
 * @Description: 
 */
export class LanguageData {
    /** 当前语言 */
    static current: string = ""
    /** 语言配置 */
    static data: any = {}

    public static getLangByID(labId: string): string {
        return LanguageData.data[labId] || labId
    }
}