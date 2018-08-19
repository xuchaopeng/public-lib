export default {
  /**
   * 动态加载js文件
   * @param  {string}   url      js文件的url地址
   * @param  {Function} callback 加载完成后的回调函数
   */
  getScript(url, callback, element) {
    var head = document.getElementsByTagName('head')[0],
      js = document.createElement('script');

    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);
    if (element) {
      element.appendChild(js);
    } else {
      head.appendChild(js);
    }
    //执行回调
    var callbackFn = function() {
      if (typeof callback === 'function') {
        callback();
      }
    };

    if (document.all) {
      // IE
      js.onreadystatechange = function() {
        if (js.readyState === 'loaded' || js.readyState === 'complete') {
          callbackFn();
        }
      };
    } else {
      js.onload = function() {
        callbackFn();
      };
    }
  },
  /**
   * 动态创建广告代码
   * @param  {string}   scriptCode     脚本代码
   * @param  {Function} callback   回调
   * @param  {DOM}   element  js代码父级标签
   * @return {undefined}
   */
  createScript(scriptCode, callback, element) {
    if (scriptCode) {
      var head = document.getElementsByTagName('head')[0],
        js = document.createElement('script');
      js.setAttribute('type', 'text/javascript');
      js.innerHTML = scriptCode;
      if (element) {
        element.appendChild(js);
      } else {
        head.appendChild(js);
      }
      //执行回调
      callback();
    }
  },
  /**
   * 动态加载css
   * @param  {String} style css代码
   * @param {Function} callback css代码加载成功后的回调函数
   * @param {DOM} element DOM节点
   */
  createStyle(style, callback, element) {
    if (style) {
      var head = document.getElementsByTagName('head')[0],
        css = document.createElement('style');
      css.innerHTML = style;
      if (element) {
        element.appendChild(css);
      } else {
        head.appendChild(css);
      }
      //执行回调
      callback && callback();
    }
  },
  /**
   * 过滤html标签
   * @param  {String} str 源字符串
   * @return {String}     过滤之后的字符串
   */
  filterHtmlTags(str) {
    if (!str || typeof str !== 'string') {
      return '';
    }
    return str.replace(/<\/?[^>]*>/g, '');
  },
  /**
   * 获取滚动高度
   * @return {[type]} [description]
   */
  getScrollTop() {
    var scrollTop = 0,
      bodyScrollTop = 0,
      documentScrollTop = 0;
    try {
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
    } catch (e) {
      console.error(e);
    }
    scrollTop =
      bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  }
};
