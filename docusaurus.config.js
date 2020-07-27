const path = require('path');

module.exports = {
  title: 'Kazaplan Documentation',
  tagline: 'How to integrate Kazaplan on your website',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  favicon: 'img/favicon/favicon.ico',
  organizationName: 'kazaplan',
  projectName: 'Kazaplan',
  plugins: [
    // '@docusaurus/plugin-google-analytics',
    // [
    //   '@docusaurus/plugin-pwa',
    //   {
    //     debug: true,
    //     offlineModeActivationStrategies: ['appInstalled', 'queryString'],
    //     pwaHead: [
    //       {
    //         tagName: 'link',
    //         rel: 'icon',
    //         href: '/img/logo.svg',
    //       },
    //       {
    //         tagName: 'link',
    //         rel: 'manifest',
    //         href: '/manifest.json', // your PWA manifest
    //       },
    //       {
    //         tagName: 'meta',
    //         name: 'theme-color',
    //         content: 'rgb(63, 153, 132)',
    //       },
    //     ],
    //   },
    // ],
  ],
  themeConfig: {
    algolia: {
      apiKey: '36d5c582881ec9289479686369dbd880',
      indexName: 'kazaplan',
    },
    // googleAnalytics: {
    //   trackingID: 'UA-141789564-1'
    // },
    navbar: {
      title: 'Kazaplan',
      logo: {
        alt: 'kazaplan',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          to: "api/",
          activeBasePath: "api",
          label: "API Reference",
          position: "left",
        },
        
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Kazaplan, Inc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'getting_started_introduction',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        // blog: {
        //   showReadingTime: true,
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
