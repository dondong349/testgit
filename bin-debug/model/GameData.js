/**
 *
 * @游戏数据
 *
 */
var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData,p=c.prototype;
    //开始界面
    GameData.start_list = [];
    //排行榜
    GameData.ranking_type = 0;
    //撤单
    GameData.chedan_list = [];
    return GameData;
})();
egret.registerClass(GameData,'GameData');
