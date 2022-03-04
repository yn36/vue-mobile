const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const monent = require('moment')
const hash = monent().format('YYYYMMDDHHmmss') + '.' + new Date().getTime();

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/assets/less/var.less'), // 需要全局导入的less
      ],
    })
}

// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/mobile' : '',
  outputDir: 'mobile',
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463

   */
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    output: {
      filename: `[name].${hash}.js`,
      chunkFilename: `[name].${hash}.js`
    },
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' }
        }
      ]
    }
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    /* svgRule.oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    */
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 直接覆盖变量
          // 'blue': '#f00',
          // 'text-color': '#111',
          // 'border-color': '#eee',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${path.resolve(__dirname, 'src/assets/less/var.less')}";`
        },
      },
      // postcss: {
      //   plugins: [
      //     require("postcss-pxtorem")({
      //       rootValue: 75,                     // 换算的基数,数值具体看你的设计稿 另外提醒下vant-UI的官方根字体大小是37.5
      //       // selectorBlackList: [".van"],      // 忽略转换正则匹配项
      //       propList: ["*"]
      //     })
      //   ]
      // }
    }
  },

  devServer: {
    port: 8000,
    host: '0.0.0.0',
    proxy: {
      "/login": {
        target: "http://130.120.3.253",
        ws: false,
        changeOrigin: true
      },
      '/': {
        target: "http://130.120.3.253",
        ws: false,
        changeOrigin: true,
        bypass: function (req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.')
            return '/index.html'
          }
        }
      }
    }
  },

  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}