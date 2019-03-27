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
          path: '/install/',
          collapsable: false,
        },
      ]
    },
  };
  