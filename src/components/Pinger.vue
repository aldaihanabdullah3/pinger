<template>
  <div class="pinger-container">
    <h3 class="pinger-title">Ultra Lite Browser Based Pinger </h3>

    <div class="input-container">
      <table>
        <tr>
          <td>
            <label for="url" class="input-label">URL:</label>
          </td>
          <td width="70%">
            <input id="url" type="text" v-model="url" class="input-field" />
          </td>
          <td>
            <button @click="apply" class="button apply-button">Apply</button>
          </td>
        </tr>
        <tr>
          <td>
            <label for="interval" class="input-label">Interval (ms):</label>
          </td>
          <td width="70%">
            <input id="interval" type="number" v-model="interval" class="input-field" />
          </td>
          <td>
            <button @click="reset" class="button reset-button">Reset</button>
          </td>
        </tr>
      </table>
    </div>
    <div class="result-container">
      <div class="result-item">
        <p class="result-value">{{ currentLatency }} ms</p>
        <p class="result-label">Latency</p>
      </div>
      <div class="result-item">
        <p class="result-value">{{ averageLatency }} ms</p>
        <p class="result-label">Average Latency</p>
      </div>
      <div class="result-item">
        <p class="result-value">{{ currentJitter }} ms</p>
        <p class="result-label">Jitter</p>
      </div>
      <div class="result-item">
        <p class="result-value">{{ averageJitter }} ms</p>
        <p class="result-label">Average Jitter</p>
      </div>
    </div>
    <apexchart class="chart-canvas" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style>
.pinger-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
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

.result-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0;
}

.result-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: 140px;
  height: 140px;
  font-size: 14px;
  background-color: #fff;
  border: 2px solid #00bcd4;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.result-label {
  color: #00bcd4;
  font-weight: bold;
  margin-bottom: 20px;
}

.result-value {
  display: inline-block;
  text-align: center;
  line-height: 100px;
  font-size: 20px;
  font-weight: bold;
  color: rgb(2, 2, 2);
}

.chart-canvas {
  width: 100%;
  margin: 20px 0;
}

@media (min-width: 750px) {
  .chart-canvas, .input-container, .result-container, .pinger-container{
    width: 750px;
  }
}
</style>


<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "PingerComponenet",
  props: {
    msg: String,
  },
  components: {
    apexchart: VueApexCharts,
  },
  data() {

    return {
      url: 'https://www.google.com', // The URL to ping
      interval: 5000, // The interval at which to ping the URL (in milliseconds)
      currentLatency: 0,
      averageLatency: 0,
      currentJitter: 0,
      averageJitter: 0,
      windowWidth: 650,
      series: [{
        name: 'Latency',
        data: []
      }, {
        name: 'Jitter',
        data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: []
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },
    }
  },
  methods: {
    ping() {
      this.startTime = Date.now();
      // Use the fetch() function to send a GET request to Google
      fetch(this.url, { mode: 'no-cors' })
        // eslint-disable-next-line 
        .then(response => {
          this.counter++;
          // Calculate the latency and jitter for the response
          this.currentLatency = Date.now() - this.startTime;
          this.currentJitter = Math.abs(this.currentLatency - this.lastLatency);
          this.lastLatency = this.currentLatency;
          this.accumulativeLatency += this.currentLatency;
          this.accumulativeJitter += this.currentJitter;
          this.averageLatency = parseInt(this.accumulativeLatency / this.counter, 10);
          this.averageJitter = parseInt(this.accumulativeJitter / this.counter, 10);

          // Update the graphs
          this.series[0].data.push(this.currentLatency)
          this.series[1].data.push(this.currentJitter)
          this.chartOptions["xaxis"].categories.push(this.startTime)

          if (this.series[0].data.length > 60) {
            this.series[0].data = this.series[0].data.slice(-60)
            this.series[1].data = this.series[1].data.slice(-60)
            this.chartOptions["xaxis"].categories = this.chartOptions["xaxis"].categories.slice(-60)
          }
        }
        );
    },
    reset() {
      this.lastLatency = 0;
      this.currentLatency = 0
      this.currentJitter = 0
      this.accumulativeLatency = 0
      this.accumulativeJitter = 0
      this.averageLatency = 0
      this.averageJitter = 0
      this.counter = 0
      this.series[0].data = []
      this.series[1].data = []
      this.chartOptions["xaxis"].categories = []
      this.$forceUpdate();
    },
    apply() {
      // Stop the interval that calls the ping method
      clearInterval(this.interval);

      // Reset the graphs
      this.reset();

      // Restart the interval with the new URL
      this.backgroundPing = setInterval(this.ping, this.interval);
    },
    rerenderchart() {
      console.log(window.innerWidth)
      if (window.innerWidth < 650) {
        this.windowWidth = window.innerWidth
      }
      //this.$forceUpdate();
    }
  },
  mounted() {

    this.rerenderchart();
    this.reset();
    this.ping();
    this.backgroundPing = setInterval(this.ping, this.interval);
  }
};
</script>