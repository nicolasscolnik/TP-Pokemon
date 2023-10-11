import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue'
import ArenaDeBatalla from './components/ArenaDeBatalla.vue'
import BusquedaArena from './components/BusquedaArena.vue'

const routes = [
    {
        path: '/ArenaDeBatalla',
        component: ArenaDeBatalla,
    },

    {
        path: '/BusquedaArena',
        component: BusquedaArena,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App); // Cambia el componente inicial si es necesario

app.use(router);
app.mount('#app');
