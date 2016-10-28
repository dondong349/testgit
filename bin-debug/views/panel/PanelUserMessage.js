/**
 *
 * @个人信息
 *
 */
var PanelUserMessage = (function (_super) {
    __extends(PanelUserMessage, _super);
    //定义界面
    function PanelUserMessage() {
        _super.call(this);
    }
    var d = __define,c=PanelUserMessage,p=c.prototype;
    d(PanelUserMessage, "instance"
        ,function () {
            if (this._instance == undefined) {
                this._instance = new PanelUserMessage();
            }
            return this._instance;
        }
    );
    //皮肤设置
    p.init = function () {
        this.skinName = PanelUserMessageSkin;
    };
    //初始化界面
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.btn_history.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHistoryBtn, this);
    };
    //显示界面
    p.show = function (_friendId, callback) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        //数据赋值
        this._callback = callback;
        this.now_userid = _friendId;
        //显示界面
        this.popup(this.funExit.bind(this));
        //获取数据
        Api.instance.get_otherusermessage(_friendId, function (response) {
            if (response.success == true) {
                //显示头像
                _this.head.show(response.data.face);
                //显示文本
                _this.txt_name.text = response.data.nickname;
                if (response.data.val == undefined) {
                    _this.txt_jifen.text = "0";
                }
                else {
                    _this.txt_jifen.text = response.data.val;
                }
                if (response.data.ulevel == undefined) {
                    _this.txt_touxian.text = UserData.TouXian_Name[0];
                    _this.txt_dengji.text = UserData.DengJi_Name[0];
                }
                else {
                    _this.txt_touxian.text = UserData.TouXian_Name[response.data.ulevel];
                    _this.txt_dengji.text = UserData.DengJi_Name[response.data.ulevel];
                }
                if (response.data.introduce == undefined) {
                    _this.txt_detail.text = "";
                }
                else {
                    _this.txt_detail.text = response.data.introduce;
                }
            }
        });
    };
    //退出函数
    p.funExit = function () {
        //退出事件
        this.dealAction();
    };
    //退出按钮
    p.onCloseBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("nomal_mp3");
        //退出函数
        this.funExit();
    };
    //历史记录按钮
    p.onHistoryBtn = function (e) {
        //退出事件
        this.dealAction();
        //数据赋值
        UserData.Other_UserId = this.now_userid;
        //显示历史记录界面
        basic.SceneManager.addTopScene(SceneNames.HISTORY);
        //播放声音
        egret.setTimeout(function () {
            basic.SoundManager.instance.playEffect("nomal_mp3");
        }, this, 100);
    };
    return PanelUserMessage;
})(basic.PanelBase);
egret.registerClass(PanelUserMessage,'PanelUserMessage');
