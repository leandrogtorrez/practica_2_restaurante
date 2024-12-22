import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles/styles.scss'
import './assets/styles/buttons.scss'
import './assets/styles/form.scss'
import './assets/styles/table.scss'
// Importaciones axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import toasts from './toasts';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.use(toasts);

app.mount('#app')



