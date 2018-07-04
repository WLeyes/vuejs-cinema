<template>
  <div class="movie">
    <div class="movie-col-left">
      <img v-bind:src="movie.Poster" v-bind:alt="movie.Title">
    </div>
    <div class="movie-col-right">
      <div class="movie-title">
        <h2>{{ movie.Title }}</h2>
        <span class="movie-rating">{{ movie.Rated }}</span>
      </div>
      <div class="movie-sessions">
        <div class="session-time-wrapper" v-for="session in filteredSession(sessions)" v-bind:key="session.id">
          <div class="session-time">{{ formatSessionTime(session.time) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movie', 'sessions', 'day'],
  methods: {
    formatSessionTime(value) {
      return this.$moment(value).format('h:mm A');
    },
    filteredSession(sessions) {
      return sessions.filter(session => {
        return this.$moment(session.time).isSame(this.day, 'day');
      });
    }
  }
}
</script>
