import  * as Util from '../Common/Utils';

/**
 * [LianMeng 联盟上报]
 * ex:  LianMeng.report({
 *          position:'right_1',  //默认:null
 *          id:'dQiknS',  //360广告id 或 百度联盟广告id; 默认:null
 *          union: '360',  //广告的类型baidu 360 taobao zhike; 默认:baidu
 *          type : 'big',  //union=360时,type值有big\four\one ; union=baidu时,type值有ssp\uid\afp\bdf\ ;默认:null
 *          title : '聪明的女人不买面膜，洗脸用肥皂擦一擦', //默认:null
 *          url : 'http://tt.cn.com', //默认:null
 *          pgtype : 'detail', //页面大类别: detail\topic\index\hbzx\.. ; 默认: detail
 *          newsType : 'yule'  //新闻类别 
 *      },
 *      'show',  // show\view\click
 *      callback)
 */
const Lianmeng = {
    param(item){
        return {
            qid: Util.qid,
            nowurl: Util.nowurl,
            uid: Util.uid,
            softname: Util.softname,
            softtype: Util.softtype,
            OSType: Util.os,
            browsertype: Util.brow,
            gg_position: item.position || 'null',               // 广告的位置
            gg_id: item.id || 'null',                     // 广告id
            gg_union:item.union || 'baidu', // 广告联盟 'zhike'
            gg_type:item.type || 'null',                  //广告类型
            gg_title:(item.title ? encodeURIComponent(item.title): 'null'), //广告标题
            gg_url: (item.url ? encodeURIComponent(item.url) : 'null'), //广告落地页url
            pgtype:(item.pgtype ? item.pgtype :'detail'), //页面大类别
            newsType:(item.newstype?item.newstype:Util.newstype), //页面的类别
            _timer:new Date().getTime()
        }
    },
    report(item,t='show',callback){
        const host = /^testmini.eastday.com/.test(location.host) ? '106.75.98.65' : 'pcunionreportlog.dftoutiao.com';
        let url = '//'+host+'/dspdatalog/pcunionshow?';
        switch(t){
            case 'click' :
                url = '//'+host+'/dspdatalog/pcunionclick?';break;
            case 'show' :
                url = '//pcunionreportlog.shaqm.com/dspdatalog/pcunionshow?';break;
            case 'view' :
                url = '//'+host+'/dspdatalog/pcunioninview?';break;
        }
        let param = Lianmeng.param(item);
        if(t === 'click'){item.idx ? param.idx = item.idx : ''}
        const urlstring = Util.stringify(param) ;
        new Image().src = url + urlstring;
        callback && callback();
    }
}

export default Lianmeng ;