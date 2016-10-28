/**
 *
 * @撤单 
 *
 */
class PanelCheDan  extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelCheDan;
    public static get instance(): PanelCheDan {
        if(this._instance == undefined) {
            this._instance = new PanelCheDan();
        }
        return this._instance;
    }
    
    //皮肤设置
    protected init(): void {
        this.skinName = PanelCheDanSkin;
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
        this.list.itemRenderer = CheDanItem;
        
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
        GameData.chedan_list = [];
        Api.instance.get_game_chexiao((response: any)=>{
            //判断显示
            if(response.success == true) {
                //数据赋值
                if(response.list!=undefined){
                    for(var i: number = 0;i < response.list.length;i++) {
                        //数据赋值
                        GameData.chedan_list[i] = response.list[i];
                        GameData.chedan_list[i]["itemnum"] = i;
                    }
                }
                this._data.source = GameData.chedan_list;
            }
        });
        this._data.refresh();
    }
    
    //显示撤单界面
    private onShowCheDan(e:egret.Event):void{
        //刷新列表
        this._data.source = GameData.chedan_list;
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
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //退出函数
        this.funExit();
    }
}

//显示条定义
class CheDanItem extends eui.ItemRenderer {
    //定义变量
    private txt_num: eui.Label;
    private txt_price: eui.Label;
    private btn_chedan: eui.Button;
    private rect_back: eui.Rect;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();
        
        //定义文本颜色
        if(this.data.direction==1){
            this.txt_num.textColor = 0xf3576f;
        }
        else if(this.data.direction == 2) {
            this.txt_num.textColor = 0x3ce490;
        }
        
        //显示文本
        this.txt_price.text = this.data.price;
        this.txt_num.text = this.data.volume + "手";
        
        //显示颜色
        if(this.data.itemnum % 2 == 0) {
            //显示颜色
            this.rect_back.fillColor = 0xfafafa;
        }
        else {
            //显示颜色
            this.rect_back.fillColor = 0xf0f0f0;
        }
        
        //注册按钮
        this.btn_chedan.label = "撤单";
        this.btn_chedan.enabled = true;
        this.btn_chedan.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCheDanBtn,this);
    }
    
    //取消按钮
    private onCheDanBtn(e: egret.TouchEvent): void {
        //播放声音
        egret.setTimeout(() => {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        },this,100);
        
        //上传接口
        Api.instance.up_game_chexiao(this.data.id,(response: any) => {
            //判断显示
            if(response.success == true) {
                //显示按钮
                this.btn_chedan.label = "已撤单";
                this.btn_chedan.enabled = false;
            }
            else{
                //显示提示
                PanelTips.instance.show(response.code);
            }
        });
    }
}
