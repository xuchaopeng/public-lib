export default {
  /**
   * 生成唯一id（当前时间戳13位+4位数随机数）
   * @returns {string} 17位数字组成的字符串
   */
  getUid: function() {
    return (
      +new Date() +
      Math.random()
        .toString(10)
        .substring(2, 6)
    );
  },
  /**
   * 获取随机数
   * @param  {number} min 随机数下限
   * @param  {number} max 随机数上限
   * @returns 大于等于min且小于max的数
   */
  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  isNumber: function(s) {
    return !isNaN(s);
  },
  isString: function(s) {
    return typeof s === 'string';
  },
  isBoolean: function(s) {
    return typeof s === 'boolean';
  },
  isFunction: function(s) {
    return typeof s === 'function';
  },
  isNull: function(s) {
    return s === null;
  },
  isUndefined: function(s) {
    return typeof s === 'undefined';
  },
  isEmpty: function(s) {
    return /^\s*$/.test(s);
  },
  isArray: function(s) {
    return s instanceof Array;
  }
};
