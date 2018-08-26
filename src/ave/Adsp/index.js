import * as Utils from '../Common/Utils';
import Cookie from '../../pc/Cookie';

const creatData = (o) => {
	if (!o.site || !o.page || !o.pcad) {
		console && console.log('参数配置不全');
	}
	let s = o.pcad.split('|');
	window['DSPDATA'] = new Object();
	$(s).each(function(i, item) {
		DSPDATA[item] = {
			"isdata": 0,
			"domStr": '',
			"clickurls": [],
			"closeurls": [],
			"showurls": [],
			"viewurls": []
		};
	});
}

const cunlishi = () => {
	const url = Utils.nowurl;
	const uk = url.substring(url.lastIndexOf('/')+1,url.indexOf('.html'));
	const cu = (v) => {
		Cookie.set('cookie_readhistory_ad',v,30*24);
	}
	let ha;
	if (/^([a-zA-Z])/.test(uk)) return;
	if(!$.cookie('cookie_readhistory_ad')){
		cu(uk);
	}else{
		const ha = $.cookie('cookie_readhistory_ad').split('/');
		if(ha.length > 2){
			ha.shift();
			ha.push(uk);
			cu(ha.join('/'))
		}else{
			ha.push(uk);
			cu(ha.join('/'))
		}
	}
}

const qulishi = () => {
	if (!Cookie.get('cookie_readhistory_ad')) {
		return 'null';
	}
	const m = Cookie.get('cookie_readhistory_ad');
	const n = m.split('/');
	return n.join(',');
}

const paramDsp = (o) => {
	const url = '//pcsoftwords.dftoutiao.com/dfpcitv/pcitv';
	const param = {
		type: 'toutiao',
		qid: Utils.qid,
		uid: Utils.uid,
		readhistory: qulishi(),
		pageposition: o.page,
		os: Utils.os,
		newsitetype: o.site, //站点
		newsuid: Utils.uid,
		newstype: (o.newstype ? o.newstype : Utils.newstype),
		thisurl: Utils.nowurl
	}
	return {
		url,
		param
	}
}

const reload = (o) => {
	cunlishi();
	creatData(o);
	const p = paramDsp(o);
	$.ajax({
        type: 'GET',
        url: p.url,
        data:p.param ,
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        timeout: 4000,
        success:(res)=>{
        	const d = res.data ? res.data : [];
            if (d.length === 0)return;
        },
        error:()=>{

        }
    })
}

export default {
	load: reload
}