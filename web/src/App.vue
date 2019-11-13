<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-size: 28px;
  /* overflow-x:hidden;
  width:100% */
}
#app {
  min-width: 800px;
}
@media screen and (max-width: 500px) {
  body,html{
    font-size: 14px;
  }
  #app {
    min-width: 0;
    font-size: 12px;
  }
}
html {
overflow-y: scroll;
}

:root {
overflow-y: auto;
overflow-x: hidden;
}

:root body {
position: absolute;
}

body {
width: 100vw;
overflow: hidden;
}
</style>
