<<<<<<< HEAD
<!-- src/App.vue -->
=======
<<<<<<< HEAD
<!-- src/App.vue -->
=======
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
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

<<<<<<< HEAD
html,
body {
  height: 100%;
  margin: 0;
  overflow-x: hidden;
=======
<<<<<<< HEAD
html,
body {
  height: 100%;
  overflow-y: auto !important; /* 强制允許垂直滾動 */
  margin: 0;
=======
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif;
  background-color: #f0f2f5;
  color: #1c1e21;
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
}

#app {
  min-height: 100vh;
<<<<<<< HEAD
  position: relative;
  overflow-x: hidden;
=======
<<<<<<< HEAD
  overflow-y: auto !important; /* 確保 #app 不限制滾動 */
=======
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

/* 台灣玉山銀行的童話松柏綠色 */
:root {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
  --esun-green: #007550;
  --esun-green-light: #009464;
  --esun-green-dark: #005c3f;
  --esun-text-on-green: #ffffff;
  --esun-accent: #e6b31e;
<<<<<<< HEAD
=======
=======
  --esun-green: #007550; /* 主要綠色 */
  --esun-green-light: #009464; /* 較淺綠色，用於懸停效果 */
  --esun-green-dark: #005c3f; /* 深綠色，用於重點強調 */
  --esun-text-on-green: #ffffff; /* 在綠色背景上的文字顏色 */
  --esun-accent: #e6b31e; /* 輔助色（金色），用於強調和按鈕 */
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
/* 原來的藍色樣式（保留但改為綠色） */
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
.fb-blue {
  color: var(--esun-green);
}

.bg-fb-blue {
  background-color: var(--esun-green);
}

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
/* 通用按鈕樣式 */
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
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

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
/* Card styling */
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
/* Facebook-like rounded input style */
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
.fb-input {
  border-radius: 20px;
  padding: 8px 16px;
  border: 1px solid #dddfe2;
}

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
/* Responsive styles */
>>>>>>> c3fdf757f0a4fab19f6f1291d90bd81ecd77547e
>>>>>>> bb60ad9ea6e7ef71e5106743ea0ff76c097767f1
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
