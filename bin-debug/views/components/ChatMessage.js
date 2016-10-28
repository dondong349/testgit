/**
 *
 * @聊天信息
 *
 */
var ChatMessage = (function (_super) {
    __extends(ChatMessage, _super);
    //定义界面
    function ChatMessage() {
        _super.call(this);
        //定义界面
        this.skinName = ChatMessageSkin;
    }
    var d = __define,c=ChatMessage,p=c.prototype;
    //显示界面
    p.show = function (_detail, _color) {
        //定义变量
        var show_detail;
        //判断赋值
        if (_color != undefined) {
            if (_detail.indexOf("：") >= 0) {
                show_detail = '<font color=' + _color + '>';
                show_detail += _detail.substring(0, _detail.indexOf("：") + 1) + '</font>';
                show_detail += _detail.substring(_detail.indexOf("：") + 1, _detail.length);
            }
            else {
                show_detail = _detail;
            }
        }
        else {
            show_detail = _detail;
        }
        //显示文本
        this.txt_detail.textFlow = (new egret.HtmlTextParser).parser(show_detail);
        //显示界面高度
        this.height = this.txt_detail.height + 10;
    };
    return ChatMessage;
})(eui.Component);
egret.registerClass(ChatMessage,'ChatMessage');
