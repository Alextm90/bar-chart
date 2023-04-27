const data = [10, 7, 14, 19, 85]

const width = 1000;
const height = 1000;

const svg = d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

const scale = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([50, 500]);

const xAxis = d3.axisBottom()
                   .scale(scale);

svg.append("g")
      .attr("transform", "translate(0, 300)")
      .call(xAxis);
             