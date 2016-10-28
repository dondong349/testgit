/**
 *
 * @好友
 *
 */
var SceneFriends = (function (_super) {
    __extends(SceneFriends, _super);
    //定义界面
    function SceneFriends() {
        _super.call(this);
        this.page_num = 20;
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
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
        this.btn_type0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeBtn, this);
        this.btn_type1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeBtn, this);
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDeleteBtn, this);
        this.txt_search.addEventListener(egret.FocusEvent.FOCUS_IN, this.onSearchText, this);
        this.txt_search.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onSearchText, this);
        this.g_tuijian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShuaXinTuiJian, this);
    }
    var d = __define,c=SceneFriends,p=c.prototype;
    //显示前调用
    p.beforeShow = function () {
        //判断显示
        if (this.btn_type.currentState == "up") {
            this.viewStack.selectedIndex = 0;
        }
        else {
            this.viewStack.selectedIndex = 1;
        }
        //获取数据
        this.getData();
    };
    //获取数据
    p.getData = function (_search) {
        var _this = this;
        if (_search === void 0) { _search = ""; }
        //判断显示
        if (this.viewStack.selectedIndex == 0) {
            //获取申请好友数据
            Api.instance.get_applyfriend_list(function (response) {
                //数据赋值
                if (response.success == true) {
                    if (response.list == undefined) {
                        _this._data1.source = [];
                        //显示文字
                        _this.txt_shengqing.text = "0个玩家请求加你好友";
                    }
                    else {
                        _this._data1.source = response.list;
                        //显示文字
                        _this.txt_shengqing.text = String(response.list.length) + "个玩家请求加你好友";
                    }
                }
            });
            this._data1.refresh();
            //获取系统推荐好友
            Api.instance.search_forotherfriend_list(function (response) {
                //数据赋值
                if (response.success == true) {
                    if (response.list == undefined) {
                        _this._data2.source = [];
                    }
                    else {
                        _this._data2.source = response.list;
                    }
                }
            });
            this._data2.refresh();
        }
        else if (this.viewStack.selectedIndex == 1) {
            //数据赋值
            this.page_now = 1;
            //获取好友列表
            Api.instance.get_friend_list(this.page_now, this.page_num, function (response) {
                //数据赋值
                if (response.success == true) {
                    if (response.page.list == undefined) {
                        _this._data3.source = [];
                    }
                    else {
                        _this._data3.source = response.page.list;
                    }
                }
            });
            this._data3.refresh();
        }
        else if (this.viewStack.selectedIndex == 2) {
            //获取搜索好友
            Api.instance.search_account(_search, 1, 20, function (response) {
                //数据赋值
                if (response.success == true) {
                    if (response.page.list == undefined) {
                        _this._data.source = [];
                    }
                    else {
                        _this._data.source = response.page.list;
                    }
                }
            });
            this._data.refresh();
        }
    };
    //-----------------------定义按钮--------------------
    //退出按钮
    p.onExitBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //移除好友界面
        basic.SceneManager.removeTopScene(SceneNames.FRIENDS);
    };
    //类型按钮
    p.onTypeBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //判断显示
        if (e.target.name == "1") {
            //显示界面
            this.viewStack.selectedIndex = 1;
            this.btn_type.currentState = "down";
            //获取数据
            this.getData();
        }
        else if (e.target.name == "0") {
            //显示界面
            this.viewStack.selectedIndex = 0;
            this.btn_type.currentState = "up";
            //获取数据
            this.getData();
        }
    };
    //删除按钮
    p.onDeleteBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //清空文本
        this.txt_search.text = "";
        this.txt_search_tips.visible = true;
    };
    //刷新推荐按钮
    p.onShuaXinTuiJian = function (e) {
        var _this = this;
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //获取系统推荐好友
        Api.instance.search_forotherfriend_list(function (response) {
            //数据赋值
            if (response.success == true) {
                if (response.list == undefined) {
                    _this._data2.source = [];
                }
                else {
                    _this._data2.source = response.list;
                }
            }
        });
        this._data2.refresh();
    };
    //文本事件
    p.onSearchText = function (e) {
        var _this = this;
        //判断显示
        if (e.type == egret.FocusEvent.FOCUS_IN) {
            //隐藏提示
            this.txt_search_tips.visible = false;
        }
        else {
            egret.setTimeout(function () {
                //判断显示界面
                if (_this.txt_search.text == "") {
                    _this.txt_search_tips.visible = true;
                }
                else {
                    //显示界面
                    _this.viewStack.selectedIndex = 2;
                    //搜索好友
                    _this.getData(_this.txt_search.text);
                }
            }, this, 200);
        }
    };
    return SceneFriends;
})(basic.SceneBase);
egret.registerClass(SceneFriends,'SceneFriends');
//显示条定义
var Friends1Item = (function (_super) {
    __extends(Friends1Item, _super);
    function Friends1Item() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Friends1Item,p=c.prototype;
    //初始化界面
    p.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        //显示头像
        this.head.show(this.data.face);
        //显示文本
        this.txt_name.text = this.data.nickname;
        if (this.data.ulevel == undefined) {
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
        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtn, this);
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDeleteBtn, this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowMessageBtn, this);
    };
    //显示详细信息接口
    p.onShowMessageBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //显示界面
        PanelUserMessage.instance.show(this.data.id);
    };
    //添加按钮
    p.onAddBtn = function (e) {
        var _this = this;
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //添加好友
        Api.instance.add_friend_agree(this.data.id, function (response) {
            //判断显示
            if (response.success == true) {
                //显示文本
                _this.btn_add.label = "已添加";
                _this.btn_add.enabled = false;
                _this.btn_delete.enabled = false;
            }
            else {
                //显示提示
                PanelTips.instance.show(response.code);
            }
        });
    };
    //删除按钮
    p.onDeleteBtn = function (e) {
        var _this = this;
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //拒绝好友
        Api.instance.delete_friend(this.data.id, function (response) {
            //判断显示
            if (response.success == true) {
                //显示文本
                _this.btn_add.label = "已拒绝";
                _this.btn_add.enabled = false;
                _this.btn_delete.enabled = false;
            }
            else {
                //显示提示
                PanelTips.instance.show(response.code);
            }
        });
    };
    return Friends1Item;
})(eui.ItemRenderer);
egret.registerClass(Friends1Item,'Friends1Item');
//显示条定义
var Friends2Item = (function (_super) {
    __extends(Friends2Item, _super);
    function Friends2Item() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Friends2Item,p=c.prototype;
    //初始化界面
    p.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        //显示头像
        this.head.show(this.data.face);
        //显示文本
        this.txt_name.text = this.data.nickname;
        if (this.data.ulevel == undefined) {
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
        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddBtn, this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowMessageBtn, this);
    };
    //显示详细信息接口
    p.onShowMessageBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //显示界面
        PanelUserMessage.instance.show(this.data.id);
    };
    //添加按钮
    p.onAddBtn = function (e) {
        var _this = this;
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //添加好友
        Api.instance.add_friend(this.data.id, function (response) {
            //判断显示
            if (response.success == true) {
                //显示文本
                _this.btn_add.label = "已申请";
                _this.btn_add.enabled = false;
            }
            else {
                //显示提示
                PanelTips.instance.show(response.code);
            }
        });
    };
    return Friends2Item;
})(eui.ItemRenderer);
egret.registerClass(Friends2Item,'Friends2Item');
//显示条定义
var Friends3Item = (function (_super) {
    __extends(Friends3Item, _super);
    function Friends3Item() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Friends3Item,p=c.prototype;
    //初始化界面
    p.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        //显示头像
        this.head.show(this.data.face);
        //显示文本
        this.txt_name.text = this.data.nickname;
        if (this.data.ulevel == undefined) {
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
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDeleteBtn, this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowMessageBtn, this);
    };
    //显示详细信息接口
    p.onShowMessageBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //显示界面
        PanelUserMessage.instance.show(this.data.id);
    };
    //删除按钮
    p.onDeleteBtn = function (e) {
        var _this = this;
        //播放声音
        egret.setTimeout(function () {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        }, this, 100);
        //添加好友
        PanelChooseTips.instance.show("确认删除此好友吗？", function () {
            Api.instance.delete_friend(_this.data.id, function (response) {
                //判断显示
                if (response.success == true) {
                    //显示文本
                    _this.btn_delete.label = "已删除";
                    _this.btn_delete.enabled = false;
                }
                else {
                    //显示提示
                    PanelTips.instance.show(response.code);
                }
            });
        });
    };
    return Friends3Item;
})(eui.ItemRenderer);
egret.registerClass(Friends3Item,'Friends3Item');
