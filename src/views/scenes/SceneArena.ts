/**
 *
 * @竞技场界面
 *
 */
class SceneArena extends basic.SceneBase {
    //定义变量
    private btn_exit: eui.Button;
    private btn_about: eui.Button;
    private usermessage: UserMessage;
    private hudongmessage: HuDongMessage;
    private dongtaimessage: DongTaiMessage;
    private caozuoxinxi: CaoZuoXinXiFace;
    private g_tips: eui.Group;
    private txt_tips: eui.Label;
    
    //数据变量
    private kline_now: number = 0;
    private timer_getdata: basic.Timer = null;
    private kline_type: string[] = ["ONEMIN","FIVEMIN","FIFTEENMIN","DAY"];
    
    //游戏数据变量
    private user_data: any;
    private hudong_data: any;
    private buy_data: any;
    private sell_data: any;
    private now_price:number;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneArenaSkin;
        
        //注册按钮
        basic.Dispatcher.addListener(EventNames.SHOW_ARENATIPS,this.onShowTips,this);
        basic.Dispatcher.addListener(EventNames.CHANGE_KLINE,this.onChangeKLine,this);
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
        this.btn_about.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAboutBtn,this);
        basic.Dispatcher.addListener(EventNames.SHOW_KEYBOARD,this.onShowKeyBoard,this);
        basic.Dispatcher.addListener(EventNames.HIDE_KEYBOARD,this.onHideKeyBoard,this);
    }
    
    //显示前调用
    beforeShow(): void {
        //开始获取数据
        this.getData(0);
        
        //定时获取数据
        this.timer_getdata=new basic.Timer(2000);
        this.timer_getdata.addEventListener(basic.TimerEvent.TIMER,this.onGetData,this);
        this.timer_getdata.start();
    }
    
    //移除是调用
    onHide():void{
        //清除K线
        this.dongtaimessage.cleanKLine();
    }
    
    //定时获取数据
    private onGetData(e:basic.TimerEvent):void{
        //获取数据
        this.getData(2);
    }
    
    //显示软键盘
    private onShowKeyBoard(e: egret.Event): void {
        this.y = -500;
        
        //注册按钮
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onHideKeyBoardBtn,this);
    }
    
    //显示软键盘
    private onHideKeyBoardBtn(e: egret.Event): void {
        this.y = 0;
        
        //注销按钮
        try {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onHideKeyBoardBtn,this);
        }
        catch(error){
            
        }
    }
    
    //显示软键盘
    private onHideKeyBoard(e: egret.Event): void {
        this.y = 0;
        
        //注销按钮
        try {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onHideKeyBoardBtn,this);
        }
        catch(error) {

        }
    }
    
    //显示移动
    private _tween_y: egret.Tween = null;
    
    //显示提示
    private onShowTips(e:egret.Event):void{
        //显示提示
        this.txt_tips.text = e.data.tips;

        //判断停止
        if(this._tween_y) {
            this._tween_y.setPaused(true);
            this._tween_y = null;
        }
        
        //显示界面
        this.g_tips.y = -100;
        this.g_tips.alpha = 1;

        //显示界面
        this._tween_y = egret.Tween.get(this.g_tips).to({ y: 100 },500).wait(2000).to({ alpha: 0 },200).call(()=>{
            this.g_tips.y = -100;
            this.g_tips.alpha = 1;
        });
    }
    
    //改变k线数据
    private onChangeKLine(e:egret.Event):void{
        //数据赋值
        this.kline_now = e.data.klinetype;
        
        //获取数据
        this.getData(1);
    }
    
    //获取数据
    private getData(_type:number):void{
        //获取数据
        Api.instance.get_game_data(Math.max(1,_type),this.kline_type[this.kline_now],(response: any)=>{
            //判断显示
            if(response.success == true) {
                //定义变量
                var hudong_type: number;
                
                //数据赋值
                this.user_data = response.data.accountAuctionRole;
                this.buy_data = response.data.buyList;
                this.sell_data = response.data.sellList;
                this.now_price = response.data.lastPrice;
                
                //判断互动类型
                if(this.user_data.preycode == undefined) {
                    //没有互动
                    hudong_type = 0;
                }
                else if(this.user_data.preycode == "CHALLENGE") {
                    //挑战
                    hudong_type = 1;
                } 
                else if(this.user_data.preycode == "FOLLOW") {
                    //跟随
                    hudong_type = 2;
                }
                else if(this.user_data.preycode == "FOLLOWED") {
                    //被跟随
                    hudong_type = 3;
                }
                else if(this.user_data.preycode == "MECHANISM") {
                    //大户获取的机构猎物
                    hudong_type = 4;
                }
                else if(this.user_data.preycode == "BIGRETAIL") {
                    //机构获取的散户猎物
                    hudong_type = 5;
                }
                
                //判断显示
                if(hudong_type==3){
                    this.hudong_data = response.data.followedNum;
                }
                else{
                    this.hudong_data = response.data.prey;
                }
                
                //显示用户界面
                this.usermessage.show(_type,hudong_type,this.user_data);
                
                //显示互动类型
                this.hudongmessage.show(_type,hudong_type,this.hudong_data);
                
                //显示动态信息内容
                this.dongtaimessage.showPrice(this.buy_data,this.sell_data,this.now_price);
                
                //显示K线
                if(response.data.ktrades == undefined) {
                    
                }
                else{
                    this.dongtaimessage.showKLine(response.data.ktrades);
                }
                
                //显示动态信息
                if(response.data.accountMessage != undefined) {
                    for(var i: number = 0;i < response.data.accountMessage.length;i++) {
                        this.caozuoxinxi.showChat(response.data.accountMessage[i].messageInfo,response.data.accountMessage[i].color);
                    }
                }
                
                //显示提示数据
                this.caozuoxinxi.showHuDongTips(response.data.friendRelationMessageNum);
                
                //判断显示界面0:新闻 ,1:评论,2:指挥
                if(hudong_type==4){
                    this.caozuoxinxi.showSendType(0);
                }
                else if(hudong_type==5){
                    this.caozuoxinxi.showSendType(1);
                }
                else if(hudong_type==3){
                    this.caozuoxinxi.showSendType(2);
                }
                else{
                    this.caozuoxinxi.showSendType(-1);
                }
                
                //初始化信息
                if(_type == 0) {
                    //定义变量
                    var now_num: number;
                    
                    //判断赋值
                    if(this.user_data.auctionrole == "RETAIL") {
                        now_num = 1;
                    }
                    else if(this.user_data.auctionrole == "BIGRETAIL") {
                        now_num = 5;
                    }
                    else if(this.user_data.auctionrole == "MECHANISM") {
                        now_num = 20;
                    }
                    
                    //显示信息
                    this.caozuoxinxi.info(this.now_price,now_num);
                }
            }
        });
    }
    
    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //退出界面
        basic.SceneManager.back(null,basic.sceneEffect.Fade);
        
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_CHOOSEBTN);
    }
    
    //显示关于界面
    private onAboutBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //显示界面
        basic.SceneManager.addTopScene(SceneNames.PLAYRULE);
    }
}
