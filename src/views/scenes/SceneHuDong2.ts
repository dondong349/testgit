/**
 *
 * @互动界面2
 *
 */
class SceneHuDong2 extends basic.SceneBase {
    //定义变量
    private list: eui.List;
    private btn_exit: eui.Button;
    private _data: eui.ArrayCollection;
    
    //数据变量
    private page_now: number;
    private page_num: number = 20;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneHuDong2Skin;
        
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = HuDongItem;
        
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
    }
    
    //显示前调用
    beforeShow(): void {
        //数据赋值
        this.page_now=1;
        
        //获取数据
        Api.instance.get_game_hudong2(this.page_now,this.page_num,(response: any)=>{
            //判断显示
            if(response.success==true){
                //数据赋值
                this._data.source = response.page.list;
            }
        });
        this._data.refresh();
    }
    
    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void {
        //移除游戏规则
        basic.SceneManager.removeTopScene(SceneNames.HUDONG2);
    }
}

//显示条定义
class HuDongItem extends eui.ItemRenderer {
    //定义变量
    private head: Head;
    private txt_name: eui.Label;
    private com_type: eui.Component;
    private btn_gensui: eui.Button;
    private btn_tiaozhan: eui.Button;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();

        //显示头像
        this.head.show(this.data.url)
        
        //显示文本
        this.txt_name.text = this.data.accountname;
        
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
        
        //判断显示按钮
        if(this.data.isRequestType == 1) {
            //定义按钮
            this.btn_gensui.enabled = false;
            this.btn_tiaozhan.enabled = false;
            
            //判读显示按钮文本
            if(this.data.requestType == "CHALLENGE") {
                this.btn_gensui.label = "更随"
                this.btn_tiaozhan.label="已挑战";
            }
            else if(this.data.requestType == "FOLLOW"){
                this.btn_gensui.label = "已请求"
                this.btn_tiaozhan.label = "挑战";
            }
        }
        else{
            this.btn_gensui.label = "跟随"
            this.btn_tiaozhan.label = "挑战";
        }
        
        //注册按钮
        this.btn_gensui.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGenSuiBtn,this);
        this.btn_tiaozhan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTiaoZhanBtn,this);
    }
    
    //跟随按钮
    private onGenSuiBtn(e:egret.TouchEvent):void{
        //上传接口
        Api.instance.up_game_gensui(this.data.accountId,(response: any) => {
            //判断显示
            if(response.success == true) {
                //数据赋值
                this.data.isRequestType = 1;
                this.data.requestType = "FOLLOW"
                
                //判断显示按钮
                if(this.data.isRequestType == 1) {
                    //定义按钮
                    this.btn_gensui.enabled = false;
                    this.btn_tiaozhan.enabled = false;
            
                    //判读显示按钮文本
                    if(this.data.requestType == "CHALLENGE") {
                        this.btn_gensui.label = "跟随"
                        this.btn_tiaozhan.label = "已挑战";
                    }
                    else if(this.data.requestType == "FOLLOW") {
                        this.btn_gensui.label = "已请求"
                        this.btn_tiaozhan.label = "挑战";
                    }
                }
                
                //显示提示信息
                PanelTips.instance.show("等待对方同意！");
            }
            else {
                //显示提示信息
                PanelTips.instance.show(response.code);
            }
        });
    }
    
    //挑战界面
    private onTiaoZhanBtn(e:egret.TouchEvent):void{
        //上传接口
        Api.instance.up_game_tiaozhan(this.data.accountId,(response: any) => {
            //判断显示
            if(response.success == true) {
                //数据赋值
                this.data.isRequestType = 1;
                this.data.requestType = "CHALLENGE"
                
                //判断显示按钮
                if(this.data.isRequestType == 1) {
                    //定义按钮
                    this.btn_gensui.enabled = false;
                    this.btn_tiaozhan.enabled = false;
            
                    //判读显示按钮文本
                    if(this.data.requestType == "CHALLENGE") {
                        this.btn_gensui.label = "跟随"
                        this.btn_tiaozhan.label = "已挑战";
                    }
                    else if(this.data.requestType == "FOLLOW") {
                        this.btn_gensui.label = "已请求"
                        this.btn_tiaozhan.label = "挑战";
                    }
                }

                //显示提示信息
                PanelTips.instance.show("等待对方同意！");
            }
            else {
                //显示提示信息
                PanelTips.instance.show(response.code);
            }
        });
    }
}





