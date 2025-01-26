/**
 * Copyright (c) 543x, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import path from 'path';
import npm2yarn from '@docusaurus/remark-plugin-npm2yarn';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import configTabs from './src/remark/configTabs';
import RsdoctorPlugin from './src/plugins/rsdoctor/RsdoctorPlugin';

import VersionsArchived from './versionsArchived.json';
import {
  dogfoodingPluginInstances,
  dogfoodingThemeInstances,
  dogfoodingRedirects,
  dogfoodingTransformFrontMatter,
} from './_dogfooding/dogfooding.config';

import ConfigLocalized from './docusaurus.config.localized.json';

import PrismLight from './src/utils/prismLight';
import PrismDark from './src/utils/prismDark';
import type {Config, DocusaurusConfig} from '@docusaurus/types';

import type * as Preset from '@docusaurus/preset-classic';
import type {Options as DocsOptions} from '@docusaurus/plugin-content-docs';
import type {Options as BlogOptions} from '@docusaurus/plugin-content-blog';
import type {Options as PageOptions} from '@docusaurus/plugin-content-pages';
import type {Options as IdealImageOptions} from '@docusaurus/plugin-ideal-image';
import type {Options as ClientRedirectsOptions} from '@docusaurus/plugin-client-redirects';



const ArchivedVersionsDropdownItems = Object.entries(VersionsArchived).splice(
  0,
  5,
);

function isPrerelease(version: string) {
  return (
    version.includes('-') ||
    version.includes('alpha') ||
    version.includes('beta') ||
    version.includes('rc')
  );
}



// This probably only makes sense for the alpha/beta/rc phase, temporary



const crashTest = process.env.DOCUSAURUS_CRASH_TEST === 'true';


const isSlower = process.env.DOCUSAURUS_SLOWER === 'true';
if (isSlower) {
  console.log('🐢 Using slower 中国保安协会 build');
}

const router = process.env
  .DOCUSAURUS_ROUTER as DocusaurusConfig['future']['experimental_router'];

const isDev = process.env.NODE_ENV === 'development';

const isDeployPreview =
  !!process.env.NETLIFY && process.env.CONTEXT === 'deploy-preview';

// Netlify branch deploy like "docusaurus-v2"
const isBranchDeploy =
  !!process.env.NETLIFY && process.env.CONTEXT === 'branch-deploy';

// Used to debug production build issues faster
const isBuildFast = !!process.env.BUILD_FAST;

const baseUrl = process.env.BASE_URL ?? '/';

// Special deployment for staging locales until they get enough translations
// https://app.netlify.com/sites/docusaurus-i18n-staging
// https://docusaurus-i18n-staging.netlify.app/
const isI18nStaging = process.env.I18N_STAGING === 'true';

const isVersioningDisabled = !!process.env.DISABLE_VERSIONING || isI18nStaging;

/*
const TwitterSvg =
  '<svg style="fill: #1DA1F2; vertical-align: middle; margin-left: 3px;" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>';
*/

const defaultLocale = 'en';
function getLocalizedConfigValue(key: keyof typeof ConfigLocalized) {
  const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? defaultLocale;
  const values = ConfigLocalized[key];
  if (!values) {
    throw new Error(`Localized config key=${key} not found`);
  }
  const value = values[currentLocale] ?? values[defaultLocale];
  if (!value) {
    throw new Error(
      `Localized value for config key=${key} not found for both currentLocale=${currentLocale} or defaultLocale=${defaultLocale}`,
    );
  }
  return value;
}



