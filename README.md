### 开始

#### 开启自动打包
>适合代理调试或开发
```
npm run debug
```

#### 打包生产代码
>用于发布上线
```
npm run build
```

### 目录结构

```
|--dist     打包代码目录
|--scripts  打包相关配置
|--src      开发代码目录
    |--base     基础代码
    |--pages    页面目录
        |--home         首页
        |--live         列表页
        |--search       搜索页
        |--lookat       普通直播间
        |--lookat-audio 音频直播间
        |--lookat-off   关播页
        |--lookat-yz    颜值直播间
    |--public   公共代码
|--config.js    项目配置
```
