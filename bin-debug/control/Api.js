/**
 *
 * @定义接口
 *
 */
var Api = (function () {
    function Api() {
    }
    var d = __define,c=Api,p=c.prototype;
    d(Api, "instance"
        ,function () {
            if (this._instance == undefined) {
                this._instance = new Api();
            }
            return this._instance;
        }
    );
    //初始化界面
    p.init = function () {
        Https.init();
    };
    //-----------------------开始界面------------------------
    //获取用户数据
    p.get_account = function (_callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/account/getAccount";
        //数据赋值
        params["accountId"] = "184d77be4b63426e994f3f98be6c4221"; // UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    /*
    * 获取开始列表
    */
    p.get_start_list = function (_callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/enroll/getDatetime";
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //获取开始数据
    p.get_start_data = function (_callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/enroll/getNearestCode";
        //数据赋值
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            if (response.success == true) {
                _callback(response);
            }
        });
    };
    ;
    //报名接口
    p.start_signup = function (_code, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/enroll/signTrade	";
        //数据赋值
        params["code"] = _code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            if (response.success == true) {
                _callback(response);
            }
        });
    };
    ;
    //---------------------------排行榜界面--------------------------
    //获取排行榜接口
    p.get_ranking = function (_type, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/uservalue/seniority";
        //数据赋值
        params["type"] = _type;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //---------------------------我的界面--------------------------
    //修改内容界面
    p.up_user_detail = function (_detail, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/account/updateIntroduce";
        //数据赋值
        params["introduce"] = _detail;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //获取历史记录
    p.get_history = function (_callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/account/getRecord";
        //数据赋值
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //获取个人信息
    p.get_otherusermessage = function (_friendId, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/account/getOtherAccount";
        //数据赋值
        params["friendId"] = _friendId;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //获取个人历史记录
    p.get_otheruserhistory = function (_friendId, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/account/getOtherRecord";
        //数据赋值
        params["pageNo"] = 1;
        params["pageSize"] = 20;
        params["friendId"] = _friendId;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //---------------------------好友界面---------------------------
    /*
    * 获取好友申请列表个数
    */
    p.get_friendsnum = function (_callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/getCreateFriendNum";
        //数据赋值
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    /*
    * 获取好友申请列表
    */
    p.get_applyfriend_list = function (_callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/getOtherCreateFriendList";
        //数据赋值
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    /*
    * 查询非好友用户列表
    */
    p.search_forotherfriend_list = function (_callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/queryForOtherAccount	";
        //数据赋值
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    /*
    * 获取好友列表
    */
    p.get_friend_list = function (_pageNo, _pageSize, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/getFriendList";
        //数据赋值
        params["pageNo"] = _pageNo;
        params["pageSize"] = _pageSize;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    /*
    * 模糊查询搜索用户
    */
    p.search_account = function (_nickname, _pageNo, _pageSize, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/searchAccount";
        //数据赋值
        params["str"] = _nickname;
        params["pageNo"] = _pageNo;
        params["pageSize"] = _pageSize;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    /*
    * 添加好友
    */
    p.add_friend = function (_friendIds, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/makeFriend";
        //数据赋值
        params["friendIds"] = _friendIds;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    /*
    * 同意加好友
    */
    p.add_friend_agree = function (_friendId, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/agreeFriend";
        //数据赋值
        params["friendId"] = _friendId;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    /*
    * 删除好友
    */
    p.delete_friend = function (_friendId, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/deleteFriend";
        //数据赋值
        params["friendId"] = _friendId;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //-------------------------游戏界面---------------------
    //获取游戏界面数据
    p.get_game_data = function (_type, _ktype, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/auction/boInfo";
        //数据赋值
        params["num"] = _type;
        params["ktype"] = _ktype;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //获取互动数据2
    p.get_game_hudong2 = function (_page, _page_num, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/getOLFriendList";
        //数据赋值
        params["pageNo"] = _page;
        params["pageSize"] = _page_num;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //发送消息
    p.send_message = function (_type, _detail, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/sendAuctionMessage";
        //数据赋值
        params["type"] = _type;
        params["message"] = _detail;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //申请挑战好友
    p.up_game_tiaozhan = function (_tiaozhan_id, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/followFriend";
        //数据赋值
        params["type"] = "CHALLENGE";
        params["friendId"] = _tiaozhan_id;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //申请跟随好友
    p.up_game_gensui = function (_gensui_id, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/followFriend";
        //数据赋值
        params["type"] = "FOLLOW";
        params["friendId"] = _gensui_id;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //获取跟随好友列表
    p.get_game_gensui = function (_callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/getFollowList";
        //数据赋值
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //取消跟随
    p.up_game_quxiaogensui = function (_gensuiid, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/deleteFriendRelation";
        //数据赋值
        params["friendId"] = _gensuiid;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //领取猎杀任务
    p.get_game_lingqutask = function (_callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/auction/getHunterTask";
        //数据赋值
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //获取互动信息
    p.get_game_hudongxinxi = function (_callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/getFriendRelationList";
        //数据赋值
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //开始互动
    p.up_game_starthudong = function (_type, _friendid, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/agreeFollowFriend";
        //数据赋值
        params["type"] = _type;
        params["friendId"] = _friendid;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //拒绝互动
    p.up_game_nohudong = function (_friendid, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/accountFriend/deleteFriendRelation";
        //数据赋值
        params["friendId"] = _friendid;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //游戏下单
    p.get_game_xiadan = function (_price, _num, _type, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/auction/goAuction";
        //数据赋值
        params["price"] = _price;
        params["volume"] = _num;
        params["direction"] = _type;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //游戏撤销列表
    p.get_game_chexiao = function (_callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/auction/getAuctionList";
        //数据赋值
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //上传游撤销
    p.up_game_chexiao = function (_id, _callback) {
        //定义变量
        var params = {};
        var url = "/trade/sys/auction/killAuction";
        //数据赋值
        params["id"] = _id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    //智能操作
    p.up_zhinengcaozuo = function (_type, _callback) {
        //定义变量
        var params = {};
        var url;
        //判断赋值
        if (_type == 1) {
            url = "/trade/sys/auction/lightningEveningUp";
        }
        else {
            url = "/trade/sys/auction/layoutAuction";
        }
        //数据赋值
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        //获取数据
        Https.getData(url, params, function (response) {
            //显示回调函数
            _callback(response);
        });
    };
    ;
    return Api;
})();
egret.registerClass(Api,'Api');
