/**
 *
 * @跟随列表
 *
 */
class PanelGenSui extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelGenSui;
    public static get instance(): PanelGenSui {
        if(this._instance == undefined) {
            this._instance = new PanelGenSui();
        }
        return this._instance;
    }
    
    //皮肤设置
    protected init(): void {
        this.skinName = PanelGenSuiSkin;
    }
    
    //定义变量
    private list: eui.List;
    private btn_close: eui.Button;
    private _data: eui.ArrayCollection;
    
    //定义界面
    constructor() {
        super();
    }
    
    //初始化界面
    createChildren(): void {
        super.createChildren();

        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = GenSuiItem;
        
        //注册按钮
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
    }
    
    //显示界面
    show(callback: Function = null): void {
        //数据赋值
        this._callback = callback;
        
        //显示界面
        this.popup(this.funExit.bind(this));
        
        //获取跟随数据
        Api.instance.get_game_gensui((response: any)=>{
            //判断显示
            if(response.success == true) {
                //数据赋值
                this._data.source = response.list;
            }
        });
        this._data.refresh();
    }
    
    //退出函数
    private funExit() {
        //退出事件
        this.dealAction();
        
        //判断显示
        if(this._callback) {
            this._callback();
        }
    }
    
    //关闭按钮
    private onCloseBtn(e: egret.TouchEvent) {
        //退出函数
        this.funExit();
    }
}

//显示条定义
class GenSuiItem extends eui.ItemRenderer {
    //定义变量
    private head: Head;
    private txt_name: eui.Label;
    private com_type: eui.Component;
    private btn_quxiao: eui.Button;
    
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
        
        //注册按钮
        this.btn_quxiao.label = "取消";
        this.btn_quxiao.enabled = true;
        this.btn_quxiao.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onQuXiaoBtn,this);
    }
    
    //取消按钮
    private onQuXiaoBtn(e: egret.TouchEvent): void {
        //上传接口
        Api.instance.up_game_quxiaogensui(this.data.accountId,(response: any) => {
            //判断显示
            if(response.success == true) {
                //显示按钮
                this.btn_quxiao.enabled = false;
                this.btn_quxiao.label = "已取消";
            }
        });
    }
    
}
