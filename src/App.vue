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

/* 台灣玉山銀行的童話松柏綠色 */
:root {
  --esun-green: #007550;      /* 主要綠色 */
  --esun-green-light: #009464; /* 較淺綠色，用於懸停效果 */
  --esun-green-dark: #005c3f;  /* 深綠色，用於重點強調 */
  --esun-text-on-green: #ffffff; /* 在綠色背景上的文字顏色 */
  --esun-accent: #e6b31e;      /* 輔助色（金色），用於強調和按鈕 */
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

/* 原來的藍色樣式（保留但改為綠色） */
.fb-blue {
  color: var(--esun-green);
}

.bg-fb-blue {
  background-color: var(--esun-green);
}

/* 通用按鈕樣式 */
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
