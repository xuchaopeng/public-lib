export const getuid = () => {
    return (+new Date() +
        Math.random()
        .toString(10)
        .substring(2, 6)
    )
}

export const qid = String(coo_name).indexOf('=') > -1 ? String(coo_name).split('=')[1] : String(coo_name) ;

export const nowurl = location.href.split('?')[0].split('#')[0];

export const uid = typeof(global_uid) === 'undefined' ? global_uid : (+new Date()+Math.random().toString(10).substring(2, 6)) ;

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