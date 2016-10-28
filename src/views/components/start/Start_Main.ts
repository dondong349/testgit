/**
 *
 * @游戏主界面
 *
 */
class Start_Main extends eui.Component {
    //定义变量
    private list: eui.List;
    private takecard: TakeCard;
    private information: Information;
    private _data: eui.ArrayCollection;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = Start_Main_Item;
    }
    
    //初始化界面
    public info():void{
        //初始化
        this.takecard.info();
        this.information.info();
        
        //获取数据
        Api.instance.get_start_list((response: any)=>{
            //判断显示
            if(response.success == true) {
                //列表赋值
                this._data.source = response.list;
                GameData.start_list = response.list;
            }
            else {
                
            }
        });
        this._data.refresh();
    }
    
    //停止计时
    public stop():void{
        //停止计时
        this.takecard.stop();
    }
}

//显示条定义
class Start_Main_Item extends eui.ItemRenderer {
    //定义变量
    private btn_yes: eui.Button;
    private txt_name: eui.Label;
    private txt_date: eui.Label;
    private txt_detail: eui.Label;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();
        
        //显示文本
        this.txt_name.text = this.data.num;
        this.txt_date.text = this.data.day + "  " + this.data.date;
        
        //判断显示按钮
        if(this.data.isenroll==true){
            this.btn_yes.label="已报名";
            this.btn_yes.enabled=false;
        }
        else{
            this.btn_yes.label = "报名";
            this.btn_yes.enabled = true;
        }
        
        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
    }
    
    //确定按钮
    private onYesBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3")
        
        //报名提交数据
        Api.instance.start_signup(this.data.code,(response: any)=>{
            //判断显示
            if(response.success==true){
                //数据赋值
                this.data.isenroll=true;
                
                //显示按钮
                this.btn_yes.label = "已报名";
                this.btn_yes.enabled = false;
            }
        });
    }
}


