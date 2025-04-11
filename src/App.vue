<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    console.log('App component mounted')
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f0f2f5;
  color: #1c1e21;
}

#app {
  min-height: 100vh;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

/* Facebook-like blue color */
.fb-blue {
  color: #1877f2;
}

.bg-fb-blue {
  background-color: #1877f2;
}

/* Common button styling */
.custom-button {
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.custom-button:hover {
  background-color: #166fe5;
}

/* Card styling */
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

/* Facebook-like rounded input style */
.fb-input {
  border-radius: 20px;
  padding: 8px 16px;
  border: 1px solid #dddfe2;
}

/* Responsive styles */
@media screen and (max-width: 768px) {
  .desktop-only {
    display: none;
  }
}

@media screen and (min-width: 769px) {
  .mobile-only {
    display: none;
  }
}
</style>
