import { createApp } from 'vue'
import App from './App.vue'
import {router} from "./routes";
import home from './modules/home';
import loaderPlugin from "./plugins/loader";
import vuetify from './plugins/vuetify';

const app = createApp(App);
const options = { router};

app.use(home, options);
app.use(loaderPlugin);

app.use(router).use(vuetify).mount('#app');