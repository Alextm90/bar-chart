let arr;
const barChart = async () => {
    await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
       arr = data.data;
    });

let width = 1100;
let height = 700;
let padding = 100;

const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

// get all GDP data into one dataset

let gdpArray = []
  arr.forEach((element) => {
    gdpArray.push(element[1])
});

// get all dates into one dataset

let dateArray = []
  arr.forEach((element) => {
     dateArray.push(element[0])
});      

// create axes + scales
const xScale = d3.scaleTime()
        .domain([new Date(d3.min(dateArray)), new Date(d3.max(dateArray))])
        .range([padding, width - padding]);

const xAxis = d3.axisBottom()
        .scale(xScale)


const yScale = d3.scaleLinear()
        .domain([0, d3.max(gdpArray)])
        .range([height/1.4, 0]); // changed 0 to padding

const yAxis = d3.axisLeft()
         .scale(yScale)
    
svg.append('g')
        .attr("id", "y-axis")
        .attr("class", "tick")
        .attr('transform', 'translate(' + padding + ', ' + padding + ')')
        .call(yAxis)
  	.append("text")
        .text('Gross Domestic Product (Billions of USD)')
        .attr("fill", "black")
	.attr("transform", "rotate(-90)")
        .attr("x", - padding)
	.attr("y", 20)
        .attr("id", "label")
        .attr("font-size", "14px")
        .attr("font-family", "Georgia")


svg.append("text")
        .text("United States GDP")
        .attr("fill", "black")
	.attr("y", padding - 50)
        .attr("x", padding * 3.5)
        .attr("font-size", "44px")


svg.append('g')
        .attr("id", "x-axis")
        .attr("class", "tick")
        .attr("transform", 'translate(0,  ' + (height - padding) + ')')
        .call(xAxis) 


// create tooltip + datapoints
let tooltip = d3.select('body')
        .append("div")
        .attr("id", "tooltip")

svg.selectAll("rect")
        .data(gdpArray)
        .enter()
        .append("rect")
        .attr("x", (d, i) => {
            return xScale(new Date(dateArray[i])) 
          })
        .attr("y", (d, i) => {
            return yScale(d)  
       })
        .attr("class", "bar")
        .attr("width", (width - padding * 2) /gdpArray.length)
        .attr("data-date", (d, i) => {
            return dateArray[i]
       })
        .attr("data-gdp", (d, i) => {
            return gdpArray[i]
       })
        .attr("height", (d) => {
           return height - yScale(d) - padding * 2
       })
        .attr("transform", "translate(0," + padding + ")")
        .on('mouseover', (event, d) => {
           let dateArrayIndex = gdpArray.indexOf(d)
            tooltip
           .html(`${dateArray[dateArrayIndex]} <br> $${d} Billion `)
           .style("opacity", .9)
           .style("position", "absolute")
           .style("left", (event.pageX + 25) + "px")
           .style("top", (event.pageY - 55) + "px")
           .style("background-color", "#e5f0cb")
           .attr("data-date", dateArray[dateArrayIndex])
       })
        .on('mouseout', () => {
            tooltip
            .style("opacity", 0)
          })
       }
barChart()