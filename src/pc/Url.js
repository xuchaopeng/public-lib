export default {
  /**
   * 特定字符串转换成object对象
   * @param {string} str 目标字符串
   * @example
      a=Hello&b=lizhigao&c=0&d=123&e=null
      =>
      {
        a: 'Hello',
        b: 'lizhigao',
        c: 0,
        d: 123,
        e: null
      }
   */
  parse(str) {
    if (str === undefined || str === '') {
      return {};
    }
    let obj = {};
    let arr = str.split('&');
    arr.map(value => {
      obj[value.split('=')[0]] = value.split('=')[1] || '';
    });
    return obj;
  },
  parseQueryString() {
    const str = location.search.length ? location.search.slice(1) : '';
    // const str = 'qid=null&idx=1&recommendtype=-1&ishot=1&fr=toutiao&pgnum=1';
    return this.parse(str);
  },
  /**
   * 将obj对象转换成“&”符号连接的字符串
   * @param {object} obj json对象（暂时只支持基本类型不支持嵌套对象和数组）
   * @example
   *  {
        a: 'Hello',
        b: 'lizhigao',
        c: 0,
        d: 123,
        e: null
      }
      =>
      a=Hello&b=lizhigao&c=0&d=123&e=null
   *
   */
  stringify(obj) {
    return obj
      ? Object.keys(obj)
          .map(key => {
            const value = obj[key];
            if (value === undefined) {
              return '';
            }
            return encodeURI(key) + '=' + encodeURI(value);
          })
          .filter(x => x.length > 0)
          .join('&')
      : '';
  },
  /**
   * 获取url中参数的值
   * @param  {string} name 参数名
   * @return {string}      参数值，默认返回空字符串''
   */
  getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return '';
  },
  /**
   * 获取页面来源(referer)
   * @link http://www.au92.com/archives/javascript-get-referer.html
   */
  getReferrer() {
    let referrer = '';
    try {
      referrer = window.top.document.referrer;
    } catch (e) {
      if (window.parent) {
        try {
          referrer = window.parent.document.referrer;
        } catch (e2) {
          referrer = '';
        }
      }
    }
    if (referrer === '') {
      referrer = document.referrer;
    }
    return referrer;
  },
  /**
   * 获取url（排除url中参数）
   */
  getUrlNoParams() {
    let locaUrl = window.location.href,
      endIndex = 0;
    if (locaUrl.indexOf('?') >= 0) {
      endIndex = locaUrl.indexOf('?');
      return locaUrl.substring(0, endIndex);
    }
    if (locaUrl.indexOf('#') >= 0) {
      endIndex = locaUrl.indexOf('#');
      return locaUrl.substring(0, endIndex);
    }
    return locaUrl;
  }
};
