/**
 * 上报统计需用的一些公共参数 及 方法
 * tb :  os 方法依赖于jquery
 */
export const getuid = () => {
    return (+new Date() +
        Math.random()
        .toString(10)
        .substring(2, 6)
    )
}

export const qid = (() => {
  if(typeof(coo_name) === 'undefined'){
    return 'null';
  }else{
    return String(coo_name).indexOf('=') > -1 ? String(coo_name).split('=')[1] : String(coo_name) ;
  }
})();


export const nowurl = location.href.split('?')[0].split('#')[0];

export const uid = typeof(global_uid) !== 'undefined' ? global_uid : (+new Date()+Math.random().toString(10).substring(2, 6)) ;

export const os = (() => {
	let sUserAgent = navigator.userAgent ;
    const isWin = (navigator.platform === 'Win32') || (navigator.platform === 'Windows') ;
    const isMac = (navigator.platform === 'Mac68K') || (navigator.platform === 'MacPPC') || (navigator.platform === 'Macintosh') || (navigator.platform === 'MacIntel') ;
    const bIsIpad = sUserAgent.match(/ipad/i) === 'ipad' ; 
    const bIsIphoneOs = sUserAgent.match(/iphone os/i) === 'iphone os' ;
    const isUnix = (navigator.platform === 'X11') && !isWin && !isMac ;
    const isLinux = (String(navigator.platform).indexOf('Linux') > -1) ; 
    const bIsAndroid = sUserAgent.toLowerCase().match(/android/i) === 'android' ; 
    const bIsCE = sUserAgent.match(/windows ce/i) === 'windows ce' ;
    const bIsWM = sUserAgent.match(/windows mobile/i) === 'windows mobile' ;
    if (isMac) return 'Mac' ;
    if (isUnix) return 'Unix' ;
    if (isLinux) {
      if (bIsAndroid) { return 'Android';} else { return 'Linux';}
    }
    if (bIsCE || bIsWM) { return 'wm';}
    if (isWin) {
      if(sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1) return 'Win2000' ;
      if(sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1) return 'WinXP' ;
      if(sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1) return 'Win2003' ;
      if(sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1) return 'WinVista';
      if(sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1)  return 'Win7' ;
      if(sUserAgent.indexOf('Windows NT 6.2') > -1 || sUserAgent.indexOf('Windows 8') > -1) return 'Win8';
      if(sUserAgent.indexOf('Windows NT 10.0') > -1 || sUserAgent.indexOf('Windows 10') > -1) return 'Win10';	
    }
    return 'other' ;
})();

export const brow = (()=>{
    let brow = $.browser;
    let bInfo = '非主流浏览器';
    if (brow.msie) {bInfo = 'MicrosoftInternetExplorer' + brow.version;}
    if (brow.mozilla) {bInfo = 'MozillaFirefox' + brow.version;}
    if (brow.safari) {bInfo = 'AppleSafari' + brow.version;}
    if (brow.opera) {bInfo = 'Opera' + brow.version;}
    if (brow.chrome) {bInfo = 'chrome' + brow.version;}
    return bInfo;
})();

export const querystring =(name) => {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

export let softtype = 'toutiao';

export const softname = (()=>{
    let sn = 'DFTT';
    const ls = querystring('listSoftName');
    if(ls &&(typeof(otherSoftName) !== 'undefined')){
      sn = otherSoftName + '_'+(ls === 'null' ? 'DFTT' : ls);
    }
    if(typeof InvokeGetPublicInfo === 'function' && InvokeGetPublicInfo()){
      sn = 'hbzx';
      softtype = 'hbzx';
    }
    return sn;
})();

export const newstype = newstype || 'null' ;

export const stringify = (obj) => {
    return obj
      ? Object.keys(obj)
          .map(key => {
            const value = obj[key];
            if (value === undefined) {return '';}
            return encodeURI(key) + '=' + encodeURI(value);
          })
          .filter(x => x.length > 0)
          .join('&')
      : '';
}

export const inview = ($cnt,callback) => {
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

export const getScript = (url, element, callback) => {
  let head = document.getElementsByTagName('head')[0];
  let js = document.createElement('script');
  js.setAttribute('type', 'text/javascript');
  js.setAttribute('src', url);
  element ? element.appendChild(js) : head.appendChild(js);
  //执行回调
  const callbackFn = () => {
    if (typeof(callback) === 'function') {
      callback();
    }
  }
  document.all ?
    js.onreadystatechange = () => {
      if (js.readyState === 'loaded' || js.readyState === 'complete') {
        callbackFn()
      }
    } :
    js.onload = () => {
      callbackFn();
    }
}