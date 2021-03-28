export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt_composition',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/auth.ts',
    '@/plugins/clickOutside.ts',
    '@/plugins/i18n.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api',
  ],
  typescript: {
    loaders: {
      ts: {
        // Use https://github.com/TypeStrong/ts-loader#options
      },
      tsx: {
        // Use https://github.com/TypeStrong/ts-loader#options
      },
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxt/content',
    'nuxt-svg-loader',
    ['@nuxtjs/firebase',
      {
        config: JSON.parse(process.env.FIREBASE_CONFIG),
        services: {
          firestore: true,
          auth: {
            persistence: 'local',
            initialize: {
              subscribeManually: true,
            },
            ssr: false,
          },
          storage: true,
        },
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
  watchers: {
    webpack: {
      ignored: /node_modules/,
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        'postcss-nested': {},
      },
    },
  },
  server: {
    port: process.env.PORT || 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
}
