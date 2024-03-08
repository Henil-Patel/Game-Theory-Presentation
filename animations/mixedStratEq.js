var width = 400;
var height = 400;
var bottom = "90%";
var left = "30%";
var setRadius = 150;
var pointRadius = 5;
var offset = 70;

window.mixedStratEq = function(section) {
    var existingSVG = section.querySelector("svg");
    if (existingSVG) {
        existingSVG.remove();
    }
    var xaxisData = [
        { x: 50, y: 350},
        { x: 400, y: 350}
    ];
    var yaxisData = [
        { x: 50, y: 350},
        { x: 50, y: 0}
    ];
    var xticks = [
        { x: 150, y: 350},
        { x: 250, y: 350},
        { x: 350, y: 350}
    ];

    var p1path = [
        {x: 50, y: 350},
        {x: 50, y: 250},
        {x: 350, y: 250},
        {x: 350, y:50}
    ];

    var p2path = [
        {x: 50, y: 350},
        {x: 250, y: 350},
        {x: 250, y: 50},
        {x: 350, y: 50}
    ]

    var lineGenerator = d3.line()
                        .x(d => d.x)
                        .y(d => d.y)
                        .curve(d3.curveLinear);

    var svg2 = d3.select(section)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("position", "relative")
                // .style("border", "0.01em solid white")
                .style("bottom", bottom)
                .style("left", left);

    // xaxis = svg2.append('line')
    //             .attr('x1', xaxisData[0].x)
    //             .attr('y1', xaxisData[0].y)
    //             .attr('x2', xaxisData[0].x)
    //             .attr('y2', xaxisData[0].y)
    //             .attr('stroke', 'white')
    //             .attr('stroke-width', 2);

    // xaxis.transition()
    //         .delay(1000) // Delay before transition starts
    //         .duration(2500) // Transition duration
    //         .attr('x2', xaxisData[1].x)
    //         .attr('y2', xaxisData[1].y);

    // yaxis = svg2.append('line')
    //             .attr('x1', yaxisData[0].x)
    //             .attr('y1', yaxisData[0].y)
    //             .attr('x2', yaxisData[0].x)
    //             .attr('y2', yaxisData[0].y)
    //             .attr('stroke', 'white')
    //             .attr('stroke-width', 2);

    // yaxis.transition()
    //             .delay(1000) // Delay before transition starts
    //             .duration(2500) // Transition duration
    //             .attr('x2', yaxisData[1].x)
    //             .attr('y2', yaxisData[1].y);

    // Add origin
    origin = svg2.append("circle")
                .attr("cx", 50)
                .attr("cy", 350)
                .attr("r", 4)
                .attr("fill", "white");
    // Add x-axis
    var xAxis = d3.axisTop()
                .scale(d3.scaleLinear().domain([0, 200]).range([0, 350]))
                .tickValues([]);
    
    svg2.append("g")
        .attr("transform", "translate(50,350)")
        .call(xAxis)
        .attr("stroke-width", 2);

    // Add y-axis
    var yAxis = d3.axisRight()
                .scale(d3.scaleLinear().domain([200, 0]).range([0, 350]))
                .tickValues([]);
    svg2.append("g")
        .attr("transform", "translate(50, 0)")
        .call(yAxis)
        .attr("stroke-width", 2);

    svg2.attr('class', 'yticks')
        .attr('class', 'xticks')
        .attr('class', 'path1')
        .attr('class', 'path2');

    // Add y-tick line
    svg2.selectAll('.yticks')
        .data([50, 150, 250])
        .enter()
        .append('line')
        .attr('x1', 40)
        .attr('y1', d => d)
        .attr('x2', 60)
        .attr('y2', d => d)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

    // Add x-tick line
    svg2.selectAll('.xticks')
        .data([150, 250, 350])
        .enter()
        .append('line')
        .attr('x1', d => d)
        .attr('y1', 340)
        .attr('x2', d => d)
        .attr('y2', 360)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);

    svg2.append('text')
        .text('1')
        .attr('x', 375)
        .attr('y', 385)
        .style('font-size', '24px')
        // .style('font-style', 'italic')
        .style('font-family', 'Italianno')
        .attr('fill', 'white');

    svg2.append('text')
        .text('2')
        .attr('x', 10)
        .attr('y', 30)
        .style('font-size', '24px')
        // .style('font-style', 'italic')
        .style('font-family', 'Italianno')
        .attr('fill', 'white');
    
    svg2.append('text')
        .text('2')
        .attr('x', 10)
        .attr('y', 30)
        .style('font-size', '24px')
        // .style('font-style', 'italic')
        .style('font-family', 'Italianno')
        .attr('fill', 'white');

    const actionStates = ["drawProbabilities", "highlightEquilibrium1","highlightEquilibrium2","highlightEquilbrium3"];
    let currentState = 0;
    function handleKeyPress(event) {
        if (event.key === 'Enter'){
            const action = actionStates[currentState];
            if (action == "drawProbabilities"){
                svg2.selectAll('.path1')
                    .data([p1path])
                    .enter()
                    .append('path')
                    .attr("d", lineGenerator)
                    .attr("fill", "none")
                    .attr("stroke", "yellow")
                    .attr("stroke-width", 2);
                svg2.selectAll('.path2')
                    .data([p2path])
                    .enter()
                    .append('path')
                    .attr("d", lineGenerator)
                    .attr("fill", "none")
                    .attr("stroke", "green")
                    .attr("stroke-width", 2);
            }
            if (action == "highlightEquilibrium1"){
                svg2.append("circle")
                    .attr("cx", 50)
                    .attr("cy", 350)
                    .attr("r", 6)
                    .attr("fill", "cyan");
                
            }
            if (action == "highlightEquilibrium2"){
                svg2.append("circle")
                    .attr("cx", 350)
                    .attr("cy", 50)
                    .attr("r", 6)
                    .attr("fill", "tomato");
            }
            if (action == "highlightEquilbrium3"){
                svg2.append("circle")
                    .attr("cx", 250)
                    .attr("cy", 250)
                    .attr("r", 6)
                    .attr("fill", "purple");
            }

            currentState = (currentState + 1) % actionStates.length;
        }
    }
    document.addEventListener('keydown', handleKeyPress);
    
}