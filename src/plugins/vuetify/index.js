import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#00C853',
          secondary: '#01579B',
          accent: '#212121',
          error: '#D50000',
          info: '#7C4DFF',
          success: '#76FF03',
          danger: '#FF1744',
          customwhite: '#E3F2FD',
          drawerColor: '#01579B',
        }
      },
    }
  },
});