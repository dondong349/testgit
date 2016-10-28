/**
 *
 * @排行榜界面
 *
 */
class Start_Ranking extends eui.Component {
    //定义变量
    private list1: eui.List;
    private list2: eui.List;
    private list3: eui.List;
    private com_type: eui.Component;
    private viewStack: eui.ViewStack;
    private _data1: eui.ArrayCollection;
    private _data2: eui.ArrayCollection;
    private _data3: eui.ArrayCollection;
    private btn_type: eui.Button[] = [];
    private is_getdata: Boolean[] = [false,false,false];
    private txt_name: eui.Label;
    private txt_mingci: eui.Label;
    private txt_jifen: eui.Label;
    private txt_jifen_title: eui.Label;
    
    //数据赋值
    private jifen: number[] = [0,0,0];
    private mingci: number[] = [0,0,0];
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //数据赋值
        for(var i:number=0;i<3;i++){
            //定义变量
            var btn: eui.Button = this["btn_type" + i];
            
            //数据赋值
            this.btn_type[i] = btn;
            
            //注册按钮
            this.btn_type[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTypeBtn,this);
        }
        
        //判断显示
        GameData.ranking_type = 0;
        this.viewStack.selectedIndex = 0;
        this.com_type.currentState = "0";
        this.txt_name.text = "我的";
        
        //定义List
        this.list1.dataProvider = this._data1 = new eui.ArrayCollection();
        this.list2.dataProvider = this._data2 = new eui.ArrayCollection();
        this.list3.dataProvider = this._data3 = new eui.ArrayCollection();
        this.list1.itemRenderer = RankingItem1;
        this.list2.itemRenderer = RankingItem2;
        this.list3.itemRenderer = RankingItem2;
    }
    
    //初始化界面
    public info(): void {
        //获取数据
        this.getData();
    }
    
    //获取数据
    private getData():void{
        //判断显示
        if(this.is_getdata[GameData.ranking_type]==false){
            //获取数据
            Api.instance.get_ranking(GameData.ranking_type,(response: any) => {
                //判断显示
                if(response.success==true){
                    //定义变量
                    var list: any = response.map.list;
                    
                    //数据赋值
                    for(var i: number = 0;i < list.length;i++) {
                        list[i]["num"] = i + 1;
                    }
                    this.mingci[GameData.ranking_type] = response.map.my.valid;
                    if(GameData.ranking_type==0){
                        if(response.map.my.val == undefined) {
                            this.jifen[GameData.ranking_type] = 0;
                        }
                        else {
                            this.jifen[GameData.ranking_type] = response.map.my.val;
                        }
                    }
                    else{
                        if(response.map.my.income == undefined) {
                            this.jifen[GameData.ranking_type] = 0;
                        }
                        else {
                            this.jifen[GameData.ranking_type] = Number(Math.floor(response.map.my.income * 1000) / 10);
                        }
                    }
                    if(GameData.ranking_type == 0) {
                        this._data1.source = list;
                    }
                    else if(GameData.ranking_type == 1) {
                        this._data2.source = list;
                    }
                    else if(GameData.ranking_type == 2) {
                        this._data3.source = list;
                    }
                    this.is_getdata[GameData.ranking_type] = true;
                    if(this.mingci[GameData.ranking_type] == -1) {
                        this.txt_mingci.text = "--";
                    }
                    else{
                        this.txt_mingci.text = this.mingci[GameData.ranking_type].toString();
                    }
                    if(GameData.ranking_type == 0) {
                        this.txt_jifen.text = this.jifen[GameData.ranking_type].toString();
                    }
                    else {
                        if(this.mingci[GameData.ranking_type] == -1) {
                            this.txt_jifen.text = "--";
                        }
                        else {
                            this.txt_jifen.text = this.jifen[GameData.ranking_type] + "%";
                        }
                    }
                }
            });
            
            //判断显示
            if(GameData.ranking_type == 0) {
                this._data1.refresh();
            }
            else if(GameData.ranking_type == 1) {
                this._data2.refresh();
            }
            else if(GameData.ranking_type == 2) {
                this._data3.refresh();
            }
        }
        else{
            if(this.mingci[GameData.ranking_type] == -1) {
                this.txt_mingci.text = "--";
            }
            else {
                this.txt_mingci.text = this.mingci[GameData.ranking_type].toString();
            }
            if(GameData.ranking_type == 0) {
                this.txt_jifen.text = this.jifen[GameData.ranking_type].toString();
            }
            else {
                if(this.mingci[GameData.ranking_type] == -1) {
                    this.txt_jifen.text = "--";
                }
                else {
                    this.txt_jifen.text = this.jifen[GameData.ranking_type] + "%";
                }
            }
        }
    }
    
    //选择按钮
    private onTypeBtn(e:egret.TouchEvent):void{
        //定义变量
        var btnnum:number=Number(e.target.name);
        
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //数据复制
        GameData.ranking_type = btnnum;
        this.viewStack.selectedIndex = btnnum;
        this.com_type.currentState = btnnum.toString();
        if(GameData.ranking_type == 0) {
            this.txt_jifen_title.text = "积分";
        }
        else{
            this.txt_jifen_title.text = "收益率";
        }
        
        //获取数据
        this.getData();
    }
}

