```
.babelrc                  babel配置
.eslingtignore            js校验忽略配置
.eslingrc.js              js校验规则
stylelintrc.config.js     css校验规则
.gitlab-ci.yml_bak        gitlab ci 配置（备用）
index.html                页面模板
build                          构建文件夹
    |-build.js                 构建文件执行入口
    |-check-versions.js        版本检查
    |-config.js                总配置文件
    |-dev-client.js            开发客户端配置
    |-dev-server.js            开发服务配置
    |-stylelintrc.config.js    css校验规则
    |-webpack.base.conf.js     webpack通用配置
    |-webpack.prod.conf.js     webpack构建配置
    |-webpack.dev.conf.js      webpack开发配置
src               源目录
    |—assets      资源文件
    |    |-css                 样式文件夹
    |    |   |-fonts           iconfont资源
    |    |   |-common.less     通用样式
    |    |   |-demo.less       测试样式
    |    |   |-font.css        iconfont引用
    |    |   |-mixin.less      函数方法定义
    |    |   |-reset.css       reset style
    |    |   |-varable.less    全局样式变量定义
    |    |-imgs    图片文件夹
    |    |-js               js文件夹
    |    |   |-test.js      测试js
    |
    |-components          通用组件文件夹
    |    |-config.js      mint-ui组件引用列表
    |    |-LevelSelect    多级选择组件
    |
    |-pages                页面文件夹
    |    |-demo            demo功能模块
    |    |   |-Demo.vue    页面组件
    |
    |-plugins        vue通用插件文件夹
    |    |-SEO.js    seo设置插件
    |    |
    |-router            路由配置
    |    |-router.js    路由配置总入口
    |    |
    |-vuex       vuex接入预留文件夹
    |-App.vue    页面组件入口
    |-main.js    页面入口文件
static        静态资源文件夹
    |-mock    模拟数据文件夹
```
