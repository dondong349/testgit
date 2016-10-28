/**
 *
 * @互动界面1
 *
 */
class SceneHuDong1 extends basic.SceneBase {
    //定义变量
    private list: eui.List;
    private btn_exit: eui.Button;
    private btn_type: eui.Button;
    private btn_type0: eui.Button;
    private btn_type1: eui.Button;
    private btn_lingqu: eui.Button;
    private viewStack: eui.ViewStack;
    private _data: eui.ArrayCollection;
    private btn_addfriends: eui.Button;
    private txt_tips:eui.Label;
    
    //数据变量
    private page_now: number;
    private page_num: number = 20;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneHuDong1Skin;

        //判断显示状态
        this.viewStack.selectedIndex = 0;
        this.btn_type.currentState = "up";

        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = HuDongItem;
        
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
        this.btn_type0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTypeBtn,this);
        this.btn_type1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTypeBtn,this);
        this.btn_lingqu.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLingQuBtn,this);
        this.btn_addfriends.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAddFriendsBtn,this);
    }
    
    //显示前调用
    beforeShow(): void {
        //数据赋值
        this.page_now = 1;
        
        //获取数据
        this.txt_tips.visible = false;
        Api.instance.get_game_hudong2(this.page_now,this.page_num,(response: any) => {
            //判断显示
            if(response.success == true) {
                //数据赋值
                if(response.page.list==undefined){
                    this._data.source = [];
                    this.txt_tips.visible = true;
                }
                else {
                    this._data.source = response.page.list;
                }
            }
        });
        this._data.refresh();
    }
    
    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void {
        //播放声音
        egret.setTimeout(() => {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        },this,100);
        
        //退出界面
        basic.SceneManager.removeTopScene(SceneNames.HUDONG1);
    }
    
    //领取任务
    private onLingQuBtn(e:egret.TouchEvent):void{
        //领取任务
        Api.instance.get_game_lingqutask((response: any)=>{
            //判断显示
            if(response.success==true){
                //显示提示
                PanelTips.instance.show("领取成功",()=>{
                    //退出界面
                    basic.SceneManager.removeTopScene(SceneNames.HUDONG1);
                });
                
                //播放声音
                egret.setTimeout(() => {
                    basic.SoundManager.instance.playEffect("task_mp3");
                },this,100);
            }
            else{
                //显示提示
                PanelTips.instance.show(response.code);
            }
        });
    }
    
    //添加好友按钮
    private onAddFriendsBtn(e:egret.TouchEvent):void{
        //播放声音
        egret.setTimeout(() => {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        },this,100);
        
        //显示好友界面
        basic.SceneManager.addTopScene(SceneNames.FRIENDS);
    }
    
    //类型按钮
    private onTypeBtn(e: egret.TouchEvent): void {
        //播放声音
        egret.setTimeout(() => {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        },this,100);
        
        //判断显示
        if(e.target.name == "1") {
            this.viewStack.selectedIndex = 1;
            this.btn_type.currentState = "down";
        }
        else if(e.target.name == "0") {
            this.viewStack.selectedIndex = 0;
            this.btn_type.currentState = "up";
        }
    }
}
