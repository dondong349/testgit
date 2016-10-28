/**
 *
 * @头像
 *
 */
var Head = (function (_super) {
    __extends(Head, _super);
    function Head() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Head,p=c.prototype;
    //初始化
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //显示遮罩
        this.img_mask.visible = true;
        this.img_head.mask = this.img_mask;
    };
    //显示头像
    p.show = function (_address) {
        //判断显示
        if (_address != null && _address != "") {
            this.img_head.source = _address;
        }
    };
    return Head;
})(eui.Component);
egret.registerClass(Head,'Head');
