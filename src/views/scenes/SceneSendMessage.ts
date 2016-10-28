/**
 *
 * @发送消息
 *
 */
class SceneSendMessage extends basic.SceneBase {
    //定义变量
    private txt_tips: eui.Label;
    private rect_back: eui.Rect;
    private btn_exit: eui.Button;
    private btn_send: eui.Button;
    private txt_title: eui.Label;
    private txt_detail: eui.EditableText;
    private send_typedetail: string[] = ["NEWSMESSAGE","SYSMESSAGE","ACCOUNTMESSAGE"];
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneSendMessageSkin;
        
        //注册按钮
        this.txt_detail.addEventListener(egret.Event.CHANGE,this.onChangeText,this);
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
        this.btn_send.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSendBtn,this);
        this.rect_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
    }
    
    //显示前调用
    beforeShow(): void {
        //显示文本
        this.txt_title.text = GameData.sendmessage_title;
        
        //显示界面
        this.txt_tips.text = "";
        this.txt_detail.text = "";
        this.btn_send.enabled = false;
    }
    
    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void {
        //退出界面
        basic.SceneManager.removeTopScene(SceneNames.SENDMESSAGE);
    }
    
    //改变文本事件
    private onChangeText(e:egret.Event):void{
        //判断显示界面
        if(this.txt_detail.text==""){
            this.btn_send.enabled = false;
        }
        else{
            this.btn_send.enabled = true;
        }
    }
    
    //发送按钮
    private onSendBtn(e: egret.TouchEvent): void {
        //显示文本
        this.txt_tips.text = "";
        
        //发送消息
        if(this.txt_detail.text != "") {
            Api.instance.send_message(this.send_typedetail[GameData.sendmessage_type],this.txt_detail.text,(response: any) => {
                //判断显示界面
                if(response.success == true) {
                    //退出界面
                    basic.SceneManager.removeTopScene(SceneNames.SENDMESSAGE);
                }
                else {
                    //显示文本
                    this.txt_tips.text=response.code;
                }
            });
        }
    }
    
}
