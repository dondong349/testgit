/**
 *
 * @抽卡界面
 *
 */
class TakeCard extends eui.Component {
    //定义变量
    private txt_time1: eui.Label;
    private txt_time2: eui.Label;
    private txt_time3: eui.Label;
    private btn_enter: eui.Button;
    private com_role: eui.Component;
    private is_starttime: Boolean = false;
    private rect_time1: eui.Rect;
    private rect_time2: eui.Rect;
    private rect_time3: eui.Rect;
    
    //数据变量
    private game_code: string;
    private game_date: string;
    private game_daojishi1: string;
    private game_daojishi2: string;
    private is_startgetdata: Boolean = false;
    
    //初始化
    createChildren(): void {
        super.createChildren();

        //注册按钮
        this.btn_enter.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onEnterBtn,this);
    }
    
    //初始化界面
    public info():void{
        //获取数据
        this.getData();
    }
    
    //获取数据
    private getData():void{
        //停止计时
        this.stop();
        
        //获取数据
        this.is_startgetdata = true;
        Api.instance.get_start_data((response: any) => {
            //判断显示
            this.is_startgetdata = false;
            if(response.success == true) {
                //数据赋值
                this.game_code = response.data.code;
                this.game_date = response.data.data;
                UserData.User_Code = response.data.code;
                if(response.data.drawTime != undefined) {
                    this.game_daojishi1 = response.data.drawTime;
                }
                else{
                    this.game_daojishi1 = "";
                }
                this.game_daojishi2 = response.data.auctionTime;
                
                console.log(this.game_daojishi1);
                console.log(this.game_daojishi2);
                //显示文本
                this.btn_enter.label = response.data.str;
                
                //判断显示按钮
                if(response.data.isAuctionTime == true) {
                    this.btn_enter.enabled = true;
                }
                else {
                    this.btn_enter.enabled = false;
                }
                
                //判断显示角色
                if(response.data.auctionRole =="RETAIL"){
                    this.com_role.currentState = "1";
                    this.rect_time1.fillColor = 0x626262;
                    this.rect_time2.fillColor = 0x626262;
                    this.rect_time3.fillColor = 0x626262;
                }
                else if(response.data.auctionRole == "BIGRETAIL"){
                    this.com_role.currentState = "2";
                    this.rect_time1.fillColor = 0x626262;
                    this.rect_time2.fillColor = 0x626262;
                    this.rect_time3.fillColor = 0x626262;
                }
                else if(response.data.auctionRole == "MECHANISM") {
                    this.com_role.currentState = "3";
                    this.rect_time1.fillColor = 0x626262;
                    this.rect_time2.fillColor = 0x626262;
                    this.rect_time3.fillColor = 0x626262;
                }
                else{
                    this.rect_time1.fillColor = 0x1D1C24;
                    this.rect_time2.fillColor = 0x1D1C24;
                    this.rect_time3.fillColor = 0x1D1C24;
                    this.com_role.currentState ="close";
                }
                
                //开始显示倒计时
                this.is_starttime = true;
                this.addEventListener(egret.Event.ENTER_FRAME,this.onShowTimes,this);
            }
            else {
                
            }
        });
    }
    
    //停止计时
    public stop():void{
        //判断停止
        if(this.is_starttime) {
            this.is_starttime = false;
            this.removeEventListener(egret.Event.ENTER_FRAME,this.onShowTimes,this);
        }
    }
    
    //显示时间
    private onShowTimes(e:egret.Event):void{
        //定义变量
        var daojishi: number;
        var now_date: Date = new Date();
        
        //判断显示
        if(this.game_daojishi1 != "" && now_date.getHours() * 3600 + now_date.getMinutes() * 60 + now_date.getSeconds() < Number(this.game_daojishi1.split(":")[0]) * 3600 + Number(this.game_daojishi1.split(":")[1]) * 60) {
            daojishi = Number(this.game_daojishi1.split(":")[0]) * 3600 + Number(this.game_daojishi1.split(":")[1]) * 60 - now_date.getHours() * 3600 - now_date.getMinutes() * 60 - now_date.getSeconds();
        }
        else if(now_date.getHours() * 3600 + now_date.getMinutes() * 60 + now_date.getSeconds() < Number(this.game_daojishi2.split(":")[0]) * 3600 + Number(this.game_daojishi2.split(":")[1]) * 60) {
            daojishi = Number(this.game_daojishi2.split(":")[0]) * 3600 + Number(this.game_daojishi2.split(":")[1]) * 60 - now_date.getHours() * 3600 - now_date.getMinutes() * 60 - now_date.getSeconds();
                
            //判断获取数据
            if(this.com_role.currentState == "close" && this.is_startgetdata == false) {
                this.getData();
            }
        }
        else {
            //数据显示
            daojishi = 0;
            
            //判断获取数据
            if(this.btn_enter.enabled == false && this.is_startgetdata == false) {
                this.getData();
            }
        }
        
        //显示小时
        if(Math.floor(daojishi/3600) < 10) {
            this.txt_time1.text = "0" + String(Math.floor(daojishi / 3600));
        }
        else{
            this.txt_time1.text = String(Math.floor(daojishi / 3600));
        }
        
        //显示分
        if(Math.floor((daojishi%3600)/60) < 10) {
            this.txt_time2.text = "0" + String(Math.floor((daojishi % 3600) / 60));
        }
        else {
            this.txt_time2.text = String(Math.floor((daojishi % 3600) / 60));
        }
        
        //显示秒
        if(Number((daojishi % 3600)%60) < 10) {
            this.txt_time3.text = "0" + String(Number((daojishi % 3600) % 60));
        }
        else {
            this.txt_time3.text = String(Number((daojishi % 3600) % 60));
        }
    }
    
    //进入按钮
    private onEnterBtn(e:egret.TouchEvent):void{
        console.log("clicked " + this.btn_enter.label + ",打开 SceneNames.ARENA");
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3")
        
        //显示界面
        basic.SceneManager.show(SceneNames.ARENA,null,basic.sceneEffect.Fade);
        
        //发送消息
        basic.Dispatcher.dispatch(EventNames.HIDE_CHOOSEBTN);
    }
}