//显示条定义
class RankingItem1 extends eui.ItemRenderer {
    //定义变量
    private head: Head;
    private txt_num: eui.Label;
    private img_point: eui.Image;
    private txt_name: eui.Label;
    private txt_jifen: eui.Label;
    private txt_duanwei: eui.Label;
    private txt_touxian: eui.Label;
    private txt_jifen_title: eui.Label;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();
        
        //显示头像
        this.head.show(this.data.url);
        
        //显示名次
        this.txt_num.text = this.data.num;
        if(this.data.num == 1) {
            this.img_point.source = "icon_point_hong_png";
        }
        else if(this.data.num == 2) {
            this.img_point.source = "icon_point_cheng_png";
        }
        else if(this.data.num == 3) {
            this.img_point.source = "icon_point_huang_png";
        }
        else {
            this.img_point.source = "icon_point_hui_png";
        }
        
        //显示文本
        this.txt_name.text = this.data.nickname;
        if(this.data.val == undefined) {
            this.txt_jifen.text = "0";
        }
        else {
            this.txt_jifen.text = this.data.val;
        }
        if(this.data.ulevel == undefined) {
            this.txt_duanwei.text = UserData.DengJi_Name[0];
            this.txt_touxian.text = UserData.TouXian_Name[0];
        }
        else {
            this.txt_duanwei.text = UserData.DengJi_Name[this.data.ulevel];
            this.txt_touxian.text = UserData.TouXian_Name[this.data.ulevel];
        }
        
        //显示个人信息
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
            //播放声音
            basic.SoundManager.instance.playEffect("nomal_mp3");
            
            //显示界面
            PanelUserMessage.instance.show(this.data.accountId);
        },this);
    }
}

//显示条定义
class RankingItem2 extends eui.ItemRenderer {
    //定义变量
    private head: Head;
    private txt_num: eui.Label;
    private img_point: eui.Image;
    private txt_name: eui.Label;
    private txt_jifen: eui.Label;
    private txt_duanwei: eui.Label;
    private txt_touxian: eui.Label;
    private txt_jifen_title: eui.Label;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();
        
        //显示头像
        this.head.show(this.data.url);
        
        //显示名次
        this.txt_jifen_title.text = "收益率";
        this.txt_num.text = this.data.num;
        if(this.data.num == 1) {
            this.img_point.source = "icon_point_hong_png";
        }
        else if(this.data.num == 2) {
            this.img_point.source = "icon_point_cheng_png";
        }
        else if(this.data.num == 3) {
            this.img_point.source = "icon_point_huang_png";
        }
        else {
            this.img_point.source = "icon_point_hui_png";
        }
        
        //显示文本
        this.txt_name.text = this.data.nickname;
        if(this.data.income == undefined) {
            this.txt_jifen.text = "0%";
        }
        else {
            this.txt_jifen.text = Number(Math.floor(this.data.income * 1000) / 10).toString() + "%";
        }
        if(this.data.ulevel == undefined) {
            this.txt_duanwei.text = UserData.DengJi_Name[0];
            this.txt_touxian.text = UserData.TouXian_Name[0];
        }
        else {
            this.txt_duanwei.text = UserData.DengJi_Name[this.data.ulevel];
            this.txt_touxian.text = UserData.TouXian_Name[this.data.ulevel];
        }

        //显示个人信息
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,(e: egret.TouchEvent) => {
            //播放声音
            basic.SoundManager.instance.playEffect("nomal_mp3");
            
            //显示界面
            PanelUserMessage.instance.show(this.data.accountId);
        },this);
    }
}


