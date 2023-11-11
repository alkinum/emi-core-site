<template>
  <a-layout class="page">
    <a-content>
      <top-nav />
      <landing />
      <bottom-footer />
    </a-content>
  </a-layout>
</template>

<style lang="scss">
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

#app {
  background: linear-gradient(180deg, var(--primary), var(--secondary));
}
</style>
