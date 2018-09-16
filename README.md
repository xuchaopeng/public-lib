# public-lib

嵩恒前端PC-共方法库

# 安装&使用

## 自定义编译

```python
git clone http://codeio.dftoutiao.com/xuchaopeng/public-lib.git
cd public-lib && npm install && npm run build
```
如果觉得有些方法基本用不到，可以通过修改/src/(ave|pc)/index.js，import需要的 js 即可。

## 公共方法库使用
```
<!-- html中直接引入 -->
<script src="PCAVE.js"></script>
这种方式引入将会直接暴露PCAVE对象，如果需要更改，可以在webpack.config.js中修改即可。
```
```
// AMD引入
var PCAVE = require('PCAVE');

// ES6 Module引入
import PCAVE from 'PCAVE';
```
```
//百度联盟使用方法，以PCAVE为例:
PCAVE.Abaidu.load({
    id:'lgymcoivhjn',//必传
    type:'bdf', //必传
    position:'xcp_haha',//如果需联盟上报,该参数必传;否则可不传
    cnt:'xcp', //可不传  支持id、$对象
    needlm:false, //设置是否需要联盟统计 默认为true 可不传
    callback:function(){} //可不传
})
```
```
360广告使用方法，以PCAVE为例:
PCAVE.A360.load({
    id:'coDKeS', //必传 广告素材请求id
    cnt:$('.item'), //必传 广告容器，一般传jq对象安全些
    tpl:'sw',   //必传 广告渲染模板
    reqtimes:1, //非必传 页面该广告素材请求次数
    needlm:true, //非必传 指是否需要联盟上报，默认为需要
    position:'xcp_rihgt', //非必传 广告位标识
    callback:function(a){} //非必传
})
备注：
 *. tpl 必传，指广告素材渲染使用的模板类型。
  目前支持常见的几种：th（300*250四图模板）、sw（信息流模板四图、单图、无图、大图模板)、
  bx（文章下方式四图模板）；现有不满足要求，你可以在/src/ave/A360/Tem 中自定义模板。
 *. reqtimes 非必传，指页面该广告素材请求次数。一般信息流需要传 其它默认为1。
 *. position 非必传，指广告位标识。当needlm=true 该参数必传; 当needlm=false 该参数可不传; 当needlm=false且tpl=th该参数必传，作为该容器唯一的key。
 *. impct 非必传。当该参数不设置,它会自动分析容器的长度或者渲染tpl来赋值。
 *. recover 非必传，指360打底广告配置项。
 recover ： {
 	id:'lgymcoivhjn',//必传
    type:'bdf', //必传
    needlm:true //非必传
 }
 *. callback 非必传，回调。回调参数值为360广告素材对象，如果请求不合预期，则回调参数值为null；
  因此需打底广告，除了设置recover，还可以在回调中设置打底广告。
```
```
dsp广告使用方法，以PCAVE为例:

1. 优先注册本页面所有的dsp广告位
PCAVE.Adsp.load({
    site:'ttz',
    page:'ny',
    pcad:'ny_btxf|ny_rmtj_v1|ny_dl|ny_y1|ny_yxxf',
    callback:()=>{}
})
备注：
 *. site 必传，站点。
 *. page 必传，页面类型。
 *. pcad 必传，由页面dsp广告的pcadposition（后台接口设置，广告位唯一标识）组成。

2. 注册之后，通过以下方式来渲染广告
PCAVE.Adsp.use({
    cnt:$('#dl'), //必传，广告位容器
    pcad:'ny_dl',
    tpl:'dl',
    time:10,
    callback:(a)=>{}
})
备注：
 *. pcad 必传，dsp广告标识。用来找到对应的dsp广告位数据
 *. tpl 必传，dsp渲染模板。目前支持常见几种：th（300*250四图模板）、sw（信息流模板四图、单图、无图、大图模板)、dl（对联）、
    xf（悬浮）、bx(文章下方式四图模板);现有不满足要求，你可以在/src/ave/Adsp/Tem 中自定义模板。
 *. time 非必传，dsp检测等待。默认15
 *. recover 非必传，指dsp打底广告配置项。
	recover ： {
	  	avetype:'baidu', //必传 360打底/百度打底  360、baidu
		id:'lgymcoivhjn',//必传 360/baidu的广告对应id
	    type:'bdf', //仅avetype='baidu',该参数才需传 指百度广告类型
	    tpl:'th', //仅avetype='360',该参数才需传
	    impct:4, //仅avetype='360',该参数才需传
	    needlm:true //非必传
	    position:'right_1' //
	}
    其实recover参数配置除了avetype，其它可参照相对应打底广告参数。
 *. callback 非必传，回调。
    回调参数值为dsp广告素材对象，如果请求不合预期，则回调参数值为null；
```
# 项目结构描述

```
├──src
|   ├──ave                     // 广告库文件
|   |  ├──A360                 //360广告
|   |  |    ├──Tem.js          //360广告模板
|   |  |    ├──Tem.less        //360广告模板样式
|   |  |    ├──index.js        //实现主要逻辑
|   |  ├──Abaidu               //百度联盟
|   |  |    ├──Check.js        //检查联盟类型
|   |  |    ├──index.js        //实现主要逻辑
|   |  ├──Adsp                 //dsp广告
|   |  |    ├──Tem.js          //dsp广告模板
|   |  |    ├──Tem.less        //dsp广告模板样式
|   |  |    ├──index.js        //实现主要逻辑
|   |  ├──index.js             //广告库的入口文件
|   ├──pc
|   |  ├──*.js                 //pc公共方法文件
|   |  ├──index.js             //公共方法库的入口文件
├──dist                        //wepack打包后文件
├──.gitignore                  // 忽略的文件的配置文件
├──package.json                // 项目及工具的依赖配置文件
├──postcss.config.js            //css3打包兼容性前缀的配置文件
├──webpack.config.js            //配置
├──README.md                   // 帮助说明
```
# 参与开发

## 派生本仓库

```
git clone http://codeio.dftoutiao.com/DFTTPC/public-lib
cd public-lib
npm install
```
## 打包
```
npm run dev # 开发环境
npm run build # 生产环境
```

## 测试
```
npm run test
```
# 项目说明

该项目用于封装嵩恒PC前端公共业务 js 方法，联盟、360广等广告业务公共库等。

