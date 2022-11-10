const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


module.exports = merge(baseConfig,{
    mode:'development',                           //开发模式
    devtool:'eval-cheap-module-source-map',       //源码调试模式
    devServer:{
        port:3001,
        compress:false,                           //gzip压缩，开发环境不开启，提升热更新速度
        hot:true,                                 //开启热更新
        historyApiFallback:true,                  //解决histroy路由404
        static:{                                  //托管静态资源public文件夹
            directory:path.join(__dirname,'./public')
        }

    },
    plugins:[
        new ReactRefreshWebpackPlugin()           //热更新插件
    ]
})