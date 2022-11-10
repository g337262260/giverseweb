const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar');

const HtmlWebpackPlugin = require('html-webpack-plugin')                       //打包时把css单独抽离出来
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

const config = {
    entry: path.resolve(__dirname, './src/index.tsx'), //入口文件
    output: {
        filename: 'static/js/[name].[chunkhash:8]js', //输出文件名称
        path: path.join(__dirname, './dist'), //输出文件路径
        clean: true, //删除dist
        publicPath: '/' //打包后文件的公共前缀路径
    },
    module: {
        rules: [{
                include: [path.resolve(__dirname, './src')], //只对src文件下的ts,tsx进行loader解析
                test: /.(ts|tsx)$/,
                use: ['thread-loader', 'babel-loader']
            },
            {
                test: /.css$/, //匹配所有的 css 文件
                include: [path.resolve(__dirname, './src')],
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /.less$/, //匹配所有的 less 文件
                include: [path.resolve(__dirname, './src')],
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离less
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename:'static/images/[name].[contenthash:8][ext]' // 加上[contenthash:8]
                },
            },
            {
                test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename:'static/fonts/[name].[contenthash:8][ext]', // 加上[contenthash:8]
                },
            },
            {
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename:'static/media/[name].[contenthash:8][ext]', // 加上[contenthash:8]
                },
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'], //webpack resolve解析配置，引入模块不带后缀时，会依次查找
        alias: {
            '@': path.join(__dirname, './src')
        },
        modules: [path.resolve(__dirname, './node_modules')], // 查找第三方模块只在本项目的node_modules中查找
    },
    plugins: [
        new HtmlWebpackPlugin({ //插件：构建好的静态资源引入到html中 
            template: path.resolve(__dirname, './public/index.html'),
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
        }),
        new WebpackBar({
            color: "#85d",  // 默认green，进度条颜色支持HEX
            basic: false,   // 默认true，启用一个简单的日志报告器
            profile:false,  // 默认false，启用探查器。
          })
    ],
    cache: {
        type: 'filesystem', // 使用文件缓存,改善打包速度
    },
}



module.exports = config
console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)