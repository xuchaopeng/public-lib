import { inview,getScript} from '../Common/Utils';
import Check from './Check';

const loaduid = (id, elem) => {
	try {
		typeof(BAIDU_CLB_fillSlotAsync) == 'undefined' ?
		(window.slotbydup = window.slotbydup || []).push({
			id: id,
			container: elem,
			size: '300,250',
			display: 'inlay-fix'
		}): BAIDU_CLB_fillSlotAsync(id, elem);
	} catch (e) {
		console && console.log('uid广告加载缺少依赖文件')
	}
}

const loadAFP = (id) => {
	try{
		_acM({
			aid: o.id,
			format: 1,
			mode: 1,
			gid: 1,
			serverbaseurl: "afpeng.alimama.com/"
		});
	}catch(e){
		console && console.log('缺少联盟广告依赖文件')
	}
}

const loadssp = (id,s) => {
	try{
		(window.slotbydup = window.slotbydup || []).push({
		id: id,
		container: s,
		size: '582,35',
		display: 'inlay-fix'
	});
	}catch(e){console&&console.log('ssp加载失败')}
}

const loadBDF = (id,s) => {
	const domain = '//df666.pzhttaax.cn/';
	const url = domain + id + '.js';
	const element = buildYs(s);
	getScript(url,element,()=>{
		console.log('success');
	})
}

const buildYs = (s) => {
	if(typeof($) === 'function' && s instanceof $){
		return s[0];
	}
	if(typeof(s) === 'string'){
		return document.getElementById(s)
	}
	return null;
}

const buildcnt = (cnt,s) => {
	if(typeof($) === 'function' && cnt instanceof $){
		cnt.append('<div id="'+s+'"></div>');
		return;
	}
	let div = document.createElement('div');
	div.setAttribute('id',s);
	try{
		typeof(cnt) === 'string'
		? document.getElementById(cnt).appendChild(div)
		: cnt.appendChild(div);
	}catch(e){
		console && console.log('支持容器jquery对象或id')
	}
}

const reload = (o) => {
	if (!o.id || !o.type) return;
	const s = "_" + Math.random().toString(36).slice(2);
	if(o.cnt){
		buildcnt(o.cnt,s)
	}else{
		document.write('<div id="'+s+'"></div>');
	}
	switch(o.type) {
		case 'ssp':
			loadssp(o.id,s)
			break;
		case 'afp':
			loadAFP(o.id)
			break;
		case 'bdf':
			loadBDF(o.id,s)
			break;
		case 'uid':
			(o.sign ? inview(o.sign,()=>{
				loaduid(o.id, s)
			}) : loaduid(o.id, s) )
			break;
		case 'huanqiu':
			loadAFP(o.id)
			break;
		default:
			break;
	}
	//联盟上报
	if(o.needlm !== false){Check.checkLM(o);}
	typeof(o.callback) === 'function' && o.callback();
}

export default {
	load: reload
}