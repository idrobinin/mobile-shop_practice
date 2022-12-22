import { createApp } from "vue";
import App from './App';
import store from './store';
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'


// сначала нам надо загрузить данные с сервера а потом только отрисовывать страницу
store.dispatch('products/load').then (() => {
    createApp(App)
        .use(store)
        .use(router)
        .mount('#app');
})

store.dispatch('cart/load')