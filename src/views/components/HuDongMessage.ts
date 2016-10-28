/**
 *
 * @互动信息
 *
 */
class HuDongMessage extends eui.Component {
    //定义变量
    private head: Head;
    private g_detail: eui.Group;
    private txt_yinli: eui.Label;
    private com_type: eui.Component;
    private txt_zichan: eui.Label;
    private txt_xianjin: eui.Label;
    private txt_chicang: eui.Label;
    private txt_chicangjia: eui.Label;
    private rect_jindu1: eui.Rect;
    private rect_jindu2: eui.Rect;
    private img_jindu_back1: eui.Image;
    private img_jindu_back2: eui.Image;
    private txt_gengsui: eui.Label;
    private com_hudong_type: eui.Component;
    private g_gengsui: eui.Group;
    private g_tiaozhan: eui.Group;
    private txt_type: eui.Label;
    private now_showhead: string = "";
    private txt_name: eui.Label;
    private txt_yinli1: eui.Label;
    
    //数据变量
    private hudong_type:number;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //定义按钮
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShowHuDong,this);
    }
    
    //显示界面
    public show(_type:number,_hudong_type:number,_data:any):void{
        //数据赋值
        this.hudong_type = _hudong_type;
        
        //清除文本
        this.txt_name.text = "";
        this.txt_yinli.text = "";
        this.txt_yinli1.text = "";
        
        //判断显示界面
        if(_hudong_type == 0) {
            //显示界面
            this.g_detail.visible = false;
            this.txt_gengsui.visible = false;
            this.com_hudong_type.visible = true;
            
            //显示内容
            this.com_hudong_type.currentState = "hudong";
        }
        else if(_hudong_type == 1) {
            //显示界面
            this.g_detail.visible = true;
            this.txt_gengsui.visible = false;
            this.com_hudong_type.visible = false;
            
            //判断显示头像
            if(this.now_showhead !=_data.url) {
                this.head.show(_data.url);
                this.now_showhead = _data.url;
            }
            
            //判断显示颜色
            if(_data.direction == 1) {
                this.txt_chicang.textColor = 0xEE0B3C;
            }
            else if(_data.direction == 2) {
                this.txt_chicang.textColor = 0x3ECE41;
            }
            
            //显示类型
            if(_data.auctionrole == "RETAIL") {
                this.com_type.currentState = "1";
            }
            else if(_data.auctionrole == "BIGRETAIL") {
                this.com_type.currentState = "2";
            }
            else if(_data.auctionrole == "MECHANISM") {
                this.com_type.currentState = "3";
            }
            
            this.txt_name.text = _data.accountname;
            if(_data.income != undefined) {
                this.txt_yinli1.text = Number(Math.floor(_data.income * 1000) / 10).toString() + "%";
                
                //显示文本颜色
                if(_data.income > 0) {
                    this.txt_yinli1.textColor = 0xEE0B3C;
                }
                else {
                    this.txt_yinli1.textColor = 0x3ECE41;
                }
            }
            else {
                this.txt_yinli1.text = "0%";
                
                //显示文本颜色
                this.txt_yinli1.textColor = 0xEE0B3C;
            }
            
            //显示血条
            this.g_tiaozhan.visible = false;
            this.g_gengsui.visible = false;
            this.txt_type.text = "PK";
            
            //显示宽度
            this.rect_jindu1.width = 241 * Math.min(1,_data.volume / _data.initialcurrentvolume);
            this.rect_jindu2.width = 241 * Math.min(1,Math.max(0,((_data.volume / _data.initialcurrentvolume) - 1)));
        }
        else if(_hudong_type == 2){
            //显示界面
            this.g_detail.visible = true;
            this.txt_gengsui.visible = false;
            this.com_hudong_type.visible = false;
            
            //判断显示头像
            if(this.now_showhead != _data.url) {
                this.head.show(_data.url);
                this.now_showhead = _data.url;
            }
            
            //判断显示颜色
            if(_data.direction == 1) {
                this.txt_chicang.textColor = 0xEE0B3C;
            }
            else if(_data.direction == 2) {
                this.txt_chicang.textColor = 0x3ECE41;
            }
            
            //显示类型
            if(_data.auctionrole == "RETAIL") {
                this.com_type.currentState = "1";
            }
            else if(_data.auctionrole == "BIGRETAIL") {
                this.com_type.currentState = "2";
            }
            else if(_data.auctionrole == "MECHANISM") {
                this.com_type.currentState = "3";
            }
            
            //显示血条
            this.g_gengsui.y = 130;
            this.g_gengsui.visible = true;
            this.g_tiaozhan.visible = false;
            this.txt_type.text = "跟随";
            
            //显示文本
            if(_data.income != undefined) {
                this.txt_yinli.text = Number(Math.floor(_data.income * 1000) / 10).toString() + "%";
                
                //显示文本颜色
                if(_data.income > 0) {
                    this.txt_yinli.textColor = 0xEE0B3C;
                }
                else {
                    this.txt_yinli.textColor = 0x3ECE41;
                }
            }
            else {
                this.txt_yinli.text = "0%";
                
                //显示文本颜色
                this.txt_yinli.textColor = 0xEE0B3C;
            }
            if(_data.currentvolume <= 10000) {
                this.txt_zichan.text = _data.currentvolume;
            }
            else if(_data.currentvolume > 10000 && _data.currentvolume < 100000000) {
                this.txt_zichan.text = Number(Math.floor(_data.currentvolume / 100) / 100).toString() + "万";
            }
            else {
                this.txt_zichan.text = Number(Math.floor(_data.currentvolume / 1000000) / 100).toString() + "亿";
            }
            if(_data.volume <= 10000) {
                this.txt_xianjin.text = _data.volume;
            }
            else if(_data.volume > 10000 && _data.volume < 100000000) {
                this.txt_xianjin.text = Number(Math.floor(_data.volume / 100) / 100).toString() + "万";
            }
            else {
                this.txt_xianjin.text = Number(Math.floor(_data.volume / 1000000) / 100).toString() + "亿";
            }
            if(_data.position != undefined) {
                this.txt_chicang.text = _data.position + "手";
            }
            else {
                this.txt_chicang.text = "0手";
            }
            if(_data.price != undefined) {
                this.txt_chicangjia.text = _data.price;
            }
            else {
                this.txt_chicangjia.text = "0";
            }
        }
        else if(_hudong_type == 3){
            //显示界面
            this.g_detail.visible = false;
            this.txt_gengsui.visible = true;
            this.com_hudong_type.visible = true;
            
            //显示内容
            this.com_hudong_type.currentState = "gensui";
            this.txt_gengsui.text = _data + "名好友跟随";
        }
        else if(_hudong_type == 4 || _hudong_type == 5){
            //显示界面
            this.g_detail.visible = true;
            this.txt_gengsui.visible = false;
            this.com_hudong_type.visible = false;
            
            //判断显示头像
            if(this.now_showhead != _data.url) {
                this.head.show(_data.url);
                this.now_showhead = _data.url;
            }

            //判断显示颜色
            if(_data.direction == 1) {
                this.txt_chicang.textColor = 0xEE0B3C;
            }
            else if(_data.direction == 2) {
                this.txt_chicang.textColor = 0x3ECE41;
            }
            
            //显示类型
            if(_data.auctionrole == "RETAIL") {
                this.com_type.currentState = "1";
            }
            else if(_data.auctionrole == "BIGRETAIL") {
                this.com_type.currentState = "2";
            }
            else if(_data.auctionrole == "MECHANISM") {
                this.com_type.currentState = "3";
            }
            
            //显示血条
            this.g_gengsui.y = 110;
            this.g_tiaozhan.y = 183;
            this.g_gengsui.visible = true;
            this.g_tiaozhan.visible = true;
            this.txt_type.text = "猎杀";
            
            //显示文本
            if(_data.income != undefined) {
                this.txt_yinli.text = Number(Math.floor(_data.income * 1000) / 10).toString() + "%";
                
                //显示文本颜色
                if(_data.income > 0) {
                    this.txt_yinli.textColor = 0xEE0B3C;
                }
                else {
                    this.txt_yinli.textColor = 0x3ECE41;
                }
            }
            else {
                this.txt_yinli.text = "0%";
                
                //显示文本颜色
                this.txt_yinli.textColor = 0xEE0B3C;
            }
            if(_data.currentvolume <= 10000) {
                this.txt_zichan.text = _data.currentvolume;
            }
            else if(_data.currentvolume > 10000 && _data.currentvolume < 100000000) {
                this.txt_zichan.text = Number(Math.floor(_data.currentvolume / 100) / 100).toString() + "万";
            }
            else {
                this.txt_zichan.text = Number(Math.floor(_data.currentvolume / 1000000) / 100).toString() + "亿";
            }
            if(_data.volume <= 10000) {
                this.txt_xianjin.text = _data.volume;
            }
            else if(_data.volume > 10000 && _data.volume < 100000000) {
                this.txt_xianjin.text = Number(Math.floor(_data.volume / 100) / 100).toString() + "万";
            }
            else {
                this.txt_xianjin.text = Number(Math.floor(_data.volume / 1000000) / 100).toString() + "亿";
            }
            if(_data.position != undefined) {
                this.txt_chicang.text = _data.position + "手";
            }
            else {
                this.txt_chicang.text = "0手";
            }
            if(_data.price != undefined) {
                this.txt_chicangjia.text = _data.price;
            }
            else {
                this.txt_chicangjia.text = "0";
            }
            
            //显示宽度
            this.rect_jindu1.width = 241 * Math.min(1,_data.volume / _data.initialcurrentvolume);
            this.rect_jindu2.width = 241 * Math.min(1,Math.max(0,((_data.volume / _data.initialcurrentvolume) - 1)));
        }
    }
    
    //互动界面
    private onShowHuDong(e: egret.TouchEvent): void {
        //判断显示
        if(this.hudong_type == 0) {
            //播放声音
            egret.setTimeout(() => {
                basic.SoundManager.instance.playEffect("nomal_mp3");
            },this,100);
            
            //显示互动1
            basic.SceneManager.addTopScene(SceneNames.HUDONG1);
        }
        else if(this.hudong_type == 3){
            //播放声音
            egret.setTimeout(() => {
                basic.SoundManager.instance.playEffect("nomal_mp3");
            },this,100);
            
            //显示更随好友列表
            PanelGenSui.instance.show();
        }
    }
    
    
    
}
