export default {
  /**
   * 字符串转换成时间戳（毫秒）
   * @param  {string} str 时间字符串（格式：yyyy-MM-dd HH:mm 或 yyyy/MM/dd HH:mm）
   * 注意：iphone不支持（格式：2016-02-26 09:12）需要转换成：（格式：2016/02/26 09:12）
   * @return {number}     [description]
   */
  strToTimestamp: function(str) {
    return Date.parse(str.replace(/-/g, '/'));
  },
  strToDate: function(str) {
    return new Date(str.replace(/-/g, '/'));
  },
  /**
   * 时间戳转换为字符串
   * @param  {[type]} t 时间戳
   * @param  {[type]} splitStr 分隔符
   * @return {[type]}   [description]
   */
  timestampToDateStr: function(t, splitStr) {
    return this.dateToString(this.timestampToDate(t), splitStr);
  },

  /**
   * 时间戳转日期时间
   * @param  {[type]} t 时间戳
   * @return {[type]}   日期时间
   */
  timestampToDate: function(t) {
    return new Date(t);
  },

  /**
   * 日期转字符串（默认不带年份）
   * @param  {[type]} d           日期时间
   * @param  {[type]} splitStr 分隔符
   * @return {[type]}             默认返回 MM-dd HH:mm
   */
  dateToString(d, splitStr, withYear = false) {
    var year = d.getFullYear().toString(),
      month = (d.getMonth() + 1).toString(),
      day = d.getDate().toString(),
      h = d.getHours().toString(),
      m = d.getMinutes().toString();
    month = month.length > 1 ? month : '0' + month;
    day = day.length > 1 ? day : '0' + day;
    h = h.length > 1 ? h : '0' + h;
    m = m.length > 1 ? m : '0' + m;
    var str =
      (withYear ? year + '-' : '') + month + '-' + day + ' ' + h + ':' + m; // MM-dd HH:mm
    if (splitStr) {
      str = str.replace(/-/g, splitStr);
    }
    return str;
  },

  /**
   * 日期转字符串(带年份)
   * @param  {Date} d           日期时间
   * @param  {string} splitStr 分隔符
   * @return {string}             默认返回 yyyy-MM-dd HH:mm
   */
  dateToStringWithYear: function(d, splitStr) {
    return this.dateToString(d, splitStr, true);
  },
  /**
   * 计算指定时间与当前时间的时间差 并转换成相应格式字符串
   * 如：xx分钟前，xx小时前，昨天 HH:mm，前天 HH:mm，MM-dd HH:mm
   * @param  {string} str 时间字符串（格式：2016-02-26 09:12）
   * @return {string}
   */
  getSpecialTimeStr: function(str) {
    const targetDate = this.strToDate(str);
    const targetTime = targetDate.getTime();
    const targetGetDate = targetDate.getDate();
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const currentGetDate = currentDate.getDate();
    if (!targetTime) {
      return false;
    }

    const tdoa = Number(currentTime - targetTime),
      dayTime = 24 * 60 * 60 * 1000, // 1天
      hourTime = 60 * 60 * 1000, // 1小时
      minuteTime = 60 * 1000; // 1分钟

    // 天
    const h = tdoa / dayTime;
    if (h < 2) {
      if (currentGetDate - targetGetDate === 1) {
        return '昨天';
      } else if (currentGetDate - targetGetDate === 2) {
        return '前天';
      } else if (currentGetDate - targetGetDate === 0) {
        if (tdoa >= hourTime) {
          // 小时
          return Math.floor(tdoa / hourTime) + '小时前';
        } else if (tdoa >= minuteTime) {
          return Math.floor(tdoa / minuteTime) + '分钟前';
        } else {
          return '最新';
          // return Math.floor(tdoa / 1000) + '秒前';
        }
      }
    } else if (h >= 2 && h < 3 && currentGetDate - targetGetDate === 2) {
      return '前天';
    } else {
      return this.dateToString(targetDate);
    }
  },
  /**
   * 秒转成时间字符串
   * @param  {Number}  seconds 秒[必需]
   * @param  {Boolean} hasHour 是否需要区分小时[可选]
   * @return {String}          hasHour[true]: hh:mm:ss；否则[默认]：mm:ss。
   */
  secondsToTimestr(seconds, hasHour = false) {
    var hh, mm, ss;
    // 传入的时间为空或小于0
    if (seconds == null || seconds < 0) {
      return;
    }
    seconds = Math.ceil(seconds);
    // 得到小时
    hh = parseInt(seconds / 3600) | 0;
    seconds = parseInt(seconds) - hh * 3600;
    if (hh < 10) {
      hh = '0' + hh;
    }
    // 得到分
    mm = (seconds / 60) | 0;
    if (parseInt(mm) < 10) {
      mm = '0' + mm;
    }
    // 得到秒
    ss = parseInt(seconds) - mm * 60;
    if (ss < 10) {
      ss = '0' + ss;
    }
    if (hasHour) {
      return hh + ':' + mm + ':' + ss;
    }
    return mm + ':' + ss;
  },
  /**
   * 时间戳转成时间字符串
   * @param  {Number}  seconds 时间戳[必需]
   * @param  {Boolean} hasHour 是否需要区分小时[可选]
   * @return {String}          hasHour[true]: hh:mm:ss；否则[默认]：mm:ss。
   */
  timestampToTimestr: function(ts, hasHour) {
    var seconds = ts ? Number(ts) / 1000 : 0;
    seconds = parseInt(seconds) % (60 * 60 * 24) + 8 * 60 * 60; //北京时间东八区加八个小时
    return this.secondsToTimestr(seconds, hasHour);
  }
};
