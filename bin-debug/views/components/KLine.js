/**
 *
 * @K线
 *
 */
var KLine = (function (_super) {
    __extends(KLine, _super);
    //定义界面
    function KLine() {
        _super.call(this);
        //设置皮肤
        this.skinName = KLineSkin;
    }
    var d = __define,c=KLine,p=c.prototype;
    //显示界面
    p.show = function (_width, _kedu, _data) {
        //定义变量
        var zoomrate = 75 / _kedu;
        //判断显示界面
        if (_data.openprice <= _data.closeprice) {
            this.currentState = "1";
            this.rect_box.height = Math.max(1, (_data.closeprice - _data.openprice) * zoomrate);
            this.rect_up.height = (_data.topprice - _data.closeprice) * zoomrate;
            this.rect_down.height = (_data.openprice - _data.lowprice) * zoomrate;
        }
        else {
            this.currentState = "2";
            this.rect_box.height = Math.max(1, (_data.openprice - _data.closeprice) * zoomrate);
            this.rect_up.height = (_data.topprice - _data.openprice) * zoomrate;
            this.rect_down.height = (_data.closeprice - _data.lowprice) * zoomrate;
        }
        //定义高度
        this.rect_box.y = this.rect_up.height;
        this.height = (_data.topprice - _data.lowprice) * zoomrate;
        //显示宽度
        this.width = _width;
    };
    return KLine;
})(eui.Component);
egret.registerClass(KLine,'KLine');
