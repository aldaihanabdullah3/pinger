<template>
  <div class="pinger-container">
    <h3 class="pinger-title">Ultra Lite Browser Based Pinger </h3>

    <div class="input-container">
      <table>
        <tr>
          <td>
            <label for="url" class="input-label">URL:</label>
          </td>
          <td width="68%">
            <input id="url" type="text" v-model="InputUrl" class="input-field" />
          </td>
          <td>
            <button @click="apply" class="button apply-button">Apply</button>
          </td>
        </tr>
        <tr>
          <td>
            <label for="interval" class="input-label">Interval (ms):</label>
          </td>
          <td width="68%">
            <input id="interval" type="number" v-model="InputInterval" class="input-field" />
          </td>
          <td>
            <button @click="reset" class="button reset-button">Reset</button>
          </td>
        </tr>
      </table>
    </div>
    <pingercc class="canvas-container" :url="url" :interval="interval"></pingercc>
  </div>
</template>
  
<style>
.pinger-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  width: 100%;
}

.pinger-title {
  color: #00bcd4;
  margin: 0 0 20px 0;
  font-size: 25px;
  font-weight: bold;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  margin: 10px 0;
}

.input-label {
  color: #000;
  text-align: left;
  width: 30%;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.input-field {
  width: 70%;
  height: 40px;
  border: 2px solid #00bcd4;
  border-radius: 5px;
  font-size: 16px;
  padding: 0 10px;
  color: #333;
  outline: none;
  transition: border-color 0.2s;
}

button {
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: #00bcd4;
  color: #fff;
}

.button:hover {
  background-color: #333;
  color: #fff;
}

.canvas-container {
  width: 100%;
  margin: 20px 0;
}

@media (min-width: 750px) {

  .canvas-container,
  .input-container,
  .pinger-container {
    width: 750px;
  }
}
</style>
  
  
<script>
import PingerCanvasComponenet from "./Canvas.vue";

export default {
  name: "PingerComponenet",
  components: {
    pingercc: PingerCanvasComponenet,
  },
  data() {

    return {
      url: 'https://www.google.com', // The URL to ping
      interval: 1000,
      InputUrl: 'https://www.google.com',
      InputInterval: 1000,
    }
  },
  methods: {
    apply() {
      this.url = this.InputUrl;
      this.interval = this.InputInterval;
      console.log(this.interval, this.url);
      this.$forceUpdate();
    },
    mounted() {
    }
  }
};
</script>