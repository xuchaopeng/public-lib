export default {
  /**
   * 设置cookie
   * @param name 名称
   * @param value 值
   * @param expires 有效时间（单位：小时）（可选） 默认：24h
   */
  set(name, value, expires) {
    const expTimes = expires
      ? Number(expires) * 60 * 60 * 1000
      : 24 * 60 * 60 * 1000; // 毫秒
    const expDate = new Date();
    expDate.setTime(expDate.getTime() + expTimes);
    const expString = '; expires=' + expDate.toUTCString();
    const pathString = '; path=/';
    document.cookie = name + '=' + encodeURI(value) + expString + pathString;
  },
  /**
   * 读cookie
   * @param name
   */
  get(name) {
    const cookieStr = '; ' + document.cookie + '; ';
    const index = cookieStr.indexOf('; ' + name + '=');
    if (index !== -1) {
      let s = cookieStr.substring(index + name.length + 3, cookieStr.length);
      return decodeURI(s.substring(0, s.indexOf('; ')));
    } else {
      return null;
    }
  },
  /**
   * 删除cookie
   * @param name
   */
  del(name) {
    const exp = new Date(new Date().getTime() - 1);
    const s = this.get(name);
    if (s !== null) {
      document.cookie =
        name + '=' + s + '; expires=' + exp.toUTCString() + '; path=/';
    }
  }
};
