<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <PingerVue msg="Hello Vue 3 in CodeSandbox!" />
  </div>
  
</template>

<script>
import PingerComponenet from "./components/Pinger/Pinger.vue";
export default {
  name: "App",
  components: {
    PingerVue: PingerComponenet,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>