export default async function createConfigAsync() {
  return {
    title: '中国保安协会',
    tagline: '中国保安协会',
    organizationName: '543x',
    projectName: '中国保安协会',
    baseUrl,
    baseUrlIssueBanner: true,
    url: 'https://www.6n7n.com',


    trailingSlash: isDeployPreview,
    stylesheets: [
      {
        href: '/katex/katex.min.css',
        type: 'text/css',
      },
    ],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
  },
    markdown: {
      format: 'detect',
      mermaid: true,
      mdx1Compat: {
        // comments: false,
      },
      remarkRehypeOptions: {
        footnoteLabel: getLocalizedConfigValue('remarkRehypeOptions_footnotes'),
      },
      parseFrontMatter: async (params) => {
        const result = await params.defaultParseFrontMatter(params);
        return {
          ...result,
          frontMatter: dogfoodingTransformFrontMatter(result.frontMatter),
        };
      },
      preprocessor: ({filePath, fileContent}) => {
        let result = fileContent;

        // This fixes Crowdin bug altering MDX comments on i18n sites...
        // https://github.com/543x/docusaurus/pull/9220
        result = result.replaceAll('{/_', '{/*');
        result = result.replaceAll('_/}', '*/}');

        const showDevLink = false;

        if (isDev && showDevLink) {
          const isPartial = path.basename(filePath).startsWith('_');
          if (!isPartial) {
            // "vscode://file/${projectPath}${filePath}:${line}:${column}",
            // "webstorm://open?file=${projectPath}${filePath}&line=${line}&column=${column}",
            const vscodeLink = `vscode://file/${filePath}`;
            const webstormLink = `webstorm://open?file=${filePath}`;
            const intellijLink = `idea://open?file=${filePath}`;
            result = `${result}\n\n---\n\n**DEV**: open this file in [VSCode](<${vscodeLink}>) | [WebStorm](<${webstormLink}>) | [IntelliJ](<${intellijLink}>)\n`;
          }
        }

        return result;
      },
    },
    onBrokenLinks: 'ignore', 
    onBrokenAnchors: 'ignore', 
    onBrokenMarkdownLinks: 'ignore', 
    favicon: 'img/logobaidu.webp',

    staticDirectories: [
      'static',
      path.join(__dirname, '_dogfooding/_asset-tests'),
      // Adding a non-existent static directory. If user deleted `static`
      // without specifying `staticDirectories: []`, build should still work
      path.join(__dirname, '_dogfooding/non-existent'),
    ],
    themes: ['live-codeblock', ...dogfoodingThemeInstances],
    plugins: [
      RsdoctorPlugin,

      [
        'content-docs',
        {
          id: 'community',
          path: 'community',
          routeBasePath: 'community',
          editUrl:'https://github.com/teabagging/security/edit/main/website', 

          remarkPlugins: [npm2yarn],
          editCurrentVersion: true,
          sidebarPath: './sidebarsCommunity.js',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        } satisfies DocsOptions,
      ],
      [
        'content-docs',
        {
          id: 'google',
          path: 'google',
          routeBasePath: 'google',
          editUrl:'https://github.com/teabagging/security/edit/main/website',

          remarkPlugins: [npm2yarn],
          editCurrentVersion: true,
          sidebarPath: './sidebars.ts',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        } satisfies DocsOptions,
      ],
      [
        'content-docs',
        {
          id: 'learn',
          path: 'learn',
          routeBasePath: 'learn',
          editUrl:'https://github.com/teabagging/security/edit/main/website', 
          remarkPlugins: [npm2yarn],
          editCurrentVersion: true,
          sidebarPath: './sidebars.ts',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        } satisfies DocsOptions,
      ],

      
      [
        'client-redirects',
        {
          fromExtensions: ['html'],
          createRedirects(routePath) {
            // Redirect to /docs from /docs/introduction (now docs root doc)
            if (routePath === '/docs' || routePath === '/docs/') {
              return [`${routePath}/introduction`];
            }
            return [];
          },
          redirects: [
            {
              from: ['/docs/support', '/docs/next/support'],
              to: '/community/support',
            },      

            ...dogfoodingRedirects,
          ],
        } satisfies ClientRedirectsOptions,
      ],
      [
        'ideal-image',

        {
          quality: 70,
          max: 1030,
          min: 640,
          steps: 2,
          // Use false to debug, but it incurs huge perf costs
          disableInDev: true,
        } satisfies IdealImageOptions,
      ],
      [
        'pwa',
        {
          // debug: isDeployPreview,
          offlineModeActivationStrategies: [
            'appInstalled',
            'standalone',
            'queryString',
          ],
          // swRegister: false,
          swCustom: require.resolve('./src/sw.js'), // TODO make it possible to use relative path
          pwaHead: [
            {
              tagName: 'link',
              rel: 'icon',
              href: 'img/logobaidu.webp',
            },
            {
              tagName: 'link',
              rel: 'manifest',
              href: 'manifest.json',
            },
            {
              tagName: 'meta',
              name: 'theme-color',
              content: 'rgb(37, 194, 160)',
            },
            {
              tagName: 'meta',
              name: 'apple-mobile-web-app-capable',
              content: 'yes',
            },
            {
              tagName: 'meta',
              name: 'apple-mobile-web-app-status-bar-style',
              content: '#000',
            },
            {
              tagName: 'link',
              rel: 'apple-touch-icon',
              href: 'img/logobaidu.webp',
            },
            {
              tagName: 'link',
              rel: 'mask-icon',
              href: 'img/logobaidu.webp',
              color: 'rgb(62, 204, 94)',
            },
            {
              tagName: 'meta',
              name: 'msapplication-TileImage',
              content: 'img/logobaidu.webp',
            },
            {
              tagName: 'meta',
              name: 'msapplication-TileColor',
              content: '#000',
            },
          ],
        },
      ],
      '@docusaurus/theme-mermaid',
      './src/plugins/featureRequests/FeatureRequestsPlugin.js',
      ...dogfoodingPluginInstances,
    ],
    presets: [

      [
        'classic',
        {
          debug: true, // force debug plugin usage
          
          blog: {
            // routeBasePath: '/',
            path: 'blog',
            showLastUpdateAuthor: true,
            showLastUpdateTime: true,
            editUrl:'https://github.com/teabagging/security/edit/main/website', 
            remarkPlugins: [npm2yarn],
            postsPerPage: 5,
            feedOptions: {
              type: 'all',
              description:
                'Bible',
              copyright: `Copyright © ${new Date().getFullYear()} Bible, Inc.`,
              xslt: true,
            },
            blogTitle: ' blog',
            blogDescription: 'web and native user interfaces.',
            blogSidebarCount: 'ALL',
            blogSidebarTitle: 'All our posts',
            onUntruncatedBlogPosts:
              process.env.DOCUSAURUS_CURRENT_LOCALE !== defaultLocale
                ? 'warn'
                : 'throw',
            onInlineTags:
              process.env.DOCUSAURUS_CURRENT_LOCALE !== defaultLocale
                ? 'warn'
                : 'throw',
          } satisfies BlogOptions,
          pages: {
            remarkPlugins: [npm2yarn],
            editUrl:'https://github.com/teabagging/security/edit/main/website', 
            showLastUpdateAuthor: true,
            showLastUpdateTime: true,
          } satisfies PageOptions,


          theme: {
            customCss: [
              './src/css/custom.css',
              // relative paths are relative to site dir
              './_dogfooding/dogfooding.css',
            ],
          },
          gtag: !(isDeployPreview || isBranchDeploy)
            ? {
                trackingID: ['G-E5CR2Q1NRE'],
              }
            : undefined,
          sitemap: {
            // Note: /tests/docs already has noIndex: true
            ignorePatterns: ['/tests/{blog,pages}/**'],
            lastmod: 'date',
            priority: null,
            changefreq: null,
          },

        } satisfies Preset.Options,
      ],
    ],

    themeConfig: {
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: `announcementBar}`,
        // content: `⭐️ If you like Docusaurus, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/543x/docusaurus">GitHub</a> and follow us on <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/docusaurus">Twitter ${TwitterSvg}</a>`,
        content: `🎉️ <b><a target="_blank" href="https://www.543x.com">www.543x.com</a> is out!</b> 🥳️`,
      },
      prism: {
        additionalLanguages: [
          'java',
          'latex',
          'haskell',
          'matlab',
          'PHp',
          'powershell',
          'bash',
          'diff',
          'json',
          'scss',
        ],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: {start: 'highlight-start', end: 'highlight-end'},
          },
          {
            className: 'code-block-error-line',
            line: 'This will error',
          },
        ],
        theme: PrismLight,
        darkTheme: PrismDark,
      },
      image: 'img/docusaurus-social-card.jpg',
      // metadata: [{name: 'twitter:card', content: 'summary'}],
      algolia: {
        appId: 'X1Z85QJPUV',
        apiKey: 'bf7211c161e8205da2f933a02534105a',
        indexName: 'docusaurus-2',
        replaceSearchResultPathname:
          isDev || isDeployPreview
            ? {
                from: /^\/docs\/next/g.source,
                to: '/docs',
              }
            : undefined,
      },
      navbar: {
        hideOnScroll: true,
        title: '中国保安协会',
        logo: {
          alt: '',
          src: 'img/logobaidu.webp',
          srcDark: 'img/docusaurus_keytar.svg',
          width: 32,
          height: 32,
        },
        items: [
          {
            to: '/learn/support',
            label: '保安',
            position: 'left',
            activeBaseRegex: `/learn/`,
          },
          {to: 'showcase', label: '展示', position: 'left'},
        
          {to: 'MapComponent', label: '社交', position: 'left'},
          {
            to: '/community/support',
            label: '社区',
            position: 'left',
            activeBaseRegex: `/community/`,
          },
          {
            to: '/google/support',
            label: '政策',
            position: 'left',
            activeBaseRegex: `/google/`,
          },
          {
            type: 'custom-dogfood-navbar-item',
            content: '😉',
          },
          // Right
          {to: 'swap', label: '交易', position: 'right'},
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                type: 'html',
                value: '<hr style="margin: 0.3rem 0;">',
              },
              {
                href: 'https://www.543x.com',
                label: '543x',
              },
            ],
          },
          {
            href: 'https://github.com/teabagging/security',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ]
          // TODO fix type
          .filter(Boolean) as NonNullable<
          Preset.ThemeConfig['navbar']
        >['items'],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'docs',
            items: [
              {
                label: 'Get Started',
                href: 'https://ai.543x.com',
              },
              {
                label: 'Learn React',
                href: 'https://r.543x.com',
              },
              {
                label: 'Quick Start',
                href: 'https://e.543x.com',
              },
              {
                label: 'Logo by',
                href: 'https://www.z2.pw',
              },
              {
                label: 'web3',
                href: 'https://www.494x.com',
              },
              {
                label: 'Buddhist',
                href: 'https://www.82oo.com',
              },
            ],
          },
          {
            title: 'GitHub',
            items: [
              {
                label: 'you',
                href: 'https://c.543x.com',
              },
              {
                label: 'GitHub',
                href: 'https://www.252x.com/',
              },
              {
                label: 'Pump',
                href: 'https://d.543x.com',
              },
              {
                label: 'Swap',
                href: 'https://s.543x.com',
              },
              {
                label: 'GoogleDocs',
                href: 'https://a.494x.com',
              },
              {
                label: 'Poetry',
                href: 'https://www.14ll.com',
              },
            ],
          },
          {
            title: 'Conduct',
            items: [
              {
                label: 'GitHub',
                href: 'https://b.543x.com',
              },
              {
                label: 'Conduct',
                href: 'https://btc.543x.com',
              },
              {
                label: 'the Team',
                href: 'https://g.543x.com',
              },
              {
                label: 'Contributors',
                href: 'https://f.543x.com',
              },
              {
                label: 'gongkao',
                href: 'https://www.64ii.com',
              },
              {
                label: 'xinhua',
                href: 'https://a.14ll.com',
              },
            ],
          },
          {
            title: 'more',
            items: [
              {
                label: 'Blog',
                href: 'https://d.543x.com',
              },
              {
                label: 'React Native',
                href: 'https://doge.543x.com',
              },
              {
                label: 'PEPE',
                href: 'https://pepe.543x.com',
              },
              {
                label: 'Privacy',
                href: 'https://no.543x.com',
              },
              {
                label: 'Type',
                href: 'https://82ii.com',
              },
              {
                label: 'Country',
                href: 'http://www.41ii.com',
              },
            ],
          },
          {
            title: 'Vite',
            items: [
              {
                label: 'Overview',
                href: 'https://b.252x.com/',
              },
              {
                label: 'Electron',
                href: 'https://c.252x.com/',
              },
              {
                label: 'jamstack',
                href: 'https://d.252x.com/',
              },
              {
                label: 'Vite',
                href: 'https://a.252x.com/',
              },
              {
                label: 'Bible',
                href: 'https://www.82oo.com',
              },
              {
                label: 'vpn',
                href: 'https://a.1zz1.com',
              },
            ],
          },
        ],
        logo: {
          alt: 'Meta Open Source Logo',
          src: '/img/logobaidu.webp',width: 100,height: 100,
          href: 'https://www.543x.com',
        },
        copyright: `Copyright © ${new Date().getFullYear()} 中国保安协会`,
      },
    } satisfies Preset.ThemeConfig,
  } satisfies Config;
}
