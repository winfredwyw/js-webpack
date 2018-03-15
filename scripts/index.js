var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
var env = require('./env.js');

// 正式打包
if (env.isPro) {
    var watching = compiler.run((err, stats) => {
        console.log(stats.toString({
            children: false,
            modules: false,
            chunks: false,  // 使构建过程更静默无输出
            colors: true    // 在控制台展示颜色
          }));
    });
}

// debug模式
if (env.isDebug) {
    var watching = compiler.watch({
        ignored: /node_modules/
    }, (err, stats) => {
        console.log(stats.toString({
            children: false,
            modules: false,
            chunks: false,  // 使构建过程更静默无输出
            colors: true    // 在控制台展示颜色
          }));
    });
}