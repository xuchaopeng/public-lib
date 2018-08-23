const lianMeng = {
    report(item,t='show'){
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
        param = {
            var qid = self.get_qid(),
            nowurl = window.location.href.split('?')[0].split('#')[0],
            uid = self.rec_uid(),
            softname = 'toutiao',
            softtype = 'DFTT',
            OSType = self.Os_type(),
            browsertype = self.explorerType(),
            gg_position = item.wz, // 广告的位置
            gg_id = item.id, // 广告id
            gg_union = item.chinaname || 'baidu', // 广告联盟 'zhike'
            gg_type = item.type, //广告类型
            gg_title = (item.gg_title ? item.gg_title : 'null'), //广告标题
            gg_url = (item.gg_url ? item.gg_url : 'null'), //广告落地页url
            pgtype = (item.pgtype ? item.pgtype :'detail'), //页面大类别
            newsType =(item.newstype?item.newstype:
                      window.newstype==='topic'?'null':
                      window.newstype), //页面的类别
            idx = t === 'click' ? (item.idx ? '&idx='+item.idx : '') : '';
        }
    }
}

export default lianMeng ;