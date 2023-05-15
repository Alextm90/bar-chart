
let arr;
const myFunc = async () => {
    await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(data => {
       arr = data.data;
    });

const width = 19000;
const height = 1500;

// get all GDPs into one dataset

let gdpArray = []
arr.forEach((element) => {
    gdpArray.push(element[1])
});

// get all dates into one dataset

let dateArray = []
  arr.forEach((element) => {
    dateArray.push(element[0])
});      

const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        
const scaleX = d3.scaleTime()
       .domain([new Date(d3.min(dateArray)), new Date(d3.max(dateArray))])
        .range([20, 900]);

const xAxis = d3.axisBottom()
        .scale(scaleX)

const scaleY = d3.scaleLinear()
       .domain([d3.min(gdpArray), d3.max(gdpArray)])
       .range([height/2.5, 0]);

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
        .attr("transform", "translate(50, 620)")
        .call(xAxis) 


svg.selectAll("rect")
       .data(gdpArray)
       .enter()
       .append("rect")
       .attr("x", (d, i) => {
            return i * 3.2
          })
       .attr("y", (d, i) => {
            return height - d / 29.9
       })
       .attr("class", "bar")
       .attr("width", 2.5)
       .attr("data-date", (d, i) => {
            return dateArray[i]
       })
       .attr("data-gdp", (d, i) => {
        console.log(gdpArray[i])
            return gdpArray[i]
       })
       .attr("height", (d) => {
           return d / 29.9
       })
       .attr("transform", "translate(70, -879)");

}

myFunc()



