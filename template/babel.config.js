module.exports = {
  presets: [
    '@vue/app',
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry'
      }
    ]
  ]
  // if your use import on Demand, Use this code
  ,
  plugins: [
    // [ 'import', {
    //   'libraryName': 'vant',
    //   'libraryDirectory': 'es',
    //   // 'style': true // `style: true` 会加载 less 文件
    // } ]
  ]
}
