/**
 * 仅用于360广告的相关业务:
 * 加载360及设置打底广告
 * 360广告本身上报及联盟上报
 * 本库完全依赖于jQuery
 */
import	'./Tem.less';
import * as Tpl from './Tem';
import Lianmeng from '../Common/Lianmeng';
import Abaidu from '../Abaidu/index';

const  param360 = (config) => {
	let url = 'http://show.g.mediav.com/s';
	const param = {
		type: 1,
        of: 4,
        newf: 1,
        uid: typeof(global_uid) === 'undefined' ? getuid() : global_uid,
        reqtimes: config.reqtimes || 1,
        impct:(config.impct || config.cnt.length || 1),
        showid:config.id
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
		if((rect.top > 0 && rect.top < win) || (rect.bottom < win && rect.bottom > 0)){
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

const clickHong = ($cnt,o,callback,$c) =>{
	const urlobj={x:'', y:'',up:'',down:'',curl:o.curl,clktk:o.clktk};
    const $ct = $c || $cnt ;
    $cnt.on('mousedown','a',function(e){
        if(e.which == 3){return;}
        urlobj.down = new Date().getTime();
    });
    $cnt.on('mouseup','a', function (e) {
        if(e.which == 3){return;}
        const $this=$(this);
        urlobj.x=parseInt(e.pageX-$ct.offset().left);
        urlobj.y=parseInt(e.pageY-$ct.offset().top);
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

const loadBaidu = (config,$cnt) => {
    if(config.recover){
        Abaidu.load({
            id:config.recover.id,
            type:config.recover.type,
            position:config.recover.position || config.position,
            cnt:$cnt || config.recover.cnt || config.cnt,
            needlm:config.recover.needlm || config.needlm,
            callback:config.recover.callback || null
        })
    }
}
//素材缓存对象
let moreData = {}
//多个广告素材组成一个广告位 多对一
const moreToone = (config,data) => {
    const tpl = Tpl[config.tpl];
    if(data.length < 4){
        console && console.log('360素材不足');
        loadBaidu(config);return;
    }
    if(config.cnt.length !== 0){
        const tmd = data.slice(0,4);
        config.cnt.append(tpl(tmd));
        config.cnt.find('.isave360-cnt').each(function(i,item){
            //生成联盟上报配置参数
            const lmparam = lMparam(tmd[i], config);
            const idx = i+1 ;
            //360曝光上报
            viewurl($(item), tmd[i].imptk, () => {
                //联盟view上报
                if (idx === 1 && config.needlm !== false) {
                    Lianmeng.report(lmparam, 'view', () => {});
                }
            });
            //360点击、宏替换上报
            clickHong($(item),data[i], () => {
                //联盟click上报
                if (config.needlm !== false) {
                    lmparam.idx = idx;
                    Lianmeng.report(lmparam, 'click', () => {});
                }
            },config.cnt);
            //联盟show上报
            if(idx === 1 && config.needlm !== false){
                Lianmeng.report(lmparam, 'show', () => {});
            }
        });
    }
    config.callback && config.callback(data);
}
//每个广告素材组成一个广告位 一对一
const oneToone = (config, data) => {
    const tpl = Tpl[config.tpl];
    if (config.cnt.length !== 0) {
        config.cnt.each(function(i, item) {
            if (!data[i]) {
                loadBaidu(config,$(item));
                return;
            }
            //上Dom
            $(item).append(tpl(data[i]));
            //生成联盟上报配置参数
            const lmparam = lMparam(data[i], config);
            //360曝光上报
            viewurl($(item), data[i].imptk, () => {
                //联盟view上报
                if (config.needlm !== false) {
                    Lianmeng.report(lmparam, 'view', () => {});
                }
            });
            //360点击、宏替换上报
            clickHong($(item), data[i], () => {
                //联盟click上报
                if (config.needlm !== false) {
                    Lianmeng.report(lmparam, 'click', () => {});
                }
            });
            //联盟show上报
            if (config.needlm !== false) {
                Lianmeng.report(lmparam, 'show', () => {});
            }
        })
    }
    config.callback && config.callback(data);
}

//广告素材请求
const require360 = (config) => {
    //初始化请求参数
	const p = param360(config);
    //选取广告模板
    const tpl = Tpl[config.tpl];
    if(!tpl){console && console.log('tpl模板配置错误');return;}
    //智能赋值广告请求数量
    if((config.tpl === 'th'||config.tpl === 'bx') && !config.impct){p.param.impct = 4;}
    //发出素材请求
    $.ajax({
        type: 'GET',
        url: p.url,
        data: p.param,
        dataType: 'jsonp',
        jsonp: 'jsonp',
        timeout: 2500,
        success: function(res) {
            var data = res.ads || [];
            //多对一
            if(config.tpl === 'th' || config.tpl === 'bx'){
                if(!moreData[config.position]){
                    moreData[config.position] = {count:1,data:[]};
                }
                moreData[config.position].count += 1;
                moreData[config.position].data = moreData[config.position].data.concat(data);
                if( moreData[config.position].count <= 3 && moreData[config.position].data.length < 4){
                    config.reqtimes = moreData[config.position].count;
                    require360(config);return;
                }
                moreToone(config,moreData[config.position].data);return;
            }
            //一对一
            oneToone(config,data);
        },
        error: function() {
            console && console.log('360超时');
            config.callback && config.callback(null);
            loadBaidu(config);
        }
    });
}

export default {
	load : require360
}