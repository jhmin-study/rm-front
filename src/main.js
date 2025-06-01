import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import "./assets/styles/common.css"
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

createApp(App).component('VueDatePicker', VueDatePicker).use(router).mount('#app')
