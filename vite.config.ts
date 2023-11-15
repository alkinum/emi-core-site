import { fileURLToPath, URL } from 'node:url';

import { AnyUIResolver } from '@any-design/anyui/lib/src/resolver';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import gfont from 'vite-plugin-gfont';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [
        AnyUIResolver({
          styleType: 'scss',
        }),
      ],
    }),
    Components({
      resolvers: [
        AnyUIResolver({
          styleType: 'scss',
        }),
        IconsResolver(),
      ],
    }),
    gfont({
      fonts: [
        {
          family: 'Quicksand',
          styles: [400, 500, 600, 700],
        },
      ],
      display: 'swap',
      persistCSS: true,
    }),
    Icons({ autoInstall: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
