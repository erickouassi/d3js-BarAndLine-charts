// credit
// https://bl.ocks.org/htakeuchi/a60c0ecb55713c06c054c26c6dbed57a

 var dataset = [
   
    ['a',703, 1902, 1999],
    ['b',1473,3341, 2010],
    ['c',863,1935, 1907],
    ['d',1494,3008, 1867],
    ['e',965,1743, 1986],
    ['f',568,1271, 2019],
    ['g',189, 626, 1780],
    ['h',464, 1064, 1897],
    ['p',731, 1443, 1999],
    ['o',306, 630, 1980],
    ['q',899, 2556, 1907],
    ['zo',230, 1880, 1907],
    ['v',262, 589, 2018],
    ['z',429, 1497, 2015],
    ['aa',322, 749, 1897],
    ['bc',315, 720, 1689],
    ['nb',228, 522, 1678],
    ['mj',436, 1391, 1864],
    ['gh',287, 613, 1907],
    ['uj',419,932, 2006],
    ['kj',296,612, 1567],
    ['lo',343,855, 1960]
  ];

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960,
      height = 400;

  var xScale = d3.scaleBand()
                .rangeRound([0, width])
                .padding(0.1)
                .domain(dataset.map(function(d) {
                  return d[0];
                }));
      yScale = d3.scaleLinear()
                .rangeRound([height, 0])
                .domain([0, d3.max(dataset, (function (d) {
                  return d[2];
                }))]);

  var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

  var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // axis-x
  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

  // axis-y
  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(yScale));

// bar chart
  var bar = g.selectAll("rect")
    .data(dataset)
    .enter().append("g");

  bar.append("rect")
    .attr("x", function(d) { return xScale(d[0]); })
    .attr("y", function(d) { return yScale(d[2]); })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) { return height - yScale(d[2]); })
    .attr("class", function(d) {
      var s = "bar ";
      if (d[1] < 400) {
        return s + "bar1";
      } else if (d[1] < 800) {
        return s + "bar2";
      } else {
        return s + "bar3";
      }
    });
   
  // labels on the bar chart
  bar.append("text")
    .attr("dy", "1.3em")
    .attr("x", function(d) { return xScale(d[0]) + xScale.bandwidth() / 2; })
    .attr("y", function(d) { return yScale(d[2]); })
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "red")
    .text(function(d) {
      return d[2];  // change [0],[1],[2],..[n]
    });



  // line chart
  var line = d3.line()
      .x(function(d, i) { return xScale(d[0]) + xScale.bandwidth() / 2; })
      .y(function(d) { return yScale(d[1]); })
      .curve(d3.curveMonotoneX);

  bar.append("path")
    .attr("class", "line") // Assign a class for styling
    .attr("d", line(dataset)); // 11. Calls the line generator

  bar.append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function(d, i) { return xScale(d[0]) + xScale.bandwidth() / 2; })
      .attr("cy", function(d) { return yScale(d[1]); })
      .attr("r", 5);
      
    