var width = 400;
var height = 400;
var centerX = width/2;
var centerY = height/2;
var bottom = "90%";
var left = "30%";
var setRadius = 150;
var pointRadius = 5;



window.consClosedConvex = function(section) {
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
            { x: 50, y: 0},
            { x: 50, y: 120},
            { x: 50, y: 125},
            { x: 75, y: 150},
            { x: 100, y: 160},
            { x: 200, y: 175}
        ];
    var initX = 200;
    var initY = 175;
    var finalX = 53;
    var finalY = 65;

    var lineData = [
        {x : initX, y : initY},
        {x : 50, y : 0},
        {x : 200, y: 0}
    ];

    var points = [
        {x: initX, y: initY},
        {x: 200, y: 175}
    ]

    // Create a line generator
    var curveGenerator = d3.line()
                            .x(function(d) { return d.x; })
                            .y(function(d) { return d.y; })
                            .curve(d3.curveBundle); // You can choose different curve types

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
        .attr("cx", initX)
        .attr("cy", initY)
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
            .attr("cx", initX)
            .attr("cy", initY)
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
                        { x: initX, y: initY },
                        { x : finalX, y: finalY}
                ]))
            .style("opacity", 1)
            .attr("stroke-width", 2)
            .style("stroke-dashoffset", 0);
    head.transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("cx", finalX)
        .attr("cy", finalY)
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

    svg.append("line")
        .attr("x1", 50)
        .attr("y1", 0)
        .attr("x2", 50)
        .attr("y2", 400)
        .style("stroke", "white")
        .attr("stroke-width", 2)
        .attr("opacity", 0.5)
        .attr("stroke-dasharray", "2,5");

    svg.append("line")
        .attr("x1", 0)
        .attr("y1", 175)
        .attr("x2", 400)
        .attr("y2", 175)
        .style("stroke", "white")
        .attr("stroke-width", 2)
        .attr("opacity", 0.5)
        .attr("stroke-dasharray", "2,5");
    
    var interval = d3.interval(() => {
        if (lambdaVal <= 1) {
            lambda.text("lambda : " + lambdaVal);
            lambdaVal = Math.round((lambdaVal + 0.1) * 10) / 10;
        } else {
            interval.stop();
        }
    }, 181);

}

