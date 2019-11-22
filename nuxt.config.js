const { getConfigForKeys } = require('./lib/config.js')
const ctfConfig = getConfigForKeys([
  'CTF_BLOG_POST_TYPE_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN',
  'CTF_CMA_ACCESS_TOKEN',
  'CTF_PERSON_ID'
])

const { createClient } = require('./plugins/contentful')
const cdaClient = createClient(ctfConfig)

export default {
  mode: 'universal',
  // mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/bulma', '~/assets/css/main'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true, // $mdを利用してmarkdownをhtmlにレンダリングする
    breaks: true, // 改行コードを<br>に変換する
    html: true, // HTML タグを有効にする
    linkify: true, // URLに似たテキストをリンクに自動変換する
    typography: true // 言語に依存しないきれいな 置換 + 引用符 を有効にします。
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  },

  /*
   ** ᕕ( ᐛ )ᕗ
   ** Get all portfolio posts from Contentful
   ** and generate the needed files upfront
   **
   ** Included:
   ** - portfolio posts
   ** - available portfolio post tags
   */
  generate: {
    routes() {
      return Promise.all([
        // get all portfolio posts
        cdaClient.getEntries({
          content_type: ctfConfig.CTF_BLOG_POST_TYPE_ID
        })
        // get the portfolio post content type
        // cmaClient.getSpace(ctfConfig.CTF_SPACE_ID)
        //   .then(space => space.getContentType(ctfConfig.CTF_BLOG_POST_TYPE_ID))
      ]).then(([entries, postType]) => {
        return [
          // map entries to URLs
          ...entries.items.map(entry => `/article/${entry.fields.slug}`)
          // map all possible tags to URLs
          // ...postType.fields.find(field => field.id === 'tags').items.validations[0].in.map(tag => `/tags/${tag}`)
        ]
      })
    }
  },
  /*
   ** Define environment variables being available
   ** in generate and browser context
   */
  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: ctfConfig.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: ctfConfig.CTF_BLOG_POST_TYPE_ID
  }
}
