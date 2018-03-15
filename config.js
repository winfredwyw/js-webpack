module.exports = {
    // js/css内部引用资源路径
    publicPath: {
        dev: './dist',
        product: 'http://www.xxx.com/dist/'
    },
    // 页面配置
    pages: [
        'home', 'live', 'search', 'lookat',
        'lookat-audio', 'lookat-off', 'lookat-yz',
        'test'
    ]
};
