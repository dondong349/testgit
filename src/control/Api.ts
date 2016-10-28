/**
 *
 * @定义接口
 *
 */
class Api {
    //封装
    private static _instance: Api;
    public static get instance(): Api {
        if(this._instance == undefined) {
            this._instance = new Api();
        }
        return this._instance;
    }
    
    //初始化界面
    init(): void {
        Https.init();
    }
    
    //-----------------------开始界面------------------------
    //获取用户数据
    get_account(_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/account/getAccount";
        
        //数据赋值
        params["accountId"] = "184d77be4b63426e994f3f98be6c4221";// UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    }
    
    /*
    * 获取开始列表
    */
    get_start_list(_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/enroll/getDatetime";
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //获取开始数据
    get_start_data(_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/enroll/getNearestCode";
        
        //数据赋值
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            if(response.success == true) {
                _callback(response);
            }
        });
    };
    
    //报名接口
    start_signup(_code: string,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/enroll/signTrade	";
        
        //数据赋值
        params["code"] = _code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            if(response.success == true) {
                _callback(response);
            }
        });
    };
    
    //---------------------------排行榜界面--------------------------
    //获取排行榜接口
    get_ranking(_type: number,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/uservalue/seniority";
        
        //数据赋值
        params["type"] = _type;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //---------------------------我的界面--------------------------
    //修改内容界面
    up_user_detail(_detail: string,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/account/updateIntroduce";
        
        //数据赋值
        params["introduce"] = _detail;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //获取历史记录
    get_history(_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/account/getRecord";
        
        //数据赋值
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //获取个人信息
    get_otherusermessage(_friendId:string,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/account/getOtherAccount";
        
        //数据赋值
        params["friendId"] = _friendId;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //获取个人历史记录
    get_otheruserhistory(_friendId: string,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/account/getOtherRecord";
        
        //数据赋值
        params["pageNo"] = 1;
        params["pageSize"] = 20;
        params["friendId"] = _friendId;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //---------------------------好友界面---------------------------
    /*
    * 获取好友申请列表个数
    */
    get_friendsnum(_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/getCreateFriendNum";
        
        //数据赋值
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    /*
    * 获取好友申请列表
    */
    get_applyfriend_list(_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/getOtherCreateFriendList";
        
        //数据赋值
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    /*
    * 查询非好友用户列表
    */
    search_forotherfriend_list(_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/queryForOtherAccount	";
        
        //数据赋值
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    /*
    * 获取好友列表
    */
    get_friend_list(_pageNo: number,_pageSize: number,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/getFriendList";
        
        //数据赋值
        params["pageNo"] = _pageNo;
        params["pageSize"] = _pageSize;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    /*
    * 模糊查询搜索用户
    */
    search_account(_nickname: string,_pageNo: number,_pageSize: number,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/searchAccount";
        
        //数据赋值
        params["str"] = _nickname;
        params["pageNo"] = _pageNo;
        params["pageSize"] = _pageSize;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    /*
    * 添加好友
    */
    add_friend(_friendIds: string,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/makeFriend";
        
        //数据赋值
        params["friendIds"] = _friendIds;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    /*
    * 同意加好友
    */
    add_friend_agree(_friendId: string,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/agreeFriend";
        
        //数据赋值
        params["friendId"] = _friendId;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };

    /*
    * 删除好友
    */
    delete_friend(_friendId: string,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/deleteFriend";
        
        //数据赋值
        params["friendId"] = _friendId;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //-------------------------游戏界面---------------------
    //获取游戏界面数据
    get_game_data(_type: number,_ktype:string,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/auction/boInfo";
        
        //数据赋值
        params["num"] = _type;
        params["ktype"] = _ktype;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //获取互动数据2
    get_game_hudong2(_page:number,_page_num:number,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/getOLFriendList";
        
        //数据赋值
        params["pageNo"] = _page;
        params["pageSize"] = _page_num;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //发送消息
    send_message(_type: string,_detail,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/sendAuctionMessage";
        
        //数据赋值
        params["type"] = _type;
        params["message"] = _detail;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //申请挑战好友
    up_game_tiaozhan(_tiaozhan_id: string,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/followFriend";
        
        //数据赋值
        params["type"] = "CHALLENGE";
        params["friendId"] = _tiaozhan_id;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //申请跟随好友
    up_game_gensui(_gensui_id: string,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/followFriend";
        
        //数据赋值
        params["type"] = "FOLLOW";
        params["friendId"] = _gensui_id;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //获取跟随好友列表
    get_game_gensui(_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/getFollowList";
        
        //数据赋值
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //取消跟随
    up_game_quxiaogensui(_gensuiid:string,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/deleteFriendRelation";
        
        //数据赋值
        params["friendId"] = _gensuiid;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //领取猎杀任务
    get_game_lingqutask(_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/auction/getHunterTask";
        
        //数据赋值
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //获取互动信息
    get_game_hudongxinxi(_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/getFriendRelationList";
        
        //数据赋值
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //开始互动
    up_game_starthudong(_type:string,_friendid: string,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/agreeFollowFriend";
        
        //数据赋值
        params["type"] = _type;
        params["friendId"] = _friendid;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //拒绝互动
    up_game_nohudong(_friendid: string,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/accountFriend/deleteFriendRelation";
        
        //数据赋值
        params["friendId"] = _friendid;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //游戏下单
    get_game_xiadan(_price: number,_num: number,_type: number,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/auction/goAuction";
        
        //数据赋值
        params["price"] = _price;
        params["volume"] = _num;
        params["direction"] = _type;
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //游戏撤销列表
    get_game_chexiao(_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/auction/getAuctionList";
        
        //数据赋值
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    //上传游撤销
    up_game_chexiao(_id:number,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string = "/trade/sys/auction/killAuction";
        
        //数据赋值
        params["id"] = _id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    
    //智能操作
    up_zhinengcaozuo(_type: number,_callback: Function): void {
        //定义变量
        var params: any = {};
        var url: string;
        
        //判断赋值
        if(_type==1){
            url = "/trade/sys/auction/lightningEveningUp";
        }
        else{
            url = "/trade/sys/auction/layoutAuction";
        }
        
        //数据赋值
        params["code"] = UserData.User_Code;
        params["accountId"] = UserData.User_Id;
        
        //获取数据
        Https.getData(url,params,(response: any) => {
            //显示回调函数
            _callback(response);
        });
    };
    
    
}
