/**
 *
 * @基本信息
 *
 */
var Information = (function (_super) {
    __extends(Information, _super);
    function Information() {
        _super.apply(this, arguments);
    }
    var d = __define,c=Information,p=c.prototype;
    //初始化
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //初始化界面
    p.info = function () {
        //显示头像
        this.head.show(UserData.User_Head);
        //显示文本
        this.txt_name.text = UserData.User_Name;
        this.txt_jifen.text = UserData.User_JiFen.toString();
        this.txt_touxian.text = UserData.TouXian_Name[UserData.User_DengJi];
        this.txt_dengji.text = UserData.DengJi_Name[UserData.User_DengJi];
    };
    return Information;
})(eui.Component);
egret.registerClass(Information,'Information');
