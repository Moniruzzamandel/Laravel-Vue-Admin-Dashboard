/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

// installation VForm
import { Form, HasError, AlertError } from 'vform';

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

// File For Data Tabel
require('@fortawesome/fontawesome-free/js/all.js');
require('bootstrap-table/dist/bootstrap-table.min.css');
require('bootstrap-table/dist/bootstrap-table.js');

require('tableexport.jquery.plugin');
require('bootstrap-table/dist/extensions/export/bootstrap-table-export.min.js');
require('bootstrap-table/dist/extensions/print/bootstrap-table-print.min.js');

require('bootstrap-table/dist/extensions/filter-control/bootstrap-table-filter-control.min.css');
require('bootstrap-table/dist/extensions/filter-control/bootstrap-table-filter-control.min.js');

// installation Moment
import moment from 'moment';

// Installation Gate For ACL
import Gate from "./Gate";
Vue.prototype.$gate = new Gate(window.user);


// installation Progress bar
import VueProgressBar from 'vue-progressbar';

const options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '3px',
    transition: {
      speed: '0.2s',
      opacity: '0.2s',
      termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
  }

Vue.use(VueProgressBar, options);

// Install Sweet Alert

import swal from 'sweetalert2';
window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', swal.stopTimer)
      toast.addEventListener('mouseleave', swal.resumeTimer)
    }
  })


window.toast = toast;

// Custom Event

let Fire = new Vue();
window.Fire = Fire;

// Installation Laravel vue pagination

Vue.component('pagination', require('laravel-vue-pagination'));

// 1. Installation Vue
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// 2. Define some routes

const routes = [
    { path: '/dashboard', component: require('./components/DashboardComponent.vue').default },
    { path: '/profile', component: require('./components/ProfileComponent.vue').default },
    { path: '/users', component: require('./components/UsersComponent.vue').default },
    { path: '/categories', component: require('./components/CategoriesComponent.vue').default },
    { path: '/developer', component: require('./components/DeveloperComponent.vue').default },
    { path: '*', component: require('./components/NotFoundComponent.vue').default }
  ]


// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
    //mode: 'history',
    routes // short for `routes: routes`
  });

// Adding Filter Vue By default Functionality

Vue.filter('upText', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1);
});

// Adding FIlter for Moment JS
Vue.filter('customDate', function(formateDate){
    return moment(formateDate).format("MMM Do YY");
});
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('passport-clients', require('./components/passport/Clients.vue').default);
Vue.component('passport-authorized-clients', require('./components/passport/AuthorizedClients.vue').default);
Vue.component('passport-personal-access-tokens',require('./components/passport/PersonalAccessTokens.vue').default);
Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('not-found', require('./components/NotFoundComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router

});
