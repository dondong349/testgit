/**
 *
 * @好友
 *
 */
class SceneFriends extends basic.SceneBase {
    //定义变量
    private list: eui.List;
    private list1: eui.List;
    private list2: eui.List;
    private list3: eui.List;
    private btn_exit: eui.Button;
    private btn_type: eui.Button;
    private btn_type0: eui.Button;
    private btn_type1: eui.Button;
    private viewStack: eui.ViewStack;
    private btn_delete:eui.Button;
    private btn_search: eui.Button;
    private txt_search_tips: eui.Label;
    private txt_search: eui.EditableText;
    private txt_shengqing: eui.Label;
    private _data: eui.ArrayCollection;
    private _data1: eui.ArrayCollection;
    private _data2: eui.ArrayCollection;
    private _data3: eui.ArrayCollection;
    private g_tuijian: eui.Group;
    
    //定义数据变量
    private page_now: number;
    private page_num: number = 20;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneFriendsSkin;
        
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list1.dataProvider = this._data1 = new eui.ArrayCollection();
        this.list2.dataProvider = this._data2 = new eui.ArrayCollection();
        this.list3.dataProvider = this._data3 = new eui.ArrayCollection();
        this.list.itemRenderer = Friends2Item;
        this.list1.itemRenderer = Friends1Item;
        this.list2.itemRenderer = Friends2Item;
        this.list3.itemRenderer = Friends3Item;
        
        //判断显示状态
        this.viewStack.selectedIndex = 0;
        this.btn_type.currentState = "up";
        
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
        this.btn_type0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTypeBtn,this);
        this.btn_type1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTypeBtn,this);
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDeleteBtn,this);
        this.txt_search.addEventListener(egret.FocusEvent.FOCUS_IN,this.onSearchText,this);
        this.txt_search.addEventListener(egret.FocusEvent.FOCUS_OUT,this.onSearchText,this);
        this.g_tuijian.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShuaXinTuiJian,this);
    }
    
    //显示前调用
    beforeShow(): void {
        //判断显示
        if(this.btn_type.currentState == "up") {
            this.viewStack.selectedIndex = 0;
        }
        else {
            this.viewStack.selectedIndex = 1;
        }
        
        //获取数据
        this.getData();
    }
    
    //获取数据
    private getData(_search:string=""){
        //判断显示
        if(this.viewStack.selectedIndex == 0) {
            //获取申请好友数据
            Api.instance.get_applyfriend_list((response: any)=>{
                //数据赋值
                if(response.success == true) {
                    if(response.list==undefined){
                        this._data1.source = [];
                        
                        //显示文字
                        this.txt_shengqing.text = "0个玩家请求加你好友";
                    }
                    else {
                        this._data1.source = response.list;
                        
                        //显示文字
                        this.txt_shengqing.text = String(response.list.length) + "个玩家请求加你好友";
                    }
                    
                }
            });
            this._data1.refresh();
            
            //获取系统推荐好友
            Api.instance.search_forotherfriend_list((response: any) => {
                //数据赋值
                if(response.success == true) {
                    if(response.list == undefined) {
                        this._data2.source = [];
                    }
                    else {
                        this._data2.source = response.list;
                    }
                }
            });
            this._data2.refresh();
        }
        else if(this.viewStack.selectedIndex == 1) {
            //数据赋值
            this.page_now = 1;
            
            //获取好友列表
            Api.instance.get_friend_list(this.page_now,this.page_num,(response: any)=>{
                //数据赋值
                if(response.success == true) {
                    if(response.page.list == undefined) {
                        this._data3.source = [];
                    }
                    else {
                        this._data3.source = response.page.list;
                    }
                }
            });
            this._data3.refresh();
        }
        else if(this.viewStack.selectedIndex == 2) {
            //获取搜索好友
            Api.instance.search_account(_search,1,20,(response: any) => {
                //数据赋值
                if(response.success == true) {
                    if(response.page.list == undefined) {
                        this._data.source = [];
                    }
                    else {
                        this._data.source = response.page.list;
                    }
                }
            });
            this._data.refresh();
        }
    }
    
    //-----------------------定义按钮--------------------
    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //移除好友界面
        basic.SceneManager.removeTopScene(SceneNames.FRIENDS);
    }
    
    //类型按钮
    private onTypeBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //判断显示
        if(e.target.name == "1") {
             //显示界面
            this.viewStack.selectedIndex = 1;
            this.btn_type.currentState = "down";
            
            //获取数据
            this.getData();
        }
        else if(e.target.name == "0") {
            //显示界面
            this.viewStack.selectedIndex = 0;
            this.btn_type.currentState = "up";
            
            //获取数据
            this.getData();
        }
    }
    
    //删除按钮
    private onDeleteBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //清空文本
        this.txt_search.text="";
        this.txt_search_tips.visible = true;
    }
    
    //刷新推荐按钮
    private onShuaXinTuiJian(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //获取系统推荐好友
        Api.instance.search_forotherfriend_list((response: any) => {
            //数据赋值
            if(response.success == true) {
                if(response.list == undefined) {
                    this._data2.source = [];
                }
                else {
                    this._data2.source = response.list;
                }
            }
        });
        this._data2.refresh();
    }
    
    //文本事件
    private onSearchText(e:egret.FocusEvent):void{
        //判断显示
        if(e.type==egret.FocusEvent.FOCUS_IN){
            //隐藏提示
            this.txt_search_tips.visible=false;
        }
        else{
            egret.setTimeout(()=>{
                //判断显示界面
                if(this.txt_search.text == "") {
                    this.txt_search_tips.visible = true;
                }
                else {
                    //显示界面
                    this.viewStack.selectedIndex = 2;
                    
                    //搜索好友
                    this.getData(this.txt_search.text);
                }
            },this,200);
        }
    }
}

