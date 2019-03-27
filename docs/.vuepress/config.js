module.exports = {
  title: 'Sphinx Quant',
  description: 'Sphinx Quant',
  themeConfig: {
    repo: 'sphinx-quant/sphinx-quant',
    repoLabel: '查看源码',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '帮助我们改善此页面！',
    lastUpdated: 'Last Updated',
    nav: [
      { text: '首页', link: '/' },
    ],
    sidebar: [
      {
        title: '首页',
        path: '/',
        collapsable: false,
      },
      {
        title: '安装指南',
        collapsable: false,
        children: [
          {
            title: 'Windows',
            path: '/guide/windows/',
            collapsable: false,
          },
          {
            title: 'Linux',
            path: '/guide/linux/',
            collapsable: false,
          },
          {
            title: 'Mac OS',
            path: '/guide/macos/',
            collapsable: false,
          },
          {
            title: 'Docker',
            path: '/guide/docker/',
            collapsable: false,
          },
        ]
      },
      {
        title: '策略回测',
        collapsable: false,
        children: [
          {
            title: '单一策略',
            path: '/backtest/backtest/',
            collapsable: false,
          },
          {
            title: '组合策略',
            path: '/backtest/portfolio/',
            collapsable: false,
          },
        ]
      },
      {
        title: '交易管理',
        collapsable: false,
        children: [
          {
            title: '模拟交易',
            path: '/trade/trade/',
            collapsable: false,
          },
          {
            title: '实盘交易',
            path: '/trade/realtrade/',
            collapsable: false,
          },
        ]
      },
    ]
  },
};
