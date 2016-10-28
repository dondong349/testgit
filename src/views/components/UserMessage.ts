/**
 *
 * @用户信息
 *
 */
class UserMessage extends eui.Component {
    //定义变量
    private head: Head;
    private txt_yinli: eui.Label;
    private txt_yingli_add: eui.Label;
    private txt_zichan: eui.Label;
    private txt_xianjin: eui.Label;
    private txt_chicang: eui.Label;
    private txt_chicangjia: eui.Label;
    private txt_zuiduokezuo: eui.Label;
    private txt_kezuokong: eui.Label;
    private com_type: eui.Component;
    
    //初始化
    createChildren(): void {
        super.createChildren();
    }
    
    //显示界面
    public show(_type:number,_hudong_type:number,_data:any):void{
        //判断显示头像
        if(_type==0){
            this.head.show(_data.url);
        }
        
        //显示类型
        if(_data.auctionrole == "RETAIL") {
            GameData.game_role = 1;
            this.com_type.currentState = "1";
        }
        else if(_data.auctionrole == "BIGRETAIL") {
            GameData.game_role = 2;
            this.com_type.currentState = "2";
        }
        else if(_data.auctionrole == "MECHANISM") {
            GameData.game_role = 3;
            this.com_type.currentState = "3";
        }
        
        //判断显示颜色
        if(_data.direction == 1) {
            this.txt_chicang.textColor = 0xEE0B3C;
        }
        else if(_data.direction == 2) {
            this.txt_chicang.textColor = 0x3ECE41;
        }
        
        //显示文本
        if(_data.income != undefined) {
            this.txt_yinli.text = Number(Math.floor(_data.income * 1000)/10).toString() + "%";
            
            //显示文本颜色
            if(_data.income > 0) {
                this.txt_yinli.textColor = 0xEE0B3C;
            }
            else {
                this.txt_yinli.textColor = 0x3ECE41;
            }
        }
        else{
            this.txt_yinli.text = "0%";
            this.txt_yinli.textColor = 0xEE0B3C;
        }
        if(_hudong_type == 4 || _hudong_type == 5) {
            if(_data.preyincome != undefined) {
                this.txt_yingli_add.text = Number(Math.floor(_data.preyincome * 1000) / 10).toString() + "%";
                
                //显示文本颜色
                if(_data.preyincome > 0) {
                    this.txt_yingli_add.textColor = 0xEE0B3C;
                }
                else {
                    this.txt_yingli_add.textColor = 0x3ECE41;
                }
            }
            else {
                this.txt_yingli_add.text = "0%";
                this.txt_yingli_add.textColor = 0xEE0B3C;
            }
        }
        else {
            this.txt_yingli_add.text = "";
        }
        console.log(_data.currentvolume);
        if(_data.currentvolume <= 10000) {
            this.txt_zichan.text = _data.currentvolume;
        }
        else if(_data.currentvolume > 10000 && _data.currentvolume < 100000000) {
            this.txt_zichan.text = Number(Math.floor(_data.currentvolume / 100) / 100).toString() + "万";
        }
        else{
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
        else{
            this.txt_chicang.text = "0手";
        }
        if(_data.price != undefined) {
            this.txt_chicangjia.text = _data.price;
        }
        else{
            this.txt_chicangjia.text = "0";
        }
        if(_data.buynum != undefined) {
            this.txt_zuiduokezuo.text = _data.buynum + "手";
        }
        else{
            this.txt_zuiduokezuo.text = "0手";
        }
        if(_data.sellnum != undefined) {
            this.txt_kezuokong.text = _data.sellnum + "手";
        }
        else{
            this.txt_kezuokong.text = "0手";
        }
    }
}
