var width = 400;
var height = 400;
var centerX = width/2;
var centerY = height/2;
var bottom = "90%";
var left = "30%";
var setRadius = 150;
var pointRadius = 5;
let vectorData = [
    {x : centerX, y : centerY},
    {x : 200, y : 200}
];

var svg1 = d3.select("#firms1")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("position", "relative")
            // .style("border", "0.01em solid white")
            .style("bottom", bottom)
            .style("left", left);

var lineGenerator = d3.line()
            .x(d => d.x)
            .y(d => d.y);

svg1.append("circle")
    .attr("cx", centerX) // x-coordinate of the center
    .attr("cy", centerY) // y-coordinate of the center
    .attr("r", setRadius)   // radius
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("id", "set")
    .style("opacity", "100%");

svg1.append("circle")
    .attr("cx", centerX)
    .attr("cy", centerY)
    .attr("r", pointRadius)
    .attr("fill", "red");



function generateRandomPointInCircle() {
    var angle = Math.random() * 2 * Math.PI;
    var randomRadius = Math.random() * setRadius;
    var cX = centerX + randomRadius * Math.cos(angle);
    var cY = centerY + randomRadius * Math.sin(angle);
    return {x: cX, y: cY};
}


function main() {
    for (let i = 0; i < 1; i++) {
        var coord = generateRandomPointInCircle();
        var points = [
            {x: centerX, y: centerY},
            coord
        ];
        var pathString = lineGenerator(points);
        var vectorPath = svg1.append("path")
            .attr("d", pathString)
            .attr("stroke", "white")
            .attr("stroke-width", 5)
            .attr("fill", "none")
            .style("opacity", 1);
        var totalLength = vectorPath.node().getTotalLength();
        vectorPath.style("stroke-dasharray", totalLength + " " + totalLength)
                    .style("stroke-dashoffset", totalLength)
                    .transition()
                    .duration(1000)
                    .delay(i * 500)
                    .ease(d3.easeLinear)
                    .attr("d", lineGenerator([
                                { x: centerX, y: centerY },
                                coord
                        ]))
                    .style("opacity", 1)
                    .style("stroke-dashoffset", 0);
        var head = svg1.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", pointRadius)
            .attr("opacity", 1)
            .attr("fill", "white");
        
        head.transition()
            .duration(1000)
            .delay(i * 500)
            .ease(d3.easeLinear)
            .attr("cx", coord.x)
            .attr("cy", coord.y)
            .attr("r", pointRadius)
            .attr("opacity", 1);
    }
}
main();
// var pointCounter = 0;
// var interval = d3.interval(() => {
//     if (pointCounter < 10) {
//         main();
//     } else {
//         interval.stop();
//     }
// }, 1000);