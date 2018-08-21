/**
 * 仅用于360广告的相关业务:
 * 加载360及设置打底广告
 * 360广告本身上报及联盟上报
 * 本库完全依赖于jQuery
 */
//getBoundingClientRect().top < $(window).height();
import	'./A360.less';

const inview = ($cnt,callback) => {
	const lock = false;
	const isview = () => {
		if($cnt.length === 0)return;
		let win = $(window).height();
		let rect = $cnt[0].getBoundingClientRect();
		if(rect.top > 0 && rect.top < win){
			$(document).unbind('scroll',isview);
		}
	}
	$(document).on('scroll',isview);
	isview();
}

const showurl = (k) => {
	$.each(k,(i,item)=>{
		new Image().src = item.replace(/^(http:\/\/)|(https:\/\/)/gi,'')
	})
}

const viewurl = ($cnt,k) => {
	inview($cnt,()=>{
		showurl(k)
	})
}

const replace360url = (item,urlobj) => {
	return 'http://mini.eastday.com/404.html';
}

const clickurl  = (urlobj) => {
	const clktkurlArry = $.extend(true,[],urlobj.clktk);
	$.each(clktkurlArry,(i,item)=>{
		$('body').append('<iframe src="' + replace360url(item,urlobj) + '" style="display: none;"></iframe>');
	})
}

const template = (o={"a":'xcp',"c":1232}) => {
	return `<p>我是${o.a},我是一个数字${o.c}</p>
			<p>我是${o.a},我是一个数字${o.c}</p>
			我是${o.a},我是一个数字${o.c}
			`.trim()
}
export default {
	'xcp':clickurl,
	template : template
}