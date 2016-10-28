/**
 *
 * @提示界面
 *
 */
class PanelTips extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelTips;
    public static get instance(): PanelTips {
        if(this._instance == undefined) {
            this._instance = new PanelTips();
        }
        return this._instance;
    }
    
    //皮肤设置
    protected init(): void {
        this.skinName = PanelTipsSkin;
    }
    
    //定义变量
    private txt_tips: eui.Label;
    private btn_yes: eui.Button;
    private fun_yes: Function;
    
    //定义界面
    constructor() {
        super();
    }
    
    //初始化界面
    createChildren(): void {
        super.createChildren();
        
        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
    }
    
    //显示界面
    show(_Tips: string,_yesfun:Function=null,callback: Function = null): void {
        //数据赋值
        this.fun_yes = _yesfun;
        this._callback = callback;
        
        //显示文本
        this.txt_tips.text = _Tips;
        
        //显示界面
        this.popup(this.funExit.bind(this));
    }

    //退出函数
    private funExit() {
        //退出事件
        this.dealAction();
    }
    
    //确定按钮
    private onYesBtn(e: egret.TouchEvent) {
        //退出函数
        this.funExit();
        
        //判断显示
        if(this.fun_yes) {
            this.fun_yes();
        }
    }
}
