export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis', authority: ['admin', 'user'] },
      {
        path: '/dashboard/analysis',
        name: 'dashboard',
        icon: 'dashboard',
        component: './ComingSoon',
      },
      {
        path: '/strategy',
        name: 'strategy',
        icon: 'area-chart',
        routes: [
          {
            path: '/strategy/backtest',
            name: 'list',
            component: './Strategy',
          },
          {
            path: '/strategy/portfolio',
            name: 'portfolio',
            component: './ComingSoon',
          },
          {
            path: '/strategy/editor',
            component: './Strategy/Editor',
          },
        ],
      },
      {
        path: '/trade',
        name: 'trade',
        icon: 'sliders',
        component: './ComingSoon',
      },
      {
        component: '404',
      },
    ],
  },
];
