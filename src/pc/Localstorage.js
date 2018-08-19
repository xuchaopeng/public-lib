export default{
	/**
     * [获取指定时间 12:12:30 的时间搓]
     * @param  {obj} nowDate  [當前的日期對象 new Date()]
     * @param  {string} Deadline [當天的失效時間點 '24:00:00']
     * @return {number}          [返回指定時間的 时间搓 ]
     */
    convertTime(Deadline,nowDate=new Date()){
        const _dateArr = Deadline.split(':');
        const hours = parseInt(_dateArr[0]);
        const minutes = parseInt(_dateArr[1]);
        const seconds = parseInt(_dateArr[2]);
        nowDate.setHours(hours)
        nowDate.setMinutes(minutes)
        nowDate.setSeconds(seconds)
        const result = Date.parse(nowDate)
        return result;
    },
    remove(name){
      localStorage && localStorage.removeItem(name);
    },
    /**
     * [设置localstorage,指定当天某个时间点失效,默认当天24:00失效]
     * @param  {string} name [名称]
     * @param  {obj} value [值 {xcp:[],...times:1242432432}]
     * @param  {string} expires  24:00:00
     * @return {undefined}
     */
    set(name,value,expires){
    	const expDate = new Date();
    	const timestamp = this.convertTime('24:00:00');
    	if((expDate.getTime() > Number(value._timestamp)){
    		//过期了
    		localStorage.removeItem(name);
    		localStorage.setItem(name,JSON.stringify(value));
    	}
    	localStorage.setItem(name,JSON.stringify(value));
    }
}