var width = 400;
var height = 400;
var bottom = "90%";
var left = "30%";
window.extensiveForm = function(section) {
    var existingSVG = section.querySelector("svg");
    if (existingSVG) {
        existingSVG.remove();
    }
    // const 
    var svg3 = d3.select(section)
                .append("svg")
                .attr("width", 800)
                .attr("height", 400)
                .style("position", "relative")
                .style("border", "0.01em solid white")
                .style("bottom", "90%")
                .style("left", "0%");

    svg3.attr("class", "p1");

    const actionStates = ["showFirstPlayerStrategies"];
    let currentState = 0;
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            const action = actionStates[currentState];
            if (action == "showFirstPlayerStrategies") {                    
                svg3.selectAll(".p1")
                    .data(["1"])
                    .enter()
                    .append('text')
                    .attr("x", 400)
                    .attr("y", 200)
                    .text(d => d)
                    .attr('fill', "white")
                    .style('font-size', '20px')
                    .style('font-style', 'italic')
                    .style('font-family', 'Italianno')
                    .style('opacity', 0) // Start text with opacity 0
                    .transition()
                    .delay(200) // Delay each text element
                    .duration(1000) // Transition duration
                    .style('opacity', 1);

            }
            currentState = (currentState + 1) % actionStates.length;
        }
    }
    document.addEventListener('keydown', handleKeyPress);

}