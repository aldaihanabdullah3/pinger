<template>
    <div id="app">
        <div id="latency-graph"></div>
        <div id="jitter-graph"></div>
    </div>
</template>
  
<script>
// Import the d3 library
import * as d3 from 'd3';
/* eslint-disable */
export default {
    data() {
        // Set the initial data for the pinger application
        return {
            latencies: [],
            jitters: [],
            timer: null,
        };
    },
    methods: {
        // Define the ping() method to send a ping request to Google
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
    mounted() {
        // Set the dimensions of the graph
        this.width = 500;
        this.height = 200;  // Create the x-scale for the graph
        this.xScale = d3
            .scaleLinear()
            .domain([0, 60])
            .range([0, this.width]);

        // Create the y-scale for the latency data
        this.yLatencyScale = d3
            .scaleLinear()
            .domain([0, 1000])
            .range([this.height, 0]);

        // Create the y-scale for the jitter data
        this.yJitterScale = d3
            .scaleLinear()
            .domain([0, 100])
            .range([this.height, 0]);

        // Create the line generator for the latency data
        this.lineLatency = d3
            .line()
            .x((d, i) => this.xScale(i))
            .y(d => this.yLatencyScale(d));

        // Create the line generator for the jitter data
        this.lineJitter = d3
            .line()
            .x((d, i) => this.xScale(i))
            .y(d => this.yJitterScale(d));

        // Create the SVG element for the latency graph
        this.latencyGraph = d3
            .select('#latency-graph')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        // Create the SVG element for the jitter graph
        this.jitterGraph = d3
            .select('#jitter-graph')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        // Add the latency data to the latency graph
        this.latencyGraph
            .append('path')
            .datum(this.latencies)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('d', this.lineLatency);

        // Add the jitter data to the jitter graph
        this.jitterGraph
            .append('path')
            .datum(this.jitters)
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .attr('stroke-width', 1.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('d', this.lineJitter);

        // Add the x-axis to the latency graph
        this.latencyGraph
            .append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${this.height})`)
            .call(d3.axisBottom(this.xScale));

        // Add the y-axis to the latency graph
        this.latencyGraph
            .append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(this.yLatencyScale));  // Add the x-axis to the jitter graph
        this.jitterGraph
            .append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${this.height})`)
            .call(d3.axisBottom(this.xScale));

        // Add the y-axis to the jitter graph
        this.jitterGraph
            .append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(this.yJitterScale));

        // Add the x-axis label to the latency graph
        this.latencyGraph
            .append('text')
            .attr('x', this.width / 2)
            .attr('y', this.height + 40)
            .attr('text-anchor', 'middle')
            .text('Time (seconds)');

        // Add the y-axis label to the latency graph
        this.latencyGraph
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -this.height / 2)
            .attr('y', -40)
            .attr('text-anchor', 'middle')
            .text('Latency (ms)');

        // Add the x-axis label to the jitter graph
        this.jitterGraph
            .append('text')
            .attr('x', this.width / 2)
            .attr('y', this.height + 40)
            .attr('text-anchor', 'middle')
            .text('Time (seconds)');

        // Add the y-axis label to the jitter graph
        this.jitterGraph
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -this.height / 2)
            .attr('y', -40)
            .attr('text-anchor', 'middle')
            .text('Jitter (ms)');

        // Start the pinger application
        this.start();
    },
};
</script>
