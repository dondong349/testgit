/**
 *
 * @个人信息
 *
 */
class PanelUserMessage extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelUserMessage;
    public static get instance(): PanelUserMessage {
        if(this._instance == undefined) {
            this._instance = new PanelUserMessage();
        }
        return this._instance;
    }
    
    //皮肤设置
    protected init(): void {
        this.skinName = PanelUserMessageSkin;
    }
    
    //定义变量
    private head: Head;
    private txt_name: eui.Label;
    private txt_touxian: eui.Label;
    private txt_dengji: eui.Label;
    private txt_jifen: eui.Label;
    private txt_detail: eui.Label;
    private btn_close: eui.Button;
    private btn_history: eui.Button;
    private now_userid: string;
    
    //定义界面
    constructor() {
        super();
    }
    
    //初始化界面
    createChildren(): void {
        super.createChildren();
        
        //注册按钮
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
        this.btn_history.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onHistoryBtn,this);
    }
    
    //显示界面
    show(_friendId:string,callback: Function = null): void {
        //数据赋值
        this._callback = callback;
        this.now_userid = _friendId;
        
        //显示界面
        this.popup(this.funExit.bind(this));
        
        //获取数据
        Api.instance.get_otherusermessage(_friendId,(response: any) => {
            if(response.success == true) {
                //显示头像
                this.head.show(response.data.face);
                
                //显示文本
                this.txt_name.text = response.data.nickname;
                if(response.data.val == undefined) {
                    this.txt_jifen.text = "0";
                }
                else {
                    this.txt_jifen.text = response.data.val;
                }
                if(response.data.ulevel==undefined){
                    this.txt_touxian.text = UserData.TouXian_Name[0];
                    this.txt_dengji.text = UserData.DengJi_Name[0];
                }
                else{
                    this.txt_touxian.text = UserData.TouXian_Name[response.data.ulevel];
                    this.txt_dengji.text = UserData.DengJi_Name[response.data.ulevel];
                }
                if(response.data.introduce == undefined) {
                    this.txt_detail.text = "";
                }
                else {
                    this.txt_detail.text = response.data.introduce;
                }
            }
        });
    }

    //退出函数
    private funExit() {
        //退出事件
        this.dealAction();
    }
    
    //退出按钮
    private onCloseBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //退出函数
        this.funExit();
    }
    
    //历史记录按钮
    private onHistoryBtn(e: egret.TouchEvent) {
        //退出事件
        this.dealAction();
        
        //数据赋值
        UserData.Other_UserId = this.now_userid;
        
        //显示历史记录界面
        basic.SceneManager.addTopScene(SceneNames.HISTORY);
        
        //播放声音
        egret.setTimeout(() => {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        },this,100);
    }
}
