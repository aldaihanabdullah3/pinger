<template>
  <div margin="0 auto">
    <apexchart margin="0 auto" width="500" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [{
        name: 'Latency',
        data: []
      }, {
        name: 'Jitter',
        data: []
      }],
      chartOptions: {
        chart: {
          height: 550,
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
      fetch('https://www.google.com', { mode: 'no-cors' })
        // eslint-disable-next-line 
        .then(response => {

          // Calculate the latency and jitter for the response
          const latency = Date.now() - this.startTime;
          const jitter = Math.abs(latency - this.lastLatency);
          this.lastLatency = latency;

          // Update the graphs
          this.series[0].data.push(latency)
          this.series[1].data.push(jitter)
          this.chartOptions["xaxis"].categories.push(this.startTime)

          if (this.series[0].data.length > 60) {
            this.series[0].data = this.series[0].data.slice(-60)
            this.series[1].data = this.series[1].data.slice(-60)
            this.chartOptions["xaxis"].categories = this.chartOptions["xaxis"].categories.slice(-60)
          }
        }
        );
    },
  },
  mounted() {
    this.latencies = [];
    this.jitters = [];
    this.lastLatency = 0;
    setInterval(this.ping, 5000)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
  margin: 0 auto;
}
div {
  margin: 0 auto;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

pre {
  max-height: 200px;
  overflow: scroll;
}

.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
