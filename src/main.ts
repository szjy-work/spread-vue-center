import { createApp } from 'vue'
import './style.css'
import 'virtual:uno.css'

import '@szjy/excel-form/dist/style.css';
import { SzFormDesigner, SzFormPreviewer, create as createForm } from '@szjy/excel-form';

import App from "./App.vue";
import router from "./router";

const szFormDesigner = createForm({
    components: [
        SzFormDesigner,
        SzFormPreviewer
    ]
});

createApp(App).use(router).use(szFormDesigner).mount('#app')
