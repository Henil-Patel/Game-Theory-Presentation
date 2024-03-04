var width = 400;
var height = 400;
var bottom = "90%";
var left = "30%";
var originX = width/2;
var originY = height/2

let vectorData = [
    {x : originX, y : originY},
    {x : 200, y : 200}
];

var svg2 = d3.select("#firms2")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("position", "relative")
            // .style("border", "2px solid white")
            .style("bottom", bottom)
            .style("left", left);

var lineGenerator = d3.line()
                        .x(d => d.x)
                        .y(d => d.y);

var vectorPath = svg2.append("path")
                        .attr("d", lineGenerator(vectorData))
                        .attr("stroke", "white")
                        .attr("stroke-width", 2)
                        .attr("fill", "none");
                        
var head = svg2.append("circle")
            .attr("cx", vectorData[1].x)
            .attr("cy", vectorData[1].y)
            .attr("r", 5)
            .attr("fill", "white");

var tail = svg2.append("circle")
            .attr("cx", vectorData[0].x)
            .attr("cy", vectorData[0].y)
            .attr("r", 5)
            .attr("fill", "white");

function updateVector() {
    var lambda = Math.random()*200 // random number between 0 and 1
    var resizedVectorData = vectorData.map((d, i) => {
        if (i === 1) {
            return {
                x : lambda,
                y : lambda
            };
        }
        return d;
    });
    console.log(lambda)
    console.log(resizedVectorData)

    vectorPath.transition()
                .duration(2500)
                .ease(d3.easeLinear)
                .attr("d", lineGenerator(resizedVectorData));
                
    head.transition()
        .duration(2500)
        .ease(d3.easeLinear)
        .attr("cx", resizedVectorData[1].x)
        .attr("cy", resizedVectorData[1].y);
    vectorPath.exit().remove();
}

// var pointCounter = 0;
// d3.interval(() => {
//     if (pointCounter < 1) {
//         console.log(pointCounter);
//         updateVector();
//         pointCounter++;
//     } else {
//         interval.stop();
//     }
// }, 1000);
updateVector();
