import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias';
import path from "path";
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace'

const resolveDir = dir => path.join(__dirname,dir)

export default {
  input: './lib/index.js',
  output: [
    {
      file: 'dist/owlui.min.js',
      format: 'umd',
      name: 'file',
      assetFileNames: 'dist/assets'
    }
  ],
  plugins: [
    terser(),
    resolve(),
    babel({
      exclude: 'node_modules',
    }),
    postcss({
      minimize: true,
      extract: 'owlui.min.css'
    }),
    alias({
      entries: [
        {find: '@', replacement: resolveDir('src')}
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    commonjs({
      include: ['node_modules/highlight.js/**', 'node_modules/dayjs/**']
    }),
  ]
}