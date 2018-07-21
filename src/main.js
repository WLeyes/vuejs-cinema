import Vue from 'vue';
import './style.scss';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

// import vue-resource for making web requests and handle responses using a XMLHttpRequest or JSONP. 
import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype,'$moment', { get() { return this.$root.moment } });

// Global bus to pass props globally 
const bus = new Vue();
Object.defineProperty(Vue.prototype,'$bus', { get() { return this.$root.bus } });

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
  methods: {
    checkFilter(category, title, checked) {
      if(checked) {
        this[category].push(title);
      } else {
        let index = this[category].indexOf(title);
        if(index > -1) {
          this[category].splice(index, 1);
        }
      }
    }
  },
  components: {
    MovieList,
    MovieFilter 
  },
  created() {
    this.$http
      .get('/api')
      .then(response => {
        this.movies = response.data;
      });
      // listen for global bus
      this.$bus.$on('check-filter', this.checkFilter);
  }
});