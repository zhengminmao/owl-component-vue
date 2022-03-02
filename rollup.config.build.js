import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias';
import path from "path";

const resolveDir = dir => path.join(__dirname,dir)

export default {
  input: './index.js',
  output: [
    {
      file: 'dist/bundle.umd.min.js',
      format: 'umd',
      name: 'file',
      minify: true,
      assetFileNames: 'dist/assets'
    }
  ],
  plugins: [
    resolve(),
    terser(),
    babel({
      exclude: 'node_modules',
      babelHelpers: 'bundled'
    }),
    postcss({
      minimize: true,
      extract: 'bundle.build.min.css'
    }),
    alias({
      entries: [
        {find: '@', replacement: resolveDir('src')}
      ]
    }),
  ]
}