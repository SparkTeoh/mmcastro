// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static', // 明确指定为静态站点生成
  site: 'https://mmcfin.com', // MMC Financial official domain
  integrations: [tailwind({
    applyBaseStyles: false, // 我们使用自定义的全局样式
  })],
  build: {
    assets: '_astro', // 静态资源目录
  },
  // 确保所有页面都被正确生成
  pages: {
    // 可以在这里添加页面配置
  }
});
