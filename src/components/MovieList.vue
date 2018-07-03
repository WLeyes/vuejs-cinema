<template>
  <div id="movie-list">
    <div class="movie" v-for="movie in filteredMovies" v-bind:key="movie.id">{{ movie.title }}</div>
  </div>
</template>

<script>
import genres from '../util/genres';
export default {
  data() {
    return {
      movies: [
        { id: 1, title: 'Pulp Fiction', genre: genres.ACTION },
        { id: 2,title: 'Home Alone', genre: genres.COMEDY },
        { id: 3,title: 'Austin Powers', genre: genres.COMEDY }
      ]
    }
  },
  props: [ 'genre', 'time' ],
  methods: {
    moviePassesGenreFilter(movie) {
      if(!this.genre.length) {
        return true;
      } else {
        return this.genre.find(genre => movie.genre === genre);
      }
    }
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(this.moviePassesGenreFilter);
    }
  }
}
</script>
