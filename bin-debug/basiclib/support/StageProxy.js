/**
 *Created by jq on 2016/1/24
 * @Stage容器
 *
 */
var basic;
(function (basic) {
    var StageProxy = (function () {
        function StageProxy() {
        }
        var d = __define,c=StageProxy,p=c.prototype;
        //初始化
        StageProxy.init = function (stage, root) {
            this.stage = stage;
            this.root = root;
        };
        d(StageProxy, "width"
            //获取宽度
            ,function () {
                return this.stage.stageWidth;
            }
        );
        d(StageProxy, "height"
            //获取高度
            ,function () {
                return this.stage.stageHeight;
            }
        );
        return StageProxy;
    })();
    basic.StageProxy = StageProxy;
    egret.registerClass(StageProxy,'basic.StageProxy');
})(basic || (basic = {}));
