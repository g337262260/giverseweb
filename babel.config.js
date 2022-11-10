const isDEV = process.env.NODE_ENV === 'development' // 是否是开发模式



module.exports = {

    "presets": [
        [
            '@babel/preset-env', //babel 编译的预设,可以转换目前最新的js标准语法
            {
                "useBuiltIns": "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
                "corejs": 3, // 配置使用core-js低版本
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    "plugins": [
        isDEV && require.resolve('react-refresh/babel'), // 如果是开发模式,就启动react热更新插件
        ["@babel/plugin-proposal-decorators", {
            "legacy": true
        }]
    ].filter(Boolean)

}