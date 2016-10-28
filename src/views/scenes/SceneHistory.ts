/**
 *
 * @历史记录
 *
 */
class SceneHistory extends basic.SceneBase {
    //定义变量
    private list: eui.List;
    private btn_exit: eui.Button;
    private _data: eui.ArrayCollection;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneHistorySkin;
        
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = HistoryItem;
        
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
    }
    
    //显示前调用
    beforeShow(): void {
        //获取数据
        this.getData();
    }
    
    //获取数据
    private getData(_search: string = "") {
        //获取申请好友数据
        if(UserData.Other_UserId == "") {
            Api.instance.get_history((response: any) => {
                //数据赋值
                if(response.success == true) {
                    this._data.source = response.page.list;
                }
            });
        }
        else{
            Api.instance.get_otheruserhistory(UserData.Other_UserId,(response: any) => {
                //数据赋值
                if(response.success == true) {
                    this._data.source = response.page.list;
                }
            });
        }
        
        this._data.refresh();
    }
    
    //-----------------------定义按钮--------------------
    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //移除历史记录界面
        basic.SceneManager.removeTopScene(SceneNames.HISTORY);
    }
}

//显示条定义
class HistoryItem extends eui.ItemRenderer {
    //定义变量
    private txt_pk: eui.Label;
    private txt_name: eui.Label;
    private txt_jifen: eui.Label;
    private txt_shouyi: eui.Label;
    private txt_liesha: eui.Label;
    private txt_gensui: eui.Label;
    private com_type: eui.Component;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();
        
        //判断显示角色
        if(this.data.role == "RETAIL") {
            this.com_type.currentState = "1";
        }
        else if(this.data.role == "BIGRETAIL") {
            this.com_type.currentState = "2";
        }
        else if(this.data.role == "MECHANISM") {
            this.com_type.currentState = "3";
        }
        
        //判断显示文本
        this.txt_name.text = this.data.auctionName + " 第" + this.data.codenum+"期";
        if(this.data.totalincome == undefined) {
            this.txt_shouyi.text = "0%";
        }
        else {
            this.txt_shouyi.text = Number(Math.floor(this.data.totalincome * 1000)/10).toString() + "%";
        }
        if(this.data.ujifen==undefined){
            this.txt_jifen.text="0";
        }
        else{
            this.txt_jifen.text = this.data.ujifen;
        }
        
        //判断显示
        if(this.data.relation == "HUNTERPREY") {
            this.txt_pk.text = "--";
            this.txt_gensui.text = "--";
            this.txt_liesha.text = this.data.victory + "次";
        }
        else if(this.data.relation == "FOLLOW"){
            this.txt_pk.text = "--";
            if(this.data.victory == "FOLLOW") {
                this.txt_gensui.text = "跟随";
            }
            else{
                this.txt_gensui.text = "被跟随";
            }
            this.txt_liesha.text = "--";
        }
        else if(this.data.relation == "FOLLOWED"){
            this.txt_pk.text = "--";
            this.txt_liesha.text = "--";
            this.txt_gensui.text = this.data.victory;
        }
        else if(this.data.relation == "CHALLENGE") {
            if(this.data.victory == "SUCCESS") {
                this.txt_pk.text = "胜";
            }
            else if(this.data.victory == "TIED") {
                this.txt_pk.text = "平";
            }
            else if(this.data.victory == "FAIL"){
                this.txt_pk.text = "负";
            }
            this.txt_gensui.text = "--";
            this.txt_liesha.text = "--";
        }
        else {
            this.txt_pk.text = "--";
            this.txt_gensui.text = "--";
            this.txt_liesha.text = "--";
        }
    }
    
    
}

