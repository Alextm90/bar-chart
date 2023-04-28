const data = [243, 450, 600, 1000, 4000, 10000]

const width = 1000;
const height = 1000;

const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        
const scaleX = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([20, 600]);

const xAxis = d3.axisBottom()
        .scale(scaleX)

const scaleY = d3.scaleLinear()
       .domain([d3.min(data), d3.max(data)])
       .range([height/2, 0]);

const yAxis = d3.axisLeft()
         .scale(scaleY)
    
svg.append('g')
        .attr("id", "y-axis")
        .attr("class", "tick")
        .attr('transform', 'translate(70, 20)')
        .call(yAxis)

svg.append('g')
        .attr("id", "x-axis")
        .attr("class", "tick")
        .attr("transform", "translate(50, 520)")
        .style("width", "650")
        .call(xAxis);