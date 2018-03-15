var env = process.env.NODE_ENV;

module.exports = {
    isDev: !!(env === 'dev'),
    isDebug: !!(env === 'debug'),
    isPro: !!(env === 'production')
};

console.log('env:', env);