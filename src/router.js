import Vue from 'vue';
import Router from 'vue-router';
import Desktop from 'components/Page/Desktop';
import Blockchain from 'components/Page/Blockchain';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'desktop',
      title: 'Desktop',
      component: Desktop,
    },
    {
      path: '/blockchain',
      name: 'blockchain',
      title: 'Blockchain',
      component: Blockchain,
    },
  ],
});
