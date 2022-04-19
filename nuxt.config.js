export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Nuxt Stripe Demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
      }
    ],
    script: [
      {
        src: 'https://js.stripe.com/v3'
      }
    ]
  },

  env: {
    STRIPE_PUBLISHABLE_KEY: `${process.env.STRIPE_PUBLISHABLE_KEY}`,
    STRIPE_ACCOUNT: process.env.STRIPE_ACCOUNT,
    API_VERSION: process.env.API_VERSION,
    LOCALE: process.env.LOCALE,
    STRIPE_API_URL: process.env.STRIPE_API_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    ROOT_URL: process.env.ROOT_URL,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vue-stripe', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/toast'
  ],
  toast: {
    position: 'bottom-right',
    theme: 'outline',
    duration : 3000,
    register: [ // Register custom toasts
      {
        name: 'error',
        message: 'Payment Canceled',
        options: {
          type: 'error'
        }
      },
      {
        name: 'success',
        message: 'Payment successful',
        options: {
          type: 'success'
        }
      },
    ]
},

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.STRIPE_API_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
