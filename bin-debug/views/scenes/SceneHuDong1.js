/**
 *
 * @互动界面1
 *
 */
var SceneHuDong1 = (function (_super) {
    __extends(SceneHuDong1, _super);
    //定义界面
    function SceneHuDong1() {
        _super.call(this);
        this.page_num = 20;
        //定义界面
        this.skinName = SceneHuDong1Skin;
        //判断显示状态
        this.viewStack.selectedIndex = 0;
        this.btn_type.currentState = "up";
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = HuDongItem;
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
        this.btn_type0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeBtn, this);
        this.btn_type1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeBtn, this);
        this.btn_lingqu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLingQuBtn, this);
        this.btn_addfriends.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddFriendsBtn, this);
    }
    var d = __define,c=SceneHuDong1,p=c.prototype;
    //显示前调用
    p.beforeShow = function () {
        var _this = this;
        //数据赋值
        this.page_now = 1;
        //获取数据
        this.txt_tips.visible = false;
        Api.instance.get_game_hudong2(this.page_now, this.page_num, function (response) {
            //判断显示
            if (response.success == true) {
                //数据赋值
                if (response.page.list == undefined) {
                    _this._data.source = [];
                    _this.txt_tips.visible = true;
                }
                else {
                    _this._data.source = response.page.list;
                }
            }
        });
        this._data.refresh();
    };
    //退出按钮
    p.onExitBtn = function (e) {
        //播放声音
        egret.setTimeout(function () {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        }, this, 100);
        //退出界面
        basic.SceneManager.removeTopScene(SceneNames.HUDONG1);
    };
    //领取任务
    p.onLingQuBtn = function (e) {
        var _this = this;
        //领取任务
        Api.instance.get_game_lingqutask(function (response) {
            //判断显示
            if (response.success == true) {
                //显示提示
                PanelTips.instance.show("领取成功", function () {
                    //退出界面
                    basic.SceneManager.removeTopScene(SceneNames.HUDONG1);
                });
                //播放声音
                egret.setTimeout(function () {
                    basic.SoundManager.instance.playEffect("task_mp3");
                }, _this, 100);
            }
            else {
                //显示提示
                PanelTips.instance.show(response.code);
            }
        });
    };
    //添加好友按钮
    p.onAddFriendsBtn = function (e) {
        //播放声音
        egret.setTimeout(function () {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        }, this, 100);
        //显示好友界面
        basic.SceneManager.addTopScene(SceneNames.FRIENDS);
    };
    //类型按钮
    p.onTypeBtn = function (e) {
        //播放声音
        egret.setTimeout(function () {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        }, this, 100);
        //判断显示
        if (e.target.name == "1") {
            this.viewStack.selectedIndex = 1;
            this.btn_type.currentState = "down";
        }
        else if (e.target.name == "0") {
            this.viewStack.selectedIndex = 0;
            this.btn_type.currentState = "up";
        }
    };
    return SceneHuDong1;
})(basic.SceneBase);
egret.registerClass(SceneHuDong1,'SceneHuDong1');
