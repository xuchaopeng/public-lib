# public-lib

嵩恒前端PC-共方法库

# 安装&使用

> * 自定义编译

```python
git clone http://codeio.dftoutiao.com/xuchaopeng/public-lib.git
cd common_lib && npm install && npm run build
```
如果觉得有些方法基本用不到，可以通过修改/src/(ave|pc)/index.js，import需要的 js 即可。

> * 公共方法库使用

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
# 参与开发

> * 派生本仓库，提合并请求。

```python
git clone http://codeio.dftoutiao.com/xuchaopeng/public-lib.git
cd public-lib
npm install
```

> * 打包

```python
npm run dev # 开发环境
npm run build # 生产环境
```

> * 测试

```python
npm run test
```

# 项目说明

该项目用于封装嵩恒PC前端公共业务js方法、百度联盟、360等广告业务公共库等。
