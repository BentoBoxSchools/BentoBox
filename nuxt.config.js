module.exports = {
  build: {
    vendor: ['axios'],
    postcss: [
      require('postcss-cssnext')()
    ]
  },
  cache: true,
  /*
  ** Headers of the page
  */
  head: {
    title: 'BentoBox',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: "BentoBox helps school kids and their families to pay unpaid lunch balance." }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Dosis:200|Rubik:900' }
    ],
    script: [
      { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCNsW5TODUbmv2K_0pswqz_P09-e6YeY8s' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/app.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
};
