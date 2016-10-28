/**
 *
 * @我的界面
 *
 */
class Start_Mine extends eui.Component {
    //定义变量
    private btn_friends: eui.Button;
    private btn_history: eui.Button;
    private information: Information;
    private txt_detail: eui.EditableText;
    private rect_tips: eui.Rect;
    private txt_tips: eui.Label;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //注册按钮
        basic.Dispatcher.addListener(EventNames.SHOW_TIPS,this.onShowTips,this);
        this.btn_friends.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onFriendsBtn,this);
        this.btn_history.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onHistoryBtn,this);
        this.txt_detail.addEventListener(egret.FocusEvent.FOCUS_IN,this.onDetailText,this);
        this.txt_detail.addEventListener(egret.FocusEvent.FOCUS_OUT,this.onDetailText,this);
    }
    
    //初始化界面
    public info():void{
        //初始化
        this.information.info();
        
        //显示文本
        this.txt_detail.text = UserData.User_Detail;
        if(this.txt_detail.text == "") {
            this.txt_tips.visible = true;
        }
        else {
            this.txt_tips.visible = false;
        }
    }
    
    //文档事件
    private onDetailText(e:egret.FocusEvent):void{
        //判断上传数据
        if(e.type == egret.FocusEvent.FOCUS_IN) {
            this.txt_tips.visible = false;
        }
        else if(e.type == egret.FocusEvent.FOCUS_OUT) {
            //判断显示
            if(this.txt_detail.text == "") {
                this.txt_tips.visible = true;
            }
            else {
                this.txt_tips.visible = false;
            }
            
            //上传数据
            if(this.txt_detail.text != UserData.User_Detail) {
                Api.instance.up_user_detail(this.txt_detail.text,(response: any) => {
                    if(response.success == true) {
                        UserData.User_Detail = this.txt_detail.text;
                    }
                });
            }
        }
    }
    
    //显示关于界面
    private onHistoryBtn(e: egret.TouchEvent): void {
        //播放声音
        egret.setTimeout(() => {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        },this,100);
        
        //数据赋值
        UserData.Other_UserId = "";
        
        //显示历史记录界面
        basic.SceneManager.addTopScene(SceneNames.HISTORY);
    }
    
    //显示好友界面
    private onFriendsBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //隐藏
        this.rect_tips.visible = false;
        
        //显示界面
        basic.SceneManager.addTopScene(SceneNames.FRIENDS);
    }
    
    //显示提示
    private onShowTips(e: egret.Event): void {
        //显示提示
        this.rect_tips.visible = true;
    }
}
