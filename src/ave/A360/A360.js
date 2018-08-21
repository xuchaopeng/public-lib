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
	const win = $(window).height();
	const isview = () => {
		if($cnt.length === 0)return;
		win = $(window).height();
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
		new Image().src = item.replace(/^(http:\/\/)|(https:\/\/)/i,'')
	})
}

const viewurl = ($cnt,k) => {
	inview($cnt,()=>{
		
	})
}
showurl:function(k){
                $.each(k, function(i, item) {
                    new Image().src = item.replace("http:", "");
                });
            },
            viewurl:function($dom,k){
                var self = this ;
                self.inview($dom,function(){
                    self.showurl(k);
                }) 
            },
            clickurl:function(urlobj) {
                var self = this ;
                var clktkurlArry = $.extend(true,[],urlobj.clktk);
                $.each(clktkurlArry, function(i,item) {
                    $('body').append('<iframe src="' + self.replace360url(item,urlobj) + '" style="display: none;"></iframe>');
                });
            },

export default {
	'xcp':'hahah'
}