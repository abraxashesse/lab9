const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        x: Math.random() * 500,
        y: Math.random() * 500
    });
}

const scatterPlot = d3.select('#scatter-plot');
scatterPlot.selectAll('circle')
    .data(data)
    .enter().append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', 5)
    .attr('fill', 'green');

d3.csv("titanic.csv").then(function(data) {
  
  var ageDistribution = d3.rollups(data, 
    v => v.length, 
    d => d.Age > 0 && d.Age < 100 ? Math.floor(d.Age / 10) * 10 : "Unknown"
  );

  var width = 500;
  var height = 500;
  var radius = Math.min(width, height) / 2 - 20;
  var colors = d3.scaleOrdinal(d3.schemeCategory10);

  var pie = d3.pie()
    .value(d => d[1])
    .sort(null);

  var arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius * 0.4);

  var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var arcs = svg.selectAll("arc")
    .data(pie(ageDistribution))
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => colors(d.data[0]))
    .attr("stroke", "#fff")
    .attr("stroke-width", 2);

  arcs.append("text")
    .attr("transform", d => "translate(" + arc.centroid(d) + ")")
    .attr("text-anchor", "middle")
    .attr("fill", "#fff")
    .attr("font-size", "1em")
    .text(d => d.data[0] + "s: " + d.data[1]);
});
