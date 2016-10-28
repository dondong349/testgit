/**
 *
 * @互动信息
 *
 */
class SceneHuDongXinXi extends basic.SceneBase {
    //定义变量
    private list: eui.List;
    private btn_exit: eui.Button;
    private _data: eui.ArrayCollection;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneHuDongXinXiSkin;

        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = HuDongXinXiItem;
        
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
    }
    
    //显示前调用
    beforeShow(): void {
        //获取数据
        Api.instance.get_game_hudongxinxi((response: any) => {
            //判断显示
            if(response.success == true) {
                //数据赋值
                this._data.source = response.list;
            }
        });
        this._data.refresh();
    }
    
    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //移除互动信息
        basic.SceneManager.removeTopScene(SceneNames.HUDONGXINXI);
    }
}

//显示条定义
class HuDongXinXiItem extends eui.ItemRenderer {
    //定义变量
    private head: Head;
    private btn_no:eui.Button;
    private btn_yes: eui.Button;
    private txt_name: eui.Label;
    private txt_tips: eui.Label;
    private com_type: eui.Component;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();

        //显示头像
        this.head.show(this.data.url)
        
        //显示文本
        this.txt_name.text = this.data.accountname;
        
        //判断显示类型
        if(this.data.requestType == "CHALLENGE") {
            this.btn_yes.label = "接受"
            this.txt_tips.text = "发起挑战";
            this.btn_yes.icon = "icon_btn9_png";
        }
        else if(this.data.requestType == "FOLLOW") {
            this.btn_yes.label = "同意";
            this.txt_tips.text = "请求跟随";
            this.btn_yes.icon = "icon_btn9_png";
        }
        this.btn_no.label = "拒绝"
        this.btn_no.icon = "icon_btn8_png";
        
        //显示类型
        if(this.data.auctionrole == "RETAIL") {
            this.com_type.currentState = "1";
        }
        else if(this.data.auctionrole == "BIGRETAIL") {
            this.com_type.currentState = "2";
        }
        else if(this.data.auctionrole == "MECHANISM") {
            this.com_type.currentState = "3";
        }
        
        //注册按钮
        this.btn_no.enabled = true;
        this.btn_yes.enabled = true;
        this.btn_no.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNoBtn,this);
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
    }
    
    //拒绝按钮
    private onNoBtn(e:egret.TouchEvent):void{
        //播放声音
        egret.setTimeout(() => {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        },this,100);
        
        //调用接口
        Api.instance.up_game_nohudong(this.data.accountId,(response: any) => {
            if(response.success == true) {
                //判断显示
                this.btn_no.enabled = false;
                this.btn_yes.enabled = false;
                this.btn_no.label = "已拒绝"
            }
            else {
                //显示提示信息
                PanelTips.instance.show(response.code);
            }
        });
    }
    //同意按钮
    private onYesBtn(e: egret.TouchEvent): void {
        //调用接口
        Api.instance.up_game_starthudong(this.data.requestType,this.data.accountId,(response: any) => {
            //判断显示
            if(response.success == true) {
                //判断显示
                if(this.data.requestType == "FOLLOW"){
                    //显示按钮
                    this.btn_no.enabled = false;
                    this.btn_yes.enabled = false;
                    this.btn_yes.label = "已同意"
                    
                }
                else if(this.data.requestType == "CHALLENGE"){
                    //显示提示信息
                    PanelTips.instance.show("接受成功，开始挑战！",() => {
                        //移除互动信息
                        basic.SceneManager.removeTopScene(SceneNames.HUDONGXINXI);
                    });
                }
                
                //播放声音
                egret.setTimeout(() => {
                    basic.SoundManager.instance.playEffect("interact_mp3");
                },this,100);
            }
            else {
                //显示提示信息
                PanelTips.instance.show(response.code);
            }
        });
    }
}


