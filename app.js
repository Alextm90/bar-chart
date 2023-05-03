let data = [5, 25, 45, 79, 120, 300]

let arr;
const myFunc = async () => {
    await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(response => response.json())
    .then(data => {
       arr = data.data;
    });

const width = 1000;
const height = 1000;

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

console.log(dateArray, "test")
const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        
const scaleX = d3.scaleLinear()
        .domain([d3.min(dateArray), d3.max(dateArray)])
        .range([20, 600]);

const xAxis = d3.axisBottom()
        .scale(scaleX)

const scaleY = d3.scaleLinear()
       .domain([d3.min(gdpArray), d3.max(gdpArray)])
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
        .call(xAxis) 
}

myFunc()



