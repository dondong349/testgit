/**
 *
 * @选择提示
 *
 */
class PanelChooseTips extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelChooseTips;
    public static get instance(): PanelChooseTips {
        if(this._instance == undefined) {
            this._instance = new PanelChooseTips();
        }
        return this._instance;
    }
    
    //皮肤设置
    protected init(): void {
        this.skinName = PanelChooseTipsSkin;
    }
    
    //定义变量
    private txt_tips: eui.Label;
    private btn_yes: eui.Button;
    private btn_exit: eui.Button;
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
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
    }
    
    //显示界面
    show(_Tips: string,_yesfun: Function = null,callback: Function = null): void {
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
    
    //退出按钮
    private onExitBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //退出函数
        this.funExit();
    }
    
    //确定按钮
    private onYesBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //退出函数
        this.funExit();
        
        //判断显示
        if(this.fun_yes) {
            this.fun_yes();
        }
    }
}
