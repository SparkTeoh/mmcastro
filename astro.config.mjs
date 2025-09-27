// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static', // 明确指定为静态站点生成
  site: 'https://mmcfin.com', // MMC Financial official domain
  integrations: [
    tailwind({
      applyBaseStyles: false, // 我们使用自定义的全局样式
    }),
    sitemap({
      // Enhanced sitemap configuration for SEO and GEO
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Custom function to set priority based on page type
      customPages: [
        'https://mmcfin.com/content', // Content center gets high priority
      ],
      serialize(item) {
        // Set higher priority for content pages
        if (item.url.includes('/content/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Set highest priority for main pages
        if (item.url === 'https://mmcfin.com/' || 
            item.url === 'https://mmcfin.com/services' ||
            item.url === 'https://mmcfin.com/about' ||
            item.url === 'https://mmcfin.com/contact') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        }
        return item;
      }
    })
  ],
  build: {
    assets: '_astro', // 静态资源目录
  },
  // 确保所有页面都被正确生成
  pages: {
    // 可以在这里添加页面配置
  }
});
