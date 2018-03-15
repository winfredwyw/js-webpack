var path = require('path'); 
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var MinifyPlugin = require('babel-minify-webpack-plugin');
var config = require('../config.js');
var env = require('./env.js');

var webpackConfig = {
    entry: {
        "test/test": path.resolve(__dirname, '../src/pages/test/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].min.js'
    },
    module: {
        rules: [
            // js
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            // 样式
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => {
                                    precss(),
                                    autoprefixer({
                                        browsers: ['>0%']
                                    })
                                }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }),
                exclude: /node_modules/
            },
            // 图片
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader?limit=24&name=images/[name].[ext]'
                    }
                ],
                exclude: /node_modules/
            },
            // 字体
            {
                test: /\.(woff|svg|eot|ttf|otf)\??.*$/,
                use: [
                    {
                        loader: 'file-loader?name=iconfont/[name].[ext]'
                    }
                ],
                exclude: /node_modules/
            },
            // 多媒体
            {
                test: /\.(mp4|mp3)\??.*$/,
                use: [
                    {
                        loader: 'file-loader?name=iconfont/[name].[ext]'
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    plugins: [
        new ExtractTextPlugin('[name].min.css'),
        new OptimizeCssAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: {
                discardComments: { removeAll: true },
                autoprefixer: { browsers: ['>0%'] }
            }
        })
    ],
    devtool: 'source-map',
    mode: 'none'
};

if (env.isPro) {
    webpackConfig.devtool = '';
    webpackConfig.mode = 'production';
    
    webpackConfig.plugins.push(
        new MinifyPlugin()
    );
}

if (env.isDev) {
    webpackConfig.mode = 'development';
    webpackConfig.devServer =  {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        port: 9000
    };
}

webpackConfig.output.publicPath = (function () {
    if (env.isDev)
        return config.publicPath.dev;

    return config.publicPath.product;
})();

webpackConfig.entry = (function () {
    var ret = {};
    for (var i = 0, j = config.pages.length; i < j; i++) {
        var cur = config.pages[i];

        ret['pages/' + cur + '/app'] = path.resolve(__dirname, '../src/pages/' + cur + '/index.js')
    }

    return ret;
})();

module.exports = webpackConfig;