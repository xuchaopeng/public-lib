import Lianmeng from '../Common/Lianmeng';
import { inview } from '../Common/Utils';

/**
 * 检查广告大类型的方法(baidu  huanqiu  taobao 360 other)
 * @param  src iframe广告src属性
 * @param  id iframe广告id属性
 * @param  p 广告参数对象
 * @return {undefined}
 */
const checkType = (src,id,p) => {
	//环球广告的判断方法
	if (/boardx\.huanqiu\.com\//.test(src)) {
		p.type = 'huanqiu';
		p.union = 'baidu';
		p.isave = true;
		return;
	}
	//淘宝广告的判断方法
	if (/^tanx/.test(id)) {
		p.union = 'taobao';
		p.isave = true;
		return;
	}
	//360广告的方法
	if (src.indexOf('g.mediav.com/s') > -1) {
		p.union = '360';
		p.isave = true;
		return;
	}
	//百度
	if (src.indexOf('pos.baidu.com/') > -1) {
		p.union = 'baidu';
		p.isave = true;
		return;
	}
	//非环球、非淘宝 非360 便是百度
	p.type = 'other';
	p.union = 'other';
	p.isave = true;
}
/**
 * 检查容器内是否可能出现广告
 * @param  cnt 广告容器$对象
 * @param  type 广告类型 ssp uid bdf afp ...
 * @return {isave:true/false,type:type,union:union}
 */
const checkAD = (cnt,type) => {
	const p = {isave:false,type:type||'other',union:'other'};
	if (cnt.length === 0) {
		return p;
	}
	const rame = cnt.find('iframe');
	const ibs = cnt.find('.qihoobannerslider');
	let src = String(rame.attr('src'));
	let id = String(rame.attr('id'));
	if (rame.length !== 0 && rame.height() > 0) {
		if (src.indexOf('/iframe/gg/gg') > -1) {
			var irame = rame.contents().find('iframe');
			if (irame.length !== 0) {
				id = irame.attr('id');
				src = irame.attr('src');
				checkType(src,id,p);
			}
			return p;
		}
		checkType(src,id,p);
		return p;
	}
	if (ibs.length !== 0 && ibs.height() > 0) {
		p.union = '360';
		p.isave = true;
		return p;
	}
	return p;
}
/**
 * 设置联盟统计参数
 * @param  p 广告检查后配置
 * @param  o 广告初始配置
 * @return 联盟统计上报参数
 */
const lMparam = (p,o) => {
    return {
        position:o.position,
        id:o.id,
        type:p.type,
        union:p.union
    }
}
/**
 * 百度点击上报
 * @param  p 广告检查后配置
 */
const clickBd = (p,o) => {
	o.cnt.on('mouseleave',()=> {
		const rame = o.cnt.find('iframe');
		if(!document.activeElement)return;
		if(document.activeElement === rame[0]){
			Lianmeng.report(lMparam(p,o),'click');
		}
	})
}

const checkTCL = (o)=>{
	let p = checkAD(o.cnt,o.type);
	if(p.isave){
		Lianmeng.report(lMparam(p,o),'show');
		inview(o.cnt,()=>{
			Lianmeng.report(lMparam(p,o),'view');
		});
		clickBd(p,o);
		return;
	}
	let t = 0;
	const timer = setInterval(()=>{
		t++;
		p = checkAD(o.cnt,o.type);
		if(p.isave){
			Lianmeng.report(lMparam(p,o),'show');
			inview(o.cnt,()=>{
				Lianmeng.report(lMparam(p,o),'view');
			});
			clickBd(p,o);
			clearInterval(timer)
		}
		if(t > 20)clearInterval(timer)
	},400)
}

export default {
	checkLM:checkTCL
}