//显示条定义
class Friends1Item extends eui.ItemRenderer {
    //定义变量
    private head: Head;
    private btn: eui.Button;
    private btn_add: eui.Button;
    private btn_delete: eui.Button;
    private txt_name: eui.Label;
    private txt_duanwei: eui.Label;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();
        
        //显示头像
        this.head.show(this.data.face);
        
        //显示文本
        this.txt_name.text = this.data.nickname;
        if(this.data.ulevel == undefined) {
            this.txt_duanwei.text = UserData.DengJi_Name[0];
        }
        else {
            this.txt_duanwei.text = UserData.DengJi_Name[this.data.ulevel];
        }
        
        //注册按钮
        this.btn_add.label = "同意";
        this.btn_delete.label = "拒绝";
        this.btn_add.enabled = true;
        this.btn_delete.enabled = true;
        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAddBtn,this);
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDeleteBtn,this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShowMessageBtn,this);
    }
    
    //显示详细信息接口
    private onShowMessageBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //显示界面
        PanelUserMessage.instance.show(this.data.id);
    }
    
    //添加按钮
    private onAddBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //添加好友
        Api.instance.add_friend_agree(this.data.id,(response: any) => {
            //判断显示
            if(response.success==true){
                //显示文本
                this.btn_add.label="已添加";
                this.btn_add.enabled = false;
                this.btn_delete.enabled = false;
            }
            else{
                //显示提示
                PanelTips.instance.show(response.code);
            }
        });
    }
    
    //删除按钮
    private onDeleteBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //拒绝好友
        Api.instance.delete_friend(this.data.id,(response: any) => {
            //判断显示
            if(response.success == true) {
                //显示文本
                this.btn_add.label = "已拒绝";
                this.btn_add.enabled = false;
                this.btn_delete.enabled = false;
            }
            else {
                //显示提示
                PanelTips.instance.show(response.code);
            }
        });
    }
}

//显示条定义
class Friends2Item extends eui.ItemRenderer {
    //定义变量
    private head: Head;
    private btn: eui.Button;
    private btn_add: eui.Button;
    private txt_name: eui.Label;
    private txt_duanwei: eui.Label;
    private txt_touxian: eui.Label;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();

        //显示头像
        this.head.show(this.data.face);
        
        //显示文本
        this.txt_name.text = this.data.nickname;
        if(this.data.ulevel == undefined) {
            this.txt_duanwei.text = UserData.DengJi_Name[0];
            this.txt_touxian.text = UserData.TouXian_Name[0];
        }
        else {
            this.txt_duanwei.text = UserData.DengJi_Name[this.data.ulevel];
            this.txt_touxian.text = UserData.TouXian_Name[this.data.ulevel];
        }
        
        //注册按钮
        this.btn_add.label = "加好友";
        this.btn_add.enabled = true;
        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAddBtn,this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShowMessageBtn,this);
    }

    //显示详细信息接口
    private onShowMessageBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //显示界面
        PanelUserMessage.instance.show(this.data.id);
    }
    
    //添加按钮
    private onAddBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //添加好友
        Api.instance.add_friend(this.data.id,(response: any) => {
            //判断显示
            if(response.success == true) {
                //显示文本
                this.btn_add.label = "已申请";
                this.btn_add.enabled = false;
            }
            else {
                //显示提示
                PanelTips.instance.show(response.code);
            }
        });
    }
}

//显示条定义
class Friends3Item extends eui.ItemRenderer {
    //定义变量
    private head: Head;
    private btn: eui.Button;
    private btn_delete: eui.Button;
    private txt_name: eui.Label;
    private txt_duanwei: eui.Label;
    private txt_touxian: eui.Label;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();
        //显示头像
        this.head.show(this.data.face);
        
        //显示文本
        this.txt_name.text = this.data.nickname;
        if(this.data.ulevel == undefined) {
            this.txt_duanwei.text = UserData.DengJi_Name[0];
            this.txt_touxian.text = UserData.TouXian_Name[0];
        }
        else {
            this.txt_duanwei.text = UserData.DengJi_Name[this.data.ulevel];
            this.txt_touxian.text = UserData.TouXian_Name[this.data.ulevel];
        }
        
        //注册按钮
        this.btn_delete.label = "删除";
        this.btn_delete.enabled = true;
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDeleteBtn,this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShowMessageBtn,this);
    }

    //显示详细信息接口
    private onShowMessageBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        
        //显示界面
        PanelUserMessage.instance.show(this.data.id);
    }
    
    //删除按钮
    private onDeleteBtn(e: egret.TouchEvent): void {
        //播放声音
        egret.setTimeout(() => {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        },this,100);
        
        //添加好友
        PanelChooseTips.instance.show("确认删除此好友吗？",() => {
            Api.instance.delete_friend(this.data.id,(response: any) => {
                //判断显示
                if(response.success == true) {
                    //显示文本
                    this.btn_delete.label = "已删除";
                    this.btn_delete.enabled = false;
                }
                else {
                    //显示提示
                    PanelTips.instance.show(response.code);
                }
            });
        });
    }
}