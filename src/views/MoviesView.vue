<template>
  <div class="movies-view">
    <h2>Movies</h2>
    <div class="movie-cards">
      <!-- Loop over the movies array and display each movie -->
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img
          :src="movie.poster"
          :alt="movie.title + ' Poster'"
          class="movie-poster"
        />
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Create a reactive property for storing the movies
let movies = ref([]);

// Function to fetch movies from the API
function fetchMovies() {
  fetch("/api/v1/movies")
    .then((response) => response.json())
    .then((data) => {
      // Update the movies array with the data from the API
      movies.value = data.movies;
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}

// Fetch the movies when the component is mounted
onMounted(() => {
  fetchMovies();
});
</script>

<style scoped>
/* Style for displaying movie cards */
.movies-view {
  max-width: 1200px;
  margin: 0 auto;
}

.movie-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.movie-card {
  width: 200px;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.movie-poster {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
