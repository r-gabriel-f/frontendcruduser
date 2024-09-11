import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './style.css'
import App from './App.vue'
import Button from "primevue/button"
import InputText from "primevue/inputtext"
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import InputNumber from 'primevue/inputnumber';

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ToastService);
app.component('Toast', Toast)
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Dialog', Dialog);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputNumber', InputNumber);

app.mount("#app");