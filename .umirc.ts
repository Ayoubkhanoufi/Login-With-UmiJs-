import { defineConfig } from 'umi';

export default defineConfig({
  locale: { antd: true },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/register', component: '@/pages/register' },
    { path: '/laptops', component: '@/pages/laptops' },
  ],
});
