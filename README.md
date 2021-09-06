# smart-light-pole
## 说明
智慧杆平台主应用，采用乾坤微前端框架(https://qiankun.umijs.org/zh/guide)实施搭建。本应用为主应用。
主应用作为各微应用连接的纽带，为了防止状态蔓延，应不涉及任何业务逻辑，只提供状事件通知、数据缓存等状态管理。

## 安装
```
npm install
```

### 开发
```
npm start
```
或者
```
npm run serve
```

### 打包
```
npm run build
```

### 配置微应用
在``/src/router``下添加如下结构
```
{
    //微应用入口
    entry: "//localhost:8001/",
    //微应用别名
    name: "home",
    //微应用的代码片段插入到主应用哪个位置
    container: "#subAppContainer",
    //主应用激活路由
    activeRule: "/login",
}
```

### 关于公共依赖优化
乾坤框架是一个开箱即用的框架，开放API较少，使用它做公共依赖优化负担较大。比如主应用使用了vue的createApp函数，子应用也使用这个函数，目前还没找到只加载一次的解决方案。

第三方插件可用webpack的`external`属性达到各应用复用的效果，大致做法如下：
(1)下载离线插件，归档到项目资源里
(2)使用`script`标签在`html`上引入
(3)`external`配置该插件

`single-spa`可使用`systemJs`配置公共依赖

#### ElementUI按需引入
如果微应用体量小，并且接受重复加载的负面影响，可尝试配置按需引入ElUI。
安装ElementUI
```
npm install element-plus
```
脚本引入如下：
```
import {
    ElInput,
    ElButton
} from 'element-plus';

export default defineComponent({
    components: {
        ElInput,
        ElButton
    }
});
```
样式引入需配置`babel-plugin-import`插件。
安装
```
npm install babel-plugin-import -D
```
babel配置
```
module.exports = {
  plugins: [
    [
      "import",
      {
        libraryName: 'element-plus',
        // 引入组件
        customName: (name) => {
          name = name.slice(3)
          return `element-plus/lib/components/${name}`
        },
        // 引入样式
        customStyleName: (name) => {
          name = name.slice(3)
          // 如果你需要引入 [name].scss 文件，你需要用下面这行
          // return `element-plus/lib/components/${name}/style`
          // 引入 [name].css
          return `element-plus/lib/components/${name}/style/css`
        },
      },
    ],
  ]
}
```