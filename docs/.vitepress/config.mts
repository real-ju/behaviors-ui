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
          { text: 'ViewLoading 视图加载中', link: '/components/view-loading' },
          { text: 'AppPage 页面', link: '/components/app-page' },
          { text: 'Radio 单选器', link: '/components/radio' },
          { text: 'Checkbox 多选器', link: '/components/checkbox' },
          { text: 'Popup 弹出层', link: '/components/popup' },
          { text: 'DataPopup 数据操作器', link: '/components/data-popup' },
          { text: 'Form 表单', link: '/components/form' },
          { text: 'GestureView 手势视图', link: '/components/gesture-view' },
          { text: 'Image 图片', link: '/components/image' },
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'SelectView 内嵌选择器', link: '/components/select-view' },
          { text: 'PickerView 内嵌选择器', link: '/components/picker-view' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'Picker 选择器', link: '/components/picker' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/real-ju/behaviors-ui' }]
  }
});
