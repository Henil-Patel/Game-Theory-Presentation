var width = 400;
var height = 400;
var centerX = width/2;
var centerY = height/2;
var bottom = "90%";
var left = "30%";
var setRadius = 150;
var pointRadius = 5;



window.prodClosedConvex = function(section) {
    var existingSVG = section.querySelector("svg");
    if (existingSVG) {
        existingSVG.remove();
    }

    var svg = d3.select(section)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("position", "relative")
                // .style("border", "0.01em solid white")
                .style("bottom", bottom)
                .style("left", left);
    // Define curve data
    var curveData = [
            { x: 0, y: 50  },
            { x: 100, y: 75 },
            { x: 150, y: 100 },
            { x: 200, y: 150 },
            { x: 200, y: 200}
        ];

    var lineData = [
        { x: 200, y: 400},
        { x: 200, y: 200},
        { x: 0, y: 50}, 
        { x:0 , y:400}
    ];

    var points = [
        {x: centerX, y: centerY},
        {x: 200, y: 200}
    ]

    // Create a line generator
    var curveGenerator = d3.line()
                            .x(function(d) { return d.x; })
                            .y(function(d) { return d.y; })
                            .curve(d3.curveBundle); 

    var lineGenerator = d3.line()
                            .x(d => d.x)
                            .y(d => d.y)
                            .curve(d3.curveLinear);


    // Draw Y axis
    // Add x-axis
    var xAxis = d3.axisTop()
                    .scale(d3.scaleLinear().domain([-200, 200]).range([0, 400]))
                    .tickValues([]);
    svg.append("g")
            .attr("transform", "translate(0, 200)")
            .call(xAxis)
            .attr("stroke-width", 2);

    // Add y-axis
    var yAxis = d3.axisLeft()
                    .scale(d3.scaleLinear().domain([-200, 200]).range([0, 400]))
                    .tickValues([]);
    svg.append("g")
            .attr("transform", "translate(200, 0)")
            .call(yAxis)
            .attr("stroke-width", 2);


    // Draw the curve
    svg.append("path")
            .data([curveData])
            .attr("d", curveGenerator)
            .attr("fill", "white")
            .attr("fill-opacity", 0.1)
            .attr("stroke", "white")
            .attr("stroke-width", 2);

    svg.append("path")
        .data([lineData])
        .attr("d", lineGenerator)
        .attr("fill", "white")
        .attr("fill-opacity", 0.1)
        .attr("stroke", "white")
        .attr("stroke-width", 0);

    svg.append("circle")
        .attr("cx", centerX)
        .attr("cy", centerY)
        .attr("r", 4)
        .attr("fill", "red");

    svg.append("text")
        .attr("x", 225)
        .attr("y", 30)
        .style("text-anchor", "middle")
        .text("G")
        .attr("fill", "white")
        .style("font-family", "Times New Roman, serif")
        .style("font-size", "0.8em");

    svg.append("text")
        .attr("x", 380)
        .attr("y", 230)
        .style("text-anchor", "middle")
        .text("L")
        .attr("fill", "white")
        .style("font-family", "Times New Roman, serif")
        .style("font-size", "0.8em");

    head = svg.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", 4)
            .attr("fill", "blue");
        


    var pathString = lineGenerator(points);
    var vectorPath = svg.append("path")
            .attr("d", pathString)
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr("fill", "none")
            .style("opacity", 1);
    var totalLength = vectorPath.node().getTotalLength();
    vectorPath.style("stroke-dasharray", totalLength + " " + totalLength)
            .style("stroke-dashoffset", totalLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("d", lineGenerator([
                        { x: centerX, y: centerY },
                        { x : 50, y: 65}
                ]))
            .style("opacity", 1)
            .attr("stroke-width", 2)
            .style("stroke-dashoffset", 0);

    head.transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("cx", 50)
        .attr("cy", 65)
        .attr("r", 4);

    var lambdaVal = 0;

    var lambda = svg.append("text")
        .attr("x", 100)
        .attr("y", 250)
        .style("text-anchor", "middle")
        .style("font-family", "Times New Roman, serif")
        .style("font-size", "0.7em")
        .style("fill", "white")
        .text("lambda : " + lambdaVal);

    var interval = d3.interval(() => {
        if (lambdaVal <= 1) {
            lambda.text("lambda : " + lambdaVal);
            lambdaVal = Math.round((lambdaVal + 0.1) * 10) / 10;
        } else {
            interval.stop();
        }
    }, 181);

}

