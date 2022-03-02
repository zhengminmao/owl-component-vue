import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve' // 开服务
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'
import livereload from 'rollup-plugin-livereload';  // 热重载
import alias from '@rollup/plugin-alias';
import replace from 'rollup-plugin-replace'
import path from 'path'
import image from '@rollup/plugin-image'
import vue from 'rollup-plugin-vue2'
import html from '@rollup/plugin-html'

const resolveDir = dir => path.join(__dirname,dir)

// 自定义html模板
const htmlTemplate = function({title, attributes, publicPath, meta, bundle, files}){
  return  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${meta.map((item) => {
      let props = ''
      for (let key in item){
        props += `${key}="${item[key]}" `
      }
      return `<meta ${props}>`
    })}
    <title>${title}</title>
    ${files.css.map(item=> `<link rel="stylesheet" href="${publicPath+item.fileName}" />`)}
  </head>
  <body>
    <div id="app"></div>
    ${files.js.map(item=> `<script src="${publicPath+item.fileName}" ></script>`)}
  </body>
  </html>
  `
}

export default {
  input: './src/index.js',
  output: [
    {
      file: 'dist/bundle.dev.umd.js',
      format: 'umd',
      name: 'file',
      minify: true,
      sourcemap: true,
    }
  ],
  plugins: [
    
    vue({
      css: true,
      compileTemplate: true,
      include: /\.vue$/,
      target: 'browser'
    }),
    resolve(),
    babel({
      exclude: 'node_modules',
      babelHelpers: 'bundled'
    }),
    postcss({
      minimize: true,
      extract: 'bundle.dev.min.css'
    }),
    alias({
      entries: [
        {find: '@', replacement: resolveDir('src')},
        {find: '@lib', replacement: resolveDir('lib')}
      ],
      'vue': require.resolve('vue/dist/vue.esm.js')
    }),
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    image({
      exclude: 'assets'
    }),
    html({
      fileName: 'index.html',
      title: 'owl-component-vue',
      publicPath: '',
      template: function(options) {
        return htmlTemplate(options)
      }
    }),
    livereload(),
    serve({
      open: true,
      port: 8888,
      contentBase: resolveDir('dist')
    })
  ]
}