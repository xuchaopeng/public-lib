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
```python
<!-- html中直接引入 -->
<script src="PC.js"></script>
```
```python
// AMD引入
var PC = require('PC');

// ES6 Module引入
import PC from 'PC';

// 使用方法
PC.Url.getUrlNoParams();
```
# 项目结构描述

```
├──src
│   ├── ave                     // 广告库文件
|   |   |——A360                 //360广告
|   |   |——Abaidu               //百度联盟
|   |   |——index.js             //广告库的入口文件
|   |—— pc
|   |   |——*.js                 //pc公共方法文件
|   |   |——index.js             //公共方法库的入口文件
├── dist                        //wepack打包后文件 
├── .gitignore                  // 忽略的文件的配置文件
├── package.json                // 项目及工具的依赖配置文件
|——postcss.config.js            //css3打包兼容性前缀的配置文件
|——webpack.config.js            //配置
├── README.md                   // 帮助说明
```

# 参与开发

## 派生本仓库

```python
git clone http://codeio.dftoutiao.com/xuchaopeng/public-lib.git
cd public-lib
npm install
```
## 打包
```python
npm run dev # 开发环境
npm run build # 生产环境
```

## 测试
```python
npm run test
```
# 项目说明

该项目用于封装嵩恒PC前端公共业务 js 方法，联盟、360广等广告业务公共库等。

