<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>玩死对手盘</title>
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="true"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        html, body {
            -ms-touch-action: none;
            background: #888888;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
    </style>

    <!--这个标签为通过egret提供的第三方库的方式生成的 javascript 文件。删除 modules_files 标签后，库文件加载列表将不会变化，请谨慎操作！-->
    <!--modules_files_start-->
	<script egret="lib" src="libs/modules/egret/egret.min.js"></script>
	<script egret="lib" src="libs/modules/egret/egret.web.min.js"></script>
	<script egret="lib" src="libs/modules/game/game.min.js"></script>
	<script egret="lib" src="libs/modules/game/game.web.min.js"></script>
	<script egret="lib" src="libs/modules/eui/eui.min.js"></script>
	<script egret="lib" src="libs/modules/res/res.min.js"></script>
	<script egret="lib" src="libs/modules/tween/tween.min.js"></script>
	<script egret="lib" src="libs/modules/socket/socket.min.js"></script>
	<!--modules_files_end-->

    <!--这个标签为不通过egret提供的第三方库的方式使用的 javascript 文件，请将这些文件放在libs下，但不要放在modules下面。-->
    <!--other_libs_files_start-->
    <!--other_libs_files_end-->

    <!--这个标签会被替换为项目中所有的 javascript 文件。删除 game_files 标签后，项目文件加载列表将不会变化，请谨慎操作！-->
    <!--game_files_start-->
	<script src="${pageContext.request.contextPath}/resources/js/login/main.min.js?v=2016102201"></script>
	<!--game_files_end-->
	<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/javascript">
    	var access_token = '${access_token}'; //授权token
    	var login_type = '${login_type}'; //登录类型
    	var location_url = '${location_url}';  //接口路劲
    	var weixinfenxiangfriendId = '${accountId}';  //用户ID 
		wx.config({ 
		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		    appId: '${appId}', // 必填，公众号的唯一标识
		    timestamp: parseFloat('${timestamp}'), // 必填，生成签名的时间戳
		    nonceStr: '${nonceStr}', // 必填，生成签名的随机串
		    signature: '${signature}',// 必填，签名，见附录1 
		    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		wx.ready(function(){
		    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
			wx.onMenuShareTimeline({
			    title: '一起来 玩死对手盘', // 分享标题
			    link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb0c84b7d2b09c2c1&redirect_uri=http%3a%2f%2fwww.dae.pw%2fdispatch%3ffuncid%3d93371231%26friendId='+ weixinfenxiangfriendId +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect', // 分享链接
			    imgUrl: 'http://www.dae.pw/resources/images/weixintubiao.png', // 分享图标
			    success: function () { 
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    }
			});
			wx.onMenuShareAppMessage({
			    title: '一起来 玩死对手盘', // 分享标题
			    desc: '交易竞技场：做庄、狙击、套利。多人在线互动：切磋、操练、玩！', // 分享描述
			    link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb0c84b7d2b09c2c1&redirect_uri=http%3a%2f%2fwww.dae.pw%2fdispatch%3ffuncid%3d93371231%26friendId%3d'+ weixinfenxiangfriendId +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect', // 分享链接
			    imgUrl: 'http://www.dae.pw/resources/images/weixintubiao.png', // 分享图标
			    type: '', // 分享类型,music、video或link，不填默认为link
			    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			    success: function () { 
			        // 用户确认分享后执行的回调函数
			    },
			    cancel: function () { 
			        // 用户取消分享后执行的回调函数
			    }
			});
		});
   	</script>
</head>
<body>

     <div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
         data-entry-class="Main"
         data-orientation="auto"
         data-scale-mode="fixedWidth"
         data-frame-rate="30"
         data-content-width="640"
         data-content-height="960"
         data-show-paint-rect="false"
         data-multi-fingered="2"
         data-show-fps="false" data-show-log="false"
         data-log-filter="" data-show-fps-style="x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9">
    </div>
    <script>
        egret.runEgret();
    </script>
</body>
</html>
