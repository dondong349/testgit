/**
 * @author Don
 * @信息交互
 *
 */
class Https {
    //定义变量
    static root: string;
    
    //初始化
    public static init():void{
        //数据赋值
        this.root = "http://www.dae.pw:8080/wsdsp-wx/"; //http://www.dae.pw/
    }
    
    //获取数据
    public static getData(url: string,params: any = null,callback: Function){
        //定义变量
        var _url: string;
        
        //数据赋值
        _url = this.root + url;
        _url += "?v=" + Math.random().toString();
        _url += "&" + basic.Utils.obj2query(params);
        if(window["access_token"]) _url += "&" + window["access_token"];
        
        console.log(_url);
        //链接数据
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(_url,egret.HttpMethod.POST);
        request.send();
        
        //定义事件
        request.addEventListener(egret.Event.COMPLETE,(e:egret.Event)=>{
            console.log(request.response);
            //数据赋值
            var response: any = JSON.parse(request.response);
            
            //显示回调函数
            callback(response);
        },this);
    }
}
