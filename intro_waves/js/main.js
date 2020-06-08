////////////////
// orignal code from https://bl.ocks.org/basilesimon/f164aec5758d16d51d248e41af5428e4

var lines = 5
var speed = 1000
var delay = speed*0.1

var w = window.innerWidth;
var h = 600;

var svg = d3.select("#background-vis")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .attr("id", "visualization");


let waves = Math.floor(window.innerWidth / 200) + 2

var x = d3.scaleLinear().domain([0, waves]).range([0, w]);
var y = d3.scaleLinear().domain([0, waves]).range([h*0.9, 0]);

var line = d3.line()
  .x(function(d,i) {return x(i);})
  .y(function(d) {return y(d);})
  .curve(d3.curveNatural)


// data is created inside the function so it is always unique
let repeat = (speed) => {
  var data = d3.range(waves).map(function(i){return Math.random()*(waves-(i*0.8))})
  data.push(0)

  var color = d3.interpolateWarm(Math.random())

  var path = svg.append("path")
    .attr("d", line(data))
    .attr("stroke", color)
    .attr("stroke-width", "2")
    .attr("fill", "none");

  var totalLength = path.node().getTotalLength();

  path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
      .duration(speed)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)

    setTimeout(function(){ 
    svg.selectAll('dot')
        .data(data)
        .join('circle')
        .attr('cx', function(d,i) {return x(i);})
        .attr('cy', function(d) {return y(d);})
        .attr('r', 4)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("opacity",0)
        .transition()
        .duration(speed/2)
        .ease(d3.easeLinear)
        .attr("opacity",1)
    },delay*lines)

};

for (let i=0; i<lines; i++){
  setTimeout(function(){ repeat(speed-(delay*i)); }, delay*i);
}