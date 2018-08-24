/**
 * 仅用于360广告的相关业务:
 * 加载360及设置打底广告
 * 360广告本身上报及联盟上报
 * 本库完全依赖于jQuery
 */
import	'./Tem.less';
import * as Tem from './Tem';
import LianMeng from '../Common/Lianmeng';

const  param360 = (showid,impct=1) => {
	let url = 'http://show.g.mediav.com/s';
	const param = {
		type: 1,
        of: 4,
        newf: 1,
        uid: typeof(global_uid) === 'undefined' ? getuid() : global_uid,
        reqtimes: 1,
        impct,
        showid
	}
	if(location.protocol == 'https:'){
		url = 'https://show-g.mediav.com/s';param.scheme = 'https';
	}
    return {param : param,url:url}
}

const inview = ($cnt,callback) => {
	const lock = false;
	const isview = () => {
		if($cnt.length === 0)return;
		let win = $(window).height();
		let rect = $cnt[0].getBoundingClientRect();
		if(rect.top > 0 && rect.top < win){
            callback && callback();
			$(document).unbind('scroll',isview);
		}
	}
	$(document).on('scroll',isview);
	isview();
}

const showurl = (k) => {
	$.each(k,(i,item)=>{
		new Image().src = item.replace(/^(http:)|(https:)/gi,'')
	})
}

const viewurl = ($cnt,k,callback) => {
	inview($cnt,()=>{
		showurl(k);
		typeof(callback) === 'function' && callback();
	})
}

const getuid = () => {
    return (+new Date() +
        Math.random()
        .toString(10)
        .substring(2, 6)
    )
}

const replace360url = (item, o) => {
    return item.replace('__EVENT_TIME_START__', o.down)
        .replace('__EVENT_TIME_END__', o.up)
        .replace('__OFFSET_X__', o.x)
        .replace('__OFFSET_Y__', o.y);
}

const clickurl  = (urlobj) => {
	const clktkurlArry = $.extend(true,[],urlobj.clktk);
	$.each(clktkurlArry,(i,item)=>{
		$('body').append('<iframe src="' + replace360url(item,urlobj) + '" style="display: none;"></iframe>');
	})
}

const clickHong = ($cnt,o,callback) =>{
	const urlobj={x:'', y:'',up:'',down:'',curl:o.curl,clktk:o.clktk};
    $cnt.on('mousedown','a',function(e){
        if(e.which == 3){return;}
        urlobj.down = new Date().getTime();
    });
    $cnt.on('mouseup', 'a', function (e) {
        if(e.which == 3){return;}
        const $this=$(this);
        urlobj.x=parseInt(e.pageX-$cnt.offset().left);
        urlobj.y=parseInt(e.pageY-$cnt.offset().top);
        urlobj.up = new Date().getTime();
        $this.attr('href',replace360url(urlobj.curl,urlobj));
        if (o.clktk) clickurl(urlobj);
        callback && callback();
    });
}

const lMparam = (me,config) => {
    return {
        position:config.position,
        id:config.id,
        union:'360',
        type:(me.type == 3 ? 'big' : me.type == 2 ? 'four' : 'one'), 
        title:me.title,
        url:me.curl
    }
}

const require360 = (config) => {
	const p = param360(config.id,config.cnt.length);
    $.ajax({
        type: 'GET',
        url: p.url,
        data: p.param,
        dataType: 'jsonp',
        jsonp: 'jsonp',
        timeout: 2500,
        success: function(res) {
            var data = res.ads || [];
            if(config.tpl === 'template1' && config.cnt.length !== 0){
            	config.cnt.each(function(i,item){
            		if(!data[i])return;
            		//上Dom
            		$(item).append(Tem.template1(data[i]));
                    //生成联盟上报配置参数
                    const lmparam = lMparam(data[i],config);
            		//360曝光上报
            		viewurl($(item),data[i].imptk,()=>{
            			//联盟view上报
                        if(config.needlm !== false){
                            LianMeng.report(lmparam,'view',()=>{});
                        }
            		});
            		//360点击、宏替换上报
            		clickHong($(item),data[i],()=>{
                        //联盟click上报
                        if(config.needlm !== false){
                            LianMeng.report(lmparam,'click',()=>{});
                        }
                    });
                    //联盟show上报
                    if(config.needlm !== false){
                        LianMeng.report(lmparam,'show',()=>{});
                    }
            	})
            }
            config.callback && config.callback(data);
        },
        error: function() {
            console && console.log('360超时')
        }
    });
}

export default {
	load : require360
}