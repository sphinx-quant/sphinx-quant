export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
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
            path: '/strategy/list',
            name: 'list',
            component: './Strategy',
          },
          {
            path: '/strategy/portfolio',
            name: 'portfolio',
            component: './ComingSoon',
          },
          {
            path: '/strategy/list/editor/:strategyID?',
            component: './Strategy/Editor',
          },
          {
            path: '/strategy/list/backtest/list/:strategyID',
            component: './Strategy/BacktestList',
          },
          {
            path: '/strategy/list/backtest/detail/:backtestID',
            component: './Strategy/BacktestDetail',
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
        path: '/workers/list',
        name: 'workers',
        icon: 'cluster',
        component: './Workers',
      },
      {
        path: '/workers/list/terminal',
        component: './Workers/Terminal',
      },
      {
        component: '404',
      },
    ],
  },
];
