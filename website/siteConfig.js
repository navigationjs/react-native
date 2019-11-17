/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const siteConfig = {
  title: 'React Native Animated Navigation',
  tagline: 'Simple and well-tested navigation',
  url: 'https://ivanzotov.github.io',
  baseUrl: '/react-native-animated-navigation/',
  projectName: 'react-native-animated-navigation',
  organizationName: 'ivanzotov',
  headerLinks: [
    {doc: 'installation', label: 'Docs'},
    {doc: 'navigation', label: 'API'},
    {href: 'https://github.com/ivanzotov/react-native-animated-navigation', label: 'Github'},
  ],

  headerIcon: 'img/favicon.ico',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',

  colors: {
    primaryColor: 'black',
    secondaryColor: 'gray',
  },

  copyright: `Copyright © ${new Date().getFullYear()} Ivan Zotov and contributors`,

  highlight: {
    theme: 'default',
  },

  onPageNav: 'separate',
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',
};

module.exports = siteConfig;
