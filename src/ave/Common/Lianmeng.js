import  * as Util from '../Common/Utils';

const LianMeng = {
    param(item){
        return {
            qid: Util.qid,
            nowurl: Util.nowurl,
            uid: Util.uid,
            softname: Util.softname,
            softtype: Util.softtype,
            OSType: Util.os,
            browsertype: Util.brow,
            gg_position: item.wz || 'null',               // 广告的位置
            gg_id: item.id || 'null',                     // 广告id
            gg_union:item.chinaname || 'baidu', // 广告联盟 'zhike'
            gg_type:item.type || 'null',                  //广告类型
            gg_title:(item.gg_title ? item.gg_title : 'null'), //广告标题
            gg_url: (item.gg_url ? item.gg_url : 'null'), //广告落地页url
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
        let param = LianMeng.param(item);
        if(t === 'click'){item.idx ? param.idx = item.idx : ''}
        const urlstring = Util.stringify(param) ;
        new Image().src = url + urlstring;
        callback && callback();
    }
}

export default LianMeng ;