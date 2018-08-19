export default {
  /**
   * 去掉空格
   * @param {string} str 目标字符串
   * @param {number} pos 可选 0: 去掉所有空格；1：去掉字符串前面空格；2：去掉字符串后面空格；默认：去掉字符串前后空格。
   */
  trim(str, pos) {
    switch (pos) {
      case 0:
        return str.replace(/\s+/g, '');
      case 1:
        return str.replace(/(^\s*)/g, '');
      case 2:
        return str.replace(/(\s*$)/g, '');
      default:
        return str.replace(/(^\s*)|(\s*$)/g, '');
    }
  },
  /**
   * 获取字符串字节数
   * @param  {string} str 目标字符串
   * @return {number}     字节数
   */
  getBytes: function(str) {
    var byteLen = 0,
      len = str.length;
    if (str) {
      for (var i = 0; i < len; i++) {
        if (str.charCodeAt(i) > 255) {
          byteLen += 2;
        } else {
          byteLen++;
        }
      }
      return byteLen;
    } else {
      return 0;
    }
  }
};
