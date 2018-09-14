import * as Utils from '../Common/Utils';
import Cookie from '../../pc/Cookie';
import '../Common/reset.css';
import './Tem.less';
import * as Tpl from './Tem';
// import '../Common/haha.css';

const creatData = (o) => {
	if (!o.site || !o.page || !o.pcad) {
		console && console.log('参数配置不全');
	}
	let s = o.pcad.split('|');
	window['AdspData'] = new Object();
	$(s).each(function(i, item) {
		AdspData[item] = {
			"isdata": 0,
			"hasdata": 0,
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
    // const url = 'http://127.0.0.1:8090/json/s.json';
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
        success:function(res){
        	const d = res.data ? res.data : [];
        	console.log(res);
            if (d.length === 0)return;
            $.each(d,(k,v) => {
            	const pcad = v.pcadposition;
            	if(!AdspData[pcad])return;
            	AdspData[pcad].clickurls = v.clickbackurls;
	            AdspData[pcad].closeurls = v.closebackurls || '';
	            AdspData[pcad].showurls = v.showbackurls;
	            AdspData[pcad].viewurls = v.inviewbackurls;
	            AdspData[pcad].hasdata = 1;
	            AdspData[pcad].url = v.url;
	            AdspData[pcad].topic = v.topic || '';
	            AdspData[pcad].miniimg = v.miniimg;
	            AdspData[pcad].source = v.source || '';
	            AdspData[pcad].adtype = v.adtype || '';
	            AdspData[pcad].miniimg_size = v.miniimg_size || '';
            });
        },
        error:function(e){
        	$.each(AdspData, function(i, item) {
                item.isdata = 1;
            });
        },
        complete:function(){
        	$.each(AdspData, function(i, item) {
                item.isdata = 1;
            });
        }
    })
}

const ImgReport = (a) => {
	$.each(a,function(i,item){
		new Image().src = item + '&_timerspecial='+new Date().getTime();
	});
}

const checkMe = (item,p) => {
	const tpl = Tpl[p.tpl];
	if(item.hasdata == 1 && tpl){
		console.log(item,'xcp')
		p.cnt.append(tpl(item));
		p.cnt.on('click','.avedsp-hideicon',function(){
			if(item.closeurls)ImgReport(item.closeurls);
			$(this).parents('.avedsp-common').hide();
		});
		p.cnt.on('click','.avedsp-common a',function(e){
			if(item.clickurls)ImgReport(item.clickurls);
		});
		Utils.inview(p.cnt,function(){
			if(item.viewurls)ImgReport(item.viewurls);
		});
		p.callback &&  p.callback(1);
		if(item.showurls)ImgReport(item.showurls);
		return;
	}
	p.callback &&  p.callback(0);
}

const reItem = (p) => {
	if(!p.pcad)return;
	let t = 0 ;
	const num = p.time ? p.time : 15 ;
	if(AdspData[p.pcad].isdata == 1){
		checkMe(AdspData[p.pcad],p);return;
	}
	const timer = setInterval(()=>{
		t ++ ;
		if(t > num){clearInterval(timer);return;}
		if(AdspData[p.pcad].isdata == 1){
			clearInterval(timer);
			checkMe(AdspData[p.pcad],p);
		}
	},200);
}

export default {
	load: reload,
	use:reItem
}