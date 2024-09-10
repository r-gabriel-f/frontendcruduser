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
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast'
import 'primeicons/primeicons.css';
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

app.mount("#app");