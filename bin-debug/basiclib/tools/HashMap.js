/**
 * Created by jq on 2016/2/6.
 */
var basic;
(function (basic) {
    var HashMap = (function () {
        //初始化
        function HashMap() {
            this.clear();
        }
        var d = __define,c=HashMap,p=c.prototype;
        //判断是Key否存在
        p.containsKey = function (key) {
            return key in this.obj;
        };
        //判断对象是否存在
        p.containsValue = function (value) {
            for (var key in this.obj) {
                if (this.obj[key] == value) {
                    return true;
                }
            }
            return false;
        };
        //加入对象
        p.put = function (key, value) {
            if (!this.containsKey(key)) {
                this.obj[key] = value;
                this._length++;
            }
        };
        //获取对象
        p.get = function (key) {
            return this.containsKey(key) ? this.obj[key] : null;
        };
        //移除对象
        p.remove = function (key) {
            if (this.containsKey(key)) {
                var value = this.obj;
                delete this.obj[key];
                this._length--;
                return value;
            }
            return null;
        };
        p.foreach = function (callback, thisOjb) {
            for (var key in this.obj) {
                if (!callback.call(thisOjb, key, this.obj[key])) {
                    break;
                }
            }
        };
        //随机获取一个对象
        p.randomGet = function () {
            var values = this.valueSet;
            return values[Math.floor(Math.random() * values.length)];
        };
        d(p, "keySet"
            //获取所有Key
            ,function () {
                var keys = [];
                for (var key in this.obj) {
                    keys.push(key);
                }
                return keys;
            }
        );
        d(p, "valueSet"
            //获取所有对象
            ,function () {
                var values = [];
                for (var key in this.obj) {
                    values.push(this.obj[key]);
                }
                return values;
            }
        );
        d(p, "size"
            //获取长度
            ,function () {
                return this._length;
            }
        );
        //清除
        p.clear = function () {
            this._length = 0;
            this.obj = {};
        };
        return HashMap;
    })();
    basic.HashMap = HashMap;
    egret.registerClass(HashMap,'basic.HashMap');
})(basic || (basic = {}));
