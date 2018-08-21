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
    /**
     * [del 删除localstorage]
     * @param  {string} key 
     * @return {undefined}  
     */
    del(key){
      localStorage.removeItem(key);
    },
    /**
     * [set 设置localstorage]
     * @param {string} key   
     * @param {json/string} value [标准json对象/字符串]
     * @return {undefined}
     */
    set(key,value){
        const es = typeof value === 'string';
        es  ? localStorage.setItem(key,value)
            : localStorage.setItem(key,JSON.stringify(value));
    },
    /**
     * [get 获取设置localstorage]
     * @param  {string} key [键名]
     * @return {json对象 / string}  [标准json对象/字符串]
     */
    get(key){
        const val = localStorage.getItem(key) ;
        try{
            let value = JSON.parse(val);
            if(value.__timestamp && new Date().getTime() > Number(value.__timestamp)){
                //过期删除
                this.del(key);
                return null;
            }else{
                return value;
            }
        }catch(e){
            return val;
        }
    },
    /**
     * [设置localstorage,指定当天某个时间点失效,默认当天24:00失效 // 与get方法配合使用]
     * @param  {string} key [名称]
     * @param  {json} value {xcp:[],...__timestamp:1242432432}
     * @param  {string} expires  24:00:00
     * @return {undefined}
     */
    setDayTime(key,value,expires='24:00:00'){
    	const expDate = new Date();
    	const timestamp = this.convertTime(expires);
        if(!value.__timestamp){
            //设置指定过期时间搓
            value.__timestamp = timestamp;
            this.set(key,value);
        }else{
            this.set(key,value);
        }
    },
    /**
     * [setExpires 设置localstorage,指定有效时间,默认1天 // 与get方法配合使用]
     * @param {string} key    
     * @param {json} value   
     * @param {number} expires 1/天
     */
    setExpires(key,value,expires=1){
        const nowDate = new Date();
        nowDate.setHours(parseInt(expires*24));
        const __timestamp  = Date.parse(nowDate);
        value.__timestamp = __timestamp;
        this.set(key,value);
    }
}