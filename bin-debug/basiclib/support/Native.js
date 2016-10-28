/**
 * Created by jq on 2016/2/8.
 */
var basic;
(function (basic) {
    var Native = (function (_super) {
        __extends(Native, _super);
        //初始化
        function Native() {
            _super.call(this);
            egret.ExternalInterface.addCallback('egretCall', this.egretCall.bind(this));
        }
        var d = __define,c=Native,p=c.prototype;
        d(Native, "instance"
            ,function () {
                if (this._instance == undefined) {
                    this._instance = new Native();
                }
                return this._instance;
            }
        );
        Native.call = function (method, params) {
            if (params === void 0) { params = null; }
            this.instance.call(method, params);
        };
        d(p, "isNative"
            ,function () {
                return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
            }
        );
        p.egretCall = function (str) {
            var params = JSON.parse(str);
            var method = params.method;
            this.dispatchEventWith(method, false, params);
        };
        p.call = function (method, params) {
            if (params === void 0) { params = null; }
            params = params || {};
            params.method = method;
            egret.ExternalInterface.call('nativeCall', JSON.stringify(params));
        };
        p.navigateToUrl = function (url) {
            if (this.isNative) {
                this.call('navigateToUrl', { url: url });
            }
            else {
                location.href = url;
            }
        };
        p.closeApp = function () {
            this.call('closeApp');
        };
        p.showBanner = function () {
            //console.log('showBanner');
            if (this.isNative) {
                this.call('showBanner');
            }
            else {
            }
        };
        p.hideBanner = function () {
            //console.log('hideBanner');
            if (this.isNative) {
                this.call('hideBanner');
            }
            else {
            }
        };
        p.showInterstitial = function () {
            //console.log('showInterstitial');
            if (this.isNative) {
                this.call('showInterstitial');
            }
            else {
            }
        };
        p.jumpApp = function (params) {
            //console.log('download');
            if (this.isNative) {
                this.call('jumpApp', params);
            }
            else {
                this.navigateToUrl(params.android_apk_url);
            }
        };
        p.openAppMarket = function () {
            //console.log('openAppMarket');
            if (this.isNative) {
                this.call('openAppMarket', {});
            }
            else {
            }
        };
        p.share = function (title, name, description, picture, link) {
            //console.log('share');
            if (this.isNative) {
                this.call('share', {
                    title: title,
                    name: name,
                    description: description,
                    picture: picture,
                    link: link
                });
            }
            else {
            }
        };
        p.shareSystem = function (title, description, link) {
            //console.log('shareSystem');
            if (this.isNative) {
                this.call('shareSystem', {
                    title: title,
                    description: description
                });
            }
            else {
                this.share(title, '', description, '', link);
            }
        };
        p.sendEvent = function (eventId, params) {
            //console.log('sendEvent');
            if (this.isNative) {
                this.call('sendEvent', { eventId: eventId, params: params });
            }
            else {
            }
        };
        return Native;
    })(egret.EventDispatcher);
    basic.Native = Native;
    egret.registerClass(Native,'basic.Native');
})(basic || (basic = {}));
