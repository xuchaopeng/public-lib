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
//使用方法
以PCAVE为例:

1、百度联盟
PCAVE.Abaidu.load({
    id:'lgymcoivhjn',//必传
    type:'bdf', //必传
    position:'xcp_haha',//如果需联盟上报,该参数必传;否则可不传
    cnt:'xcp', //可不传  支持id、$对象
    needlm:false, //设置是否需要联盟统计 默认为true 可不传
    callback:function(){} //可不传
})

2、360广告
PCAVE.A360.load({
    id:'coDKeS', //广告素材请求id
    cnt:$('.item'), //广告容器 -- 一般传jq对象安全些
    tpl:'sw',   //广告渲染模板 -- th:300*250四图模板;sw:信息流模板(四图、单图、无图、大图模板)
    reqtimes:1, //页面该广告素材请求次数 -- 一般信息流需传 其它默认为1
    needlm:true, //是否需要联盟上报
    impct:2, //一次请求广告期望返回素材的数量 -- 该参数可不传，当该参数不设置,它会自动分析容器的长度/渲染tpl来赋值
    position:'xcp_rihgt' //广告位标识 -- 1、当needlm=true 该参数必传; 2、当needlm=false 该参数可不传; 3、当needlm=false且tpl=th 该参数必传，作为该容器唯一的key;
})

3、dsp广告

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

