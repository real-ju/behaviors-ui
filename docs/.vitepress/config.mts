import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'BehaviorsUI',
  description: 'BehaviorsUI文档',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/introduce' }
    ],

    sidebar: [
      {
        text: '起步',
        items: [
          { text: '介绍', link: '/introduce' },
          { text: '安装', link: '/install' },
          { text: '注意事项', link: '/note' }
        ]
      },
      {
        text: '组件',
        items: [
          { text: 'Icon 图标', link: '/components/icon' },
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'ViewLoading 视图加载中', link: '/components/view-loading' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/real-ju/behaviors-ui' }]
  }
});
