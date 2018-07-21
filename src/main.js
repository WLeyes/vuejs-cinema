import Vue from 'vue';
import './style.scss';

// import vue-resource for making web requests and handle responses using a XMLHttpRequest or JSONP. 
import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype,'$moment', { get() { return this.$root.moment } });

import { checkFilter } from './util/bus';

// Global bus to pass props globally 
const bus = new Vue();
Object.defineProperty(Vue.prototype,'$bus', { get() { return this.$root.bus } });

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes';
const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment(),
    bus
  },
  created() {
    this.$http
      .get('/api')
      .then(response => {
        this.movies = response.data;
      });
      // listen for global bus
      this.$bus.$on('check-filter', checkFilter.bind(this));
  },
  router
});