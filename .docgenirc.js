/**
 * @type {import('@docgeni/core').DocgeniConfig}
 */
module.exports = {
    mode: 'full',
    title: 'NgxPuzzle',
    siteProjectName: 'example',
    outputDir: 'dist/site',
    logoUrl: '/assets/imgs/logo.png',
    repoUrl: 'https://github.com/zhongmiao-org/ngx-puzzle',
    locales: [
        { key: 'zh-cn', name: '中文' },
        // { key: 'en-us', name: 'English' }
    ],
    defaultLocale: 'zh-cn',
    navs: [
        null,
        {
            title: '组件',
            path: 'components',
            locales: {
                'en-us': {
                    title: 'Component'
                }
            }
        },
        {
            title: '参数',
            path: 'configuration',
            lib: 'ngx-gantt',
            locales: {
                'en-us': {
                    title: 'Configuration'
                }
            }
        },
        {
            title: 'GitHub',
            path: 'https://github.com/zhongmiao-org/ngx-puzzle',
            isExternal: true
        },
    ],
    libs: [
        {
            name: 'ngx-puzzle',
            rootDir: './example/src/app/configuration',
            exclude: [],
            categories: [
                {
                    id: 'config',
                    title: '配置',
                    locales: {
                        'en-us': {
                            title: 'Configuration'
                        }
                    }
                }
            ]
        }
    ]
};
