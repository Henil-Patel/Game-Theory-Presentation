var width = 400;
var height = 400;
var centerX = width/2;
var centerY = height/2;
var bottom = "90%";
var left = "30%";
var setRadius = 150;
var pointRadius = 5;



window.innerProd = function(section) {
    var p = [50, 75];
    // var y = [100, -200];
    var finalX;
    var finalY;
    // var innerProd = p[0] * y[0] + p[1] * y[1];
    // var angle = Math.acos(innerProd / ((Math.sqrt(p[0]**2 + p[1]**2)) * (Math.sqrt(y[0]**2 + y[1]**2))));
    var angle = 5;
    var existingSVG1 = section.querySelector("svg");
        if (existingSVG1) {
            existingSVG1.remove();
        }

    var svg1 = d3.select(section)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("position", "relative")
                // .style("border", "0.01em solid white")
                .style("bottom", bottom)
                .style("left", left);
    
    svg1.append("defs")
                .append("marker")
                .attr("id", "arrowhead")
                .attr("refX", 5)
                .attr("refY", 2)
                .attr("markerWidth", 6)
                .attr("markerHeight", 6)
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M 0,0 V 4 L6,2 Z")
                .attr("fill", "white");


    vectorP = svg1.append("line")
                .attr("x1", centerX)
                .attr("y1", centerY)
                .attr("x2", centerX + p[0])
                .attr("y2", centerY - p[1])
                .style("stroke", "white")
                .attr("stroke-width", 2)
                .attr("marker-end", "url(#arrowhead");

    ptext = svg1.append("text")
                .attr("x", centerX + p[0] + 10)
                .attr("y", centerY - p[1] - 10)
                .style("text-anchor", "middle")
                .style("font-family", "Times New Roman, serif")
                .style("font-size", "0.7em")
                .style("fill", "white")
                .text("p");
    
    ytext = svg1.append("text")
                .style("text-anchor", "middle")
                .style("font-family", "Times New Roman, serif")
                .style("font-size", "0.7em")
                .style("fill", "white")
                // .attr("dy", "-2em")
                .text("y");
    
    alignedvectorY = svg1.append("line")
                .attr("x1", centerX)
                .attr("y1", centerY)
                .attr("x2", centerX + 2*p[0])
                .attr("y2", centerY - 2*p[1])
                .style("stroke", "white")
                .attr("stroke-width", 2)
                .attr("marker-end", "url(#arrowhead");

    alignedvectorY.transition()
            .duration(5000)
            .attrTween("transform", function () {
                return function (t) {
                    var interpolatedAngle = t * angle;
                    var angleInDegrees = 180 / Math.PI * interpolatedAngle;
                    var rotatedX = (centerX) + 194*Math.cos(interpolatedAngle);
                    var rotatedY = (centerY) + 194*Math.sin(interpolatedAngle);
                    ytext.attr("x", rotatedX).attr("y", rotatedY);
                    console.log(rotatedX, rotatedY);
                    if (t === 1) {
                        finalX = rotatedX;
                        finalY = rotatedY;
                    }

                    return "rotate(" + (angleInDegrees) + " " + (centerX) + " " + (centerY) + ")";
                };
            });    




}