import {
  getBabelInputPlugin,
  getBabelOutputPlugin,
} from "@rollup/plugin-babel";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

const plugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  filesize(),
  getBabelInputPlugin({
    babelHelpers: "bundled",
  }),
  getBabelOutputPlugin({
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
        },
      ],
    ],
    compact: true,
  }),
];

export default [
  {
    input: 'src/index.js',
    output: {
      file: "dist/gradient-path_2.4.0.js",
      format: "es",
      inlineDynamicImports: true,
    },
    plugins,
    moduleContext: (id) => {
      const thisAsWindowForModules = [
        "node_modules/@formatjs/intl-utils/lib/src/diff.js",
        "node_modules/@formatjs/intl-utils/lib/src/resolve-locale.js",
      ];
      if (thisAsWindowForModules.some((id_) => id.trimRight().endsWith(id_))) {
        return "window";
      }
    },
  },
];
