<!-- src/App.vue -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup></script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

/* 台灣玉山銀行的童話松柏綠色 */
:root {
  --esun-green: #007550;
  --esun-green-light: #009464;
  --esun-green-dark: #005c3f;
  --esun-text-on-green: #ffffff;
  --esun-accent: #e6b31e;
}

.esun-green {
  color: var(--esun-green);
}

.bg-esun-green {
  background-color: var(--esun-green);
}

.esun-accent {
  color: var(--esun-accent);
}

.bg-esun-accent {
  background-color: var(--esun-accent);
}

.fb-blue {
  color: var(--esun-green);
}

.bg-fb-blue {
  background-color: var(--esun-green);
}

.custom-button {
  background-color: var(--esun-green);
  color: var(--esun-text-on-green);
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.custom-button:hover {
  background-color: var(--esun-green-light);
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.fb-input {
  border-radius: 20px;
  padding: 8px 16px;
  border: 1px solid #dddfe2;
}

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
