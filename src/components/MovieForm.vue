<template>
  <div class="movie-form">
    <h2>Add a Movie</h2>
    <form id="movieForm" @submit.prevent="saveMovie">
      <!-- Movie Title -->
      <div class="form-group mb-3">
        <label for="title" class="form-label">Movie Title</label>
        <input
          v-model="movie.title"
          type="text"
          id="title"
          name="title"
          class="form-control"
        />
      </div>

      <!-- Movie Description -->
      <div class="form-group mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          v-model="movie.description"
          id="description"
          name="description"
          class="form-control"
        ></textarea>
      </div>

      <!-- Movie Poster -->
      <div class="form-group mb-3">
        <label for="poster" class="form-label">Poster</label>
        <input type="file" ref="poster" name="poster" class="form-control" />
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <!-- Display success or error messages -->
    <div v-if="message" class="alert" :class="message.type">
      {{ message.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const movie = ref({
  title: "",
  description: "",
  poster: null,
});

const message = ref(null);
const csrf_token = ref("");

// Function to get CSRF token
function getCsrfToken() {
  fetch("/api/v1/csrf-token")
    .then((response) => response.json())
    .then((data) => {
      csrf_token.value = data.csrf_token;
    });
}

onMounted(() => {
  getCsrfToken();
});

// Function to handle movie form submission
function saveMovie() {
  const movieForm = document.getElementById("movieForm");
  const formData = new FormData(movieForm);

  fetch("/api/v1/movies", {
    method: "POST",
    body: formData,
    headers: {
      "X-CSRFToken": csrf_token.value,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Success: display the success message
      if (data.message) {
        message.value = { type: "alert-success", text: data.message };
      } else if (data.errors) {
        message.value = {
          type: "alert-danger",
          text: "Validation failed. Please try again.",
        };
      }
    })
    .catch((error) => {
      message.value = {
        type: "alert-danger",
        text: "An error occurred while uploading.",
      };
      console.error(error);
    });
}
</script>

<style scoped>
/* Add some basic styling */
.movie-form {
  max-width: 600px;
  margin: 0 auto;
}
.alert {
  padding: 10px;
  margin-top: 15px;
}
.alert-success {
  background-color: #d4edda;
  color: #155724;
}
.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
