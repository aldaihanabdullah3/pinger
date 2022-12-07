<template>
    <div>
        <apexchart type="line" :options="chartOptions" :series="series" />
    </div>
</template>
  
<script>
/* eslint-disable */

import ApexCharts from 'apexcharts'
export default {
    data() {
        return {
            chartOptions: {
                xaxis: {
                    type: 'datetime'
                }
            },
            series: [
                {
                    name: 'Latency',
                    data: []
                },
                {
                    name: 'Jitter',
                    data: []
                }
            ]
        }
    },
    methods: {
        ping() {
            // Use the fetch() function to send a GET request to Google
            fetch('https://www.google.com', { mode: 'no-cors' })
                .then(response => {
                    // Calculate the latency and jitter for the response
                    const latency = Date.now() - this.startTime;
                    const jitter = Math.abs(latency - this.lastLatency);

                    // Save the latency and jitter data
                    this.latencies.push(latency);
                    this.jitters.push(jitter);

                    // Set the last latency for the next ping request
                    this.lastLatency = latency;

                    // Update the graphs
                    this.tick();
                });
        },
        // Define the start() method to start the pinger application
        start() {
            // Set the initial data for the pinger application
            this.latencies = [];
            this.jitters = [];
            this.lastLatency = 0;

            // Set the start time for the first ping request
            this.startTime = Date.now();

            // Send the first ping request
            this.ping();
            // Set a timer to send ping requests every second
            this.timer = setInterval(() => {
                this.ping();
            }, 1000);
        },
        // Define the stop() method to stop the pinger application
        stop() {
            // Clear the timer to stop sending ping requests
            clearInterval(this.timer);
        },
        tick() {
            // Update the latency path
            this.latencyGraph
                .select('.line')
                .transition()
                .duration(500)
                .ease(d3.easeLinear)
                .attr('d', this.lineLatency);

            // Update the jitter path
            this.jitterGraph
                .select('.line')
                .transition()
                .duration(500)
                .ease(d3.easeLinear)
                .attr('d', this.lineJitter);
            console.log(this.lineJitter, this.lineLatency)
        }
    },
    created() {
        setInterval(this.ping, 1000)
    }
}
</script>
  