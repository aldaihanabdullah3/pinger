<template>
  <WorkRemainChart msg="Hello Vue 3 in CodeSandbox!" />
</template>

<script>
import WorkRemain from "./components/WorkRemain.vue";
export default {
  name: "App",
  components: {
    WorkRemainChart: WorkRemain,
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