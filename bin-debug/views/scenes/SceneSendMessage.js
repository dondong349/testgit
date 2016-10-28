/**
 *
 * @发送消息
 *
 */
var SceneSendMessage = (function (_super) {
    __extends(SceneSendMessage, _super);
    //定义界面
    function SceneSendMessage() {
        _super.call(this);
        this.send_typedetail = ["NEWSMESSAGE", "SYSMESSAGE", "ACCOUNTMESSAGE"];
        //定义界面
        this.skinName = SceneSendMessageSkin;
        //注册按钮
        this.txt_detail.addEventListener(egret.Event.CHANGE, this.onChangeText, this);
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
        this.btn_send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendBtn, this);
        this.rect_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
    }
    var d = __define,c=SceneSendMessage,p=c.prototype;
    //显示前调用
    p.beforeShow = function () {
        //显示文本
        this.txt_title.text = GameData.sendmessage_title;
        //显示界面
        this.txt_tips.text = "";
        this.txt_detail.text = "";
        this.btn_send.enabled = false;
    };
    //退出按钮
    p.onExitBtn = function (e) {
        //退出界面
        basic.SceneManager.removeTopScene(SceneNames.SENDMESSAGE);
    };
    //改变文本事件
    p.onChangeText = function (e) {
        //判断显示界面
        if (this.txt_detail.text == "") {
            this.btn_send.enabled = false;
        }
        else {
            this.btn_send.enabled = true;
        }
    };
    //发送按钮
    p.onSendBtn = function (e) {
        var _this = this;
        //显示文本
        this.txt_tips.text = "";
        //发送消息
        if (this.txt_detail.text != "") {
            Api.instance.send_message(this.send_typedetail[GameData.sendmessage_type], this.txt_detail.text, function (response) {
                //判断显示界面
                if (response.success == true) {
                    //退出界面
                    basic.SceneManager.removeTopScene(SceneNames.SENDMESSAGE);
                }
                else {
                    //显示文本
                    _this.txt_tips.text = response.code;
                }
            });
        }
    };
    return SceneSendMessage;
})(basic.SceneBase);
egret.registerClass(SceneSendMessage,'SceneSendMessage');
