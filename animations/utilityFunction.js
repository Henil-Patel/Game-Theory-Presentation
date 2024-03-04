var width = 400;
var height = 400;
var centerX = width/2;
var centerY = height/2;
var bottom = "90%";
var left = "30%";
var setRadius = 150;
var pointRadius = 3;


window.utilityFunction = function(section) {
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
    
    var blob = [
        {x: 50, y: 130},
        {x: 70, y: 100},
        {x: 100, y: 75},
        {x: 175, y: 100},
        {x: 210, y: 100},
        {x: 200, y: 190},
        {x: 190, y: 230},
        {x: 150, y: 250},
        {x: 105, y: 260},
        {x: 70, y: 230},
        {x: 60, y: 200},
        {x: 50, y: 170},
        {x: 50, y: 130}
    ];


    var arc1trace = [
        {x: 150, y:150},
        {x: 240, y:75},
        {x: 325, y:150},
    ];
    
    var arc2trace = [
        {x: 190, y: 200},
        {x: 260, y: 150},
        {x: 325, y: 175},
    ];

    var xOffset = 50;
    var yOffset = 0;
    blob = blob.map(coord => ({x: coord.x + xOffset, y: coord.y + yOffset}));

    var curveGenerator = d3.line()
                        .x(d => d.x)
                        .y(d => d.y)
                        .curve(d3.curveBundle); // You can choose different curve types
    
    svg.append("path")
        .data([blob])
        .attr("d", curveGenerator)
        .attr("fill", "white")
        .attr("fill-opacity", 0.1)
        .attr("stroke", "white")
        .attr("stroke-width", 2);
    
    svg.append("path")
        .data([arc1trace])
        .attr("d", curveGenerator)
        .attr("stroke","white")
        .attr("stroke-width", 1.5)
        .attr("fill", "none");
    
    svg.append("circle")
        .attr("cx", 150)
        .attr("cy", 150)
        .attr("r", pointRadius)
        .attr("fill", "white");

    svg.append("path")
        .data([arc2trace])
        .attr("d", curveGenerator)
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("fill", "none");

    svg.append("circle")
        .attr("cx", 190)
        .attr("cy", 200)
        .attr("r", pointRadius)
        .attr("fill", "white");

    svg.append("text")
        .attr("x", 100)
        .attr("y", 70)
        .style("text-anchor", "middle")
        .text("X")
        .attr("fill", "white")
        .style("font-family", "Times New Roman, serif")
        .style("font-size", "0.8em");

    svg.append("text")
        .attr("x", 250)
        .attr("y", 100)
        .style("text-anchor", "middle")
        .text("u")
        .attr("fill", "white")
        .style("font-family", "Times New Roman, serif")
        .style("font-size", "0.5em");
    
    svg.append("text")
        .attr("x", 260)
        .attr("y", 160)
        .style("text-anchor", "middle")
        .text("u")
        .attr("fill", "white")
        .style("font-family", "Times New Roman, serif")
        .style("font-size", "0.5em");

    svg.append("defs")
        .append("marker")
        .attr("id", "arrowhead")
        .attr("refX", 5)
        .attr("refY", 2)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", -90)
        .append("path")
        .attr("d", "M 0,0 V 4 L6,2 Z")
        .attr("fill", "white");
    
    svg.append("line")
        .attr("x1", 325)
        .attr("y1", 50)
        .attr("x2", 325)
        .attr("y2", 300)
        .style("stroke", "white")
        .attr("stroke-width", 2)
        .attr("marker-start", "url(#arrowhead");
    
    svg.append("line")
        .attr("x1", 320)
        .attr("y1", 80)
        .attr("x2", 330)
        .attr("y2", 80)
        .style("stroke", "white")
        .attr("stroke-width", 2);

    svg.append("line")
        .attr("x1", 320)
        .attr("y1", 280)
        .attr("x2", 330)
        .attr("y2", 280)
        .style("stroke", "white")
        .attr("stroke-width", 2);
    
    svg.append("text")
        .attr("x", 340)
        .attr("y", 85)
        .style("text-anchor", "middle")
        .text("1")
        .attr("fill", "white")
        .style("font-family", "Times New Roman, serif")
        .style("font-size", "0.5em");

    svg.append("text")
        .attr("x", 340)
        .attr("y", 285)
        .style("text-anchor", "middle")
        .text("0")
        .attr("fill", "white")
        .style("font-family", "Times New Roman, serif")
        .style("font-size", "0.5em");

    svg.append("text")
        .attr("x", 375)
        .attr("y", 50)
        .style("text-anchor", "middle")
        .text("R")
        .attr("fill", "white")
        .style("font-family", "Times New Roman, serif")
        .style("font-size", "0.8em");


            
}