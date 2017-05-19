var webpackConfig = require('./webpack.config.js');

module.exports = function(config){
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        frameworks: ['mocha'],
        files: ['app/tests/**/*.test.jsx'],
        preprocessors: {
            'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
        }, 
        reporters: ['mocha'],
        client: {
            mocha: {
                timeout: '5000'
            }
        },
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true,
            stats: 'errors-only'
        },
        proxies:{
            '/api/v1/': 'http://localhost:3000/api/v1'
        }
    });
};