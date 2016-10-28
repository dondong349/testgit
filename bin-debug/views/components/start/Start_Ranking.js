/**
 *
 * @排行榜界面
 *
 */
var Start_Ranking = (function (_super) {
    __extends(Start_Ranking, _super);
    function Start_Ranking() {
        _super.apply(this, arguments);
        this.btn_type = [];
        this.is_getdata = [false, false, false];
        //数据赋值
        this.jifen = [0, 0, 0];
        this.mingci = [0, 0, 0];
    }
    var d = __define,c=Start_Ranking,p=c.prototype;
    //初始化
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 3; i++) {
            //定义变量
            var btn = this["btn_type" + i];
            //数据赋值
            this.btn_type[i] = btn;
            //注册按钮
            this.btn_type[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeBtn, this);
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
    };
    //初始化界面
    p.info = function () {
        //获取数据
        this.getData();
    };
    //获取数据
    p.getData = function () {
        var _this = this;
        //判断显示
        if (this.is_getdata[GameData.ranking_type] == false) {
            //获取数据
            Api.instance.get_ranking(GameData.ranking_type, function (response) {
                //判断显示
                if (response.success == true) {
                    //定义变量
                    var list = response.map.list;
                    //数据赋值
                    for (var i = 0; i < list.length; i++) {
                        list[i]["num"] = i + 1;
                    }
                    _this.mingci[GameData.ranking_type] = response.map.my.valid;
                    if (GameData.ranking_type == 0) {
                        if (response.map.my.val == undefined) {
                            _this.jifen[GameData.ranking_type] = 0;
                        }
                        else {
                            _this.jifen[GameData.ranking_type] = response.map.my.val;
                        }
                    }
                    else {
                        if (response.map.my.income == undefined) {
                            _this.jifen[GameData.ranking_type] = 0;
                        }
                        else {
                            _this.jifen[GameData.ranking_type] = Number(Math.floor(response.map.my.income * 1000) / 10);
                        }
                    }
                    if (GameData.ranking_type == 0) {
                        _this._data1.source = list;
                    }
                    else if (GameData.ranking_type == 1) {
                        _this._data2.source = list;
                    }
                    else if (GameData.ranking_type == 2) {
                        _this._data3.source = list;
                    }
                    _this.is_getdata[GameData.ranking_type] = true;
                    if (_this.mingci[GameData.ranking_type] == -1) {
                        _this.txt_mingci.text = "--";
                    }
                    else {
                        _this.txt_mingci.text = _this.mingci[GameData.ranking_type].toString();
                    }
                    if (GameData.ranking_type == 0) {
                        _this.txt_jifen.text = _this.jifen[GameData.ranking_type].toString();
                    }
                    else {
                        if (_this.mingci[GameData.ranking_type] == -1) {
                            _this.txt_jifen.text = "--";
                        }
                        else {
                            _this.txt_jifen.text = _this.jifen[GameData.ranking_type] + "%";
                        }
                    }
                }
            });
            //判断显示
            if (GameData.ranking_type == 0) {
                this._data1.refresh();
            }
            else if (GameData.ranking_type == 1) {
                this._data2.refresh();
            }
            else if (GameData.ranking_type == 2) {
                this._data3.refresh();
            }
        }
        else {
            if (this.mingci[GameData.ranking_type] == -1) {
                this.txt_mingci.text = "--";
            }
            else {
                this.txt_mingci.text = this.mingci[GameData.ranking_type].toString();
            }
            if (GameData.ranking_type == 0) {
                this.txt_jifen.text = this.jifen[GameData.ranking_type].toString();
            }
            else {
                if (this.mingci[GameData.ranking_type] == -1) {
                    this.txt_jifen.text = "--";
                }
                else {
                    this.txt_jifen.text = this.jifen[GameData.ranking_type] + "%";
                }
            }
        }
    };
    //选择按钮
    p.onTypeBtn = function (e) {
        //定义变量
        var btnnum = Number(e.target.name);
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //数据复制
        GameData.ranking_type = btnnum;
        this.viewStack.selectedIndex = btnnum;
        this.com_type.currentState = btnnum.toString();
        if (GameData.ranking_type == 0) {
            this.txt_jifen_title.text = "积分";
        }
        else {
            this.txt_jifen_title.text = "收益率";
        }
        //获取数据
        this.getData();
    };
    return Start_Ranking;
})(eui.Component);
egret.registerClass(Start_Ranking,'Start_Ranking');
//显示条定义
var RankingItem1 = (function (_super) {
    __extends(RankingItem1, _super);
    function RankingItem1() {
        _super.apply(this, arguments);
    }
    var d = __define,c=RankingItem1,p=c.prototype;
    //初始化界面
    p.dataChanged = function () {
        var _this = this;
        _super.prototype.dataChanged.call(this);
        //显示头像
        this.head.show(this.data.url);
        //显示名次
        this.txt_num.text = this.data.num;
        if (this.data.num == 1) {
            this.img_point.source = "icon_point_hong_png";
        }
        else if (this.data.num == 2) {
            this.img_point.source = "icon_point_cheng_png";
        }
        else if (this.data.num == 3) {
            this.img_point.source = "icon_point_huang_png";
        }
        else {
            this.img_point.source = "icon_point_hui_png";
        }
        //显示文本
        this.txt_name.text = this.data.nickname;
        if (this.data.val == undefined) {
            this.txt_jifen.text = "0";
        }
        else {
            this.txt_jifen.text = this.data.val;
        }
        if (this.data.ulevel == undefined) {
            this.txt_duanwei.text = UserData.DengJi_Name[0];
            this.txt_touxian.text = UserData.TouXian_Name[0];
        }
        else {
            this.txt_duanwei.text = UserData.DengJi_Name[this.data.ulevel];
            this.txt_touxian.text = UserData.TouXian_Name[this.data.ulevel];
        }
        //显示个人信息
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            //播放声音
            basic.SoundManager.instance.playEffect("nomal_mp3");
            //显示界面
            PanelUserMessage.instance.show(_this.data.accountId);
        }, this);
    };
    return RankingItem1;
})(eui.ItemRenderer);
egret.registerClass(RankingItem1,'RankingItem1');
//显示条定义
var RankingItem2 = (function (_super) {
    __extends(RankingItem2, _super);
    function RankingItem2() {
        _super.apply(this, arguments);
    }
    var d = __define,c=RankingItem2,p=c.prototype;
    //初始化界面
    p.dataChanged = function () {
        var _this = this;
        _super.prototype.dataChanged.call(this);
        //显示头像
        this.head.show(this.data.url);
        //显示名次
        this.txt_jifen_title.text = "收益率";
        this.txt_num.text = this.data.num;
        if (this.data.num == 1) {
            this.img_point.source = "icon_point_hong_png";
        }
        else if (this.data.num == 2) {
            this.img_point.source = "icon_point_cheng_png";
        }
        else if (this.data.num == 3) {
            this.img_point.source = "icon_point_huang_png";
        }
        else {
            this.img_point.source = "icon_point_hui_png";
        }
        //显示文本
        this.txt_name.text = this.data.nickname;
        if (this.data.income == undefined) {
            this.txt_jifen.text = "0%";
        }
        else {
            this.txt_jifen.text = Number(Math.floor(this.data.income * 1000) / 10).toString() + "%";
        }
        if (this.data.ulevel == undefined) {
            this.txt_duanwei.text = UserData.DengJi_Name[0];
            this.txt_touxian.text = UserData.TouXian_Name[0];
        }
        else {
            this.txt_duanwei.text = UserData.DengJi_Name[this.data.ulevel];
            this.txt_touxian.text = UserData.TouXian_Name[this.data.ulevel];
        }
        //显示个人信息
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            //播放声音
            basic.SoundManager.instance.playEffect("nomal_mp3");
            //显示界面
            PanelUserMessage.instance.show(_this.data.accountId);
        }, this);
    };
    return RankingItem2;
})(eui.ItemRenderer);
egret.registerClass(RankingItem2,'RankingItem2');
