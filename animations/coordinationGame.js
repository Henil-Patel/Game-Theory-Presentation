var width = 400;
var height = 400;
var bottom = "90%";
var left = "30%";
var setRadius = 150;
var pointRadius = 5;
var offset = 70;
window.coordinationGame = function(section) {
    var existingSVG = section.querySelector("svg");
    if (existingSVG) {
        existingSVG.remove();
    }
    var xaxisData = [
        { x: 200, y: 50},
        { x: 200, y: 350}
    ];
    var yaxisData = [
        { x: 50, y: 200},
        { x: 350, y: 200}
    ]

    var centerX = 185;
    var centerY = 200;
    var payOffPosition = [
        { x : centerX + offset + 10, y: centerY + offset},       // defect , defect
        { x : centerX - offset -10, y: centerY + offset},       // defect, silent
        { x : centerX + offset + 10, y: centerY - offset},       // silent, defect
        { x : centerX - offset - 10, y: centerY - offset}        // silent, silent
    ]

    var payOffs = [
        {p1: "2", p2: "1"},
        {p1: "0", p2: "0"},
        {p1: "0", p2: "0"},
        {p1: "1", p2: "2"}
    ]

    const strategy = ['movies', 'concert'];
    const p1 = ['1'];
    const p2 = ['2'];

    var lineData1 = [
        {x: 100, y: 100},
        {x: 100, y: 285},
        {x: 120, y: 285},
        {x: 120, y: 100},
        {x: 100, y: 100}
    ];

    var lineData2 = lineData1.map(d => ({x: d.x + 160, y: d.y}));
    var lineData3 = lineData1.map(d => ({x: d.y + 25, y: d.x + 12}));
    var lineData4 = lineData3.map(d => ({x: d.x, y: d.y + 140}))
    console.log(lineData1);
    console.log(lineData2)

    var lineGenerator = d3.line()
                            .x(d => d.x)
                            .y(d => d.y)
                            .curve(d3.curveLinear);

    var svg1 = d3.select(section)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("position", "relative")
                // .style("border", "0.01em solid white")
                .style("bottom", bottom)
                .style("left", left);

    xaxis = svg1.append('line')
                .attr('x1', xaxisData[0].x)
                .attr('y1', xaxisData[0].y)
                .attr('x2', xaxisData[0].x)
                .attr('y2', xaxisData[0].y)
                .attr('stroke', 'white')
                .attr('stroke-width', 2);

    xaxis.transition()
            .delay(1000) // Delay before transition starts
            .duration(2500) // Transition duration
            .attr('x2', xaxisData[1].x)
            .attr('y2', xaxisData[1].y);

    yaxis = svg1.append('line')
                .attr('x1', yaxisData[0].x)
                .attr('y1', yaxisData[0].y)
                .attr('x2', yaxisData[0].x)
                .attr('y2', yaxisData[0].y)
                .attr('stroke', 'white')
                .attr('stroke-width', 2);

    yaxis.transition()
                .delay(1000) // Delay before transition starts
                .duration(2500) // Transition duration
                .attr('x2', yaxisData[1].x)
                .attr('y2', yaxisData[1].y);
    
     // Append text elements to SVG
    svg1.attr('class', 'strategy')
        .attr('class', 'p1')
        .attr('class', 'p2')
        .attr('class', 'uss')
        .attr('class', 'uds')
        .attr('class', 'usd')
        .attr('class', 'udd')
        .attr('class', 'dom1')
        .attr('class', 'dom2')
        .attr('class', 'dom3')
        .attr('class', 'dom4');


    // Transition text to appear with opacity 1
    svg1.selectAll('.strategy')
        .data(strategy)
        .enter().append('text')
        .attr('x', (d, i) => i * 150 + 100)
        .attr('y', 35)
        .text(d => d)
        .attr('fill', 'white')
        .style('font-size', '20px')
        .style('font-style', 'italic')
        .style('font-family', 'Italianno')
        .style('opacity', 0) // Start text with opacity 0
        .transition()
        .delay((d, i) => i * 200) // Delay each text element
        .duration(1000) // Transition duration
        .style('opacity', 1);
    

    svg1.selectAll('.strategy')
        .data(strategy)
        .enter().append('text')
        .attr('x', 0)
        .attr('y', (d, i) => i * 145 + 130)
        .text(d => d)
        .attr('fill', 'white')
        .style('font-size', '20px')
        .style('font-style', 'italic')
        .style('font-family', 'Italianno')
        .style('opacity', 0) // Start text with opacity 0
        .transition()
        .delay((d, i) => i * 200) // Delay each text element
        .duration(1000) // Transition duration
        .style('opacity', 1);

    svg1.selectAll('.p2')
        .data(p2)
        .enter()
        .append('text')
        .text(d=>d)
        .attr('x', 190)
        .attr('y', 20)
        .attr('fill', 'white')
        .style('font-size', '20px')
        .style('font-style', 'italic')
        .style('font-family', 'Italianno')
        .style('opacity', 0) // Start text with opacity 0
        .transition()
        .delay(200) // Delay each text element
        .duration(1000) // Transition duration
        .style('opacity', 1);

    svg1.selectAll('.p1')
        .data(p1)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', 10)
        .attr('y', 205)
        .attr('fill', 'white')
        .style('font-size', '20px')
        .style('font-style', 'italic')
        .style('font-family', 'Italianno')
        .style('opacity', 0) // Start text with opacity 0
        .transition()
        .delay(200) // Delay each text element
        .duration(1000) // Transition duration
        .style('opacity', 1);

    const actionStates = ["highlightPlayers", "setupPayoff", "compare1", "compare2", "compare3", "compare4", "showNashEquilibrium"];
    let currentState = 0;
    function handleKeyPress(event) {
            if (event.key === 'Enter' ) {
                const action = actionStates[currentState];
                if (action == "highlightPlayers"){
                    // Add your custom actions here
                    svg1.selectAll('.p2')
                        .data(p2)
                        .enter()
                        .append('text')
                        .text(d=>d)
                        .attr('x', 190)
                        .attr('y', 20)
                        .attr('fill', 'red')
                        .style('font-size', '20px')
                        .style('font-style', 'italic')
                        .style('font-family', 'Italianno')
                        .style('opacity', 0) // Start text with opacity 0
                        .transition()
                        .delay(200) // Delay each text element
                        .duration(1000) // Transition duration
                        .style('opacity', 1);
                    svg1.selectAll('.p1')
                        .data(p1)
                        .enter()
                        .append('text')
                        .text(d => d)
                        .attr('x', 10)
                        .attr('y', 205)
                        .attr('fill', 'blue')
                        .style('font-size', '20px')
                        .style('font-style', 'italic')
                        .style('font-family', 'Italianno')
                        .style('opacity', 0) // Start text with opacity 0
                        .transition()
                        .delay(200) // Delay each text element
                        .duration(1000) // Transition duration
                        .style('opacity', 1);
                }
                if (action == "setupPayoff") {
                    svg1.selectAll('.udd')
                        .data(payOffs)
                        .enter()
                        .append('text')
                        .text(d => d.p1 + " , " + d.p2)
                        .attr('x', (d, i) => payOffPosition[i].x)
                        .attr('y', (d, i) => payOffPosition[i].y)
                        .attr('fill', 'white')
                        .style('font-size', '20px')
                        .style('font-style', 'italic')
                        .style('font-family', 'Italianno')
                        .style('opacity', 0) // Start text with opacity 0
                        .transition()
                        .delay(200) // Delay each text element
                        .duration(1000) // Transition duration
                        .style('opacity', 1);
                }
                if (action == "compare1") {
                    dom1 = svg1.selectAll('.dom1')
                            .data([lineData1])
                            .enter()
                            .append("path")
                            .attr("d", lineGenerator)
                            .attr("fill", "white")
                            .attr("fill-opacity", 0.1)
                            .attr("stroke", "white")
                            .attr("stroke-width", 0);
                }

                if (action == "compare2") {
                    dom1.remove();

                    dom2 = svg1.selectAll('.dom2')
                            .data([lineData2])
                            .enter()
                            .append("path")
                            .attr("d", lineGenerator)
                            .attr("fill", "white")
                            .attr("fill-opacity", 0.1)
                            .attr("stroke", "white")
                            .attr("stroke-width", 0);
                }

                if (action == "compare3") {
                    dom2.remove();

                    dom3 = svg1.selectAll('.dom3')
                            .data([lineData3])
                            .enter()
                            .append("path")
                            .attr("d", lineGenerator)
                            .attr("fill", "white")
                            .attr("fill-opacity", 0.1)
                            .attr("stroke", "white")
                            .attr("stroke-width", 0);
                }

                if (action == "compare4") {
                    dom3.remove();

                    dom4 = svg1.selectAll('.dom4')
                            .data([lineData4])
                            .enter()
                            .append("path")
                            .attr("d", lineGenerator)
                            .attr("fill", "white")
                            .attr("fill-opacity", 0.1)
                            .attr("stroke", "white")
                            .attr("stroke-width", 0);
                }

                if (action == "showNashEquilibrium") {
                    dom4.remove();

                    svg1.selectAll('.udd')
                        .data(payOffs)
                        .enter()
                        .append('text')
                        .text(d => d.p1 + " , " + d.p2)
                        .attr('x', (d, i) => payOffPosition[i].x)
                        .attr('y', (d, i) => payOffPosition[i].y)
                        .attr('fill', d => d.p1 == 2 && d.p2 == 1 || d.p1 == 1 && d.p2 == 2 ? 'green': 'white')
                        .style('font-size', '20px')
                        .style('font-style', 'italic')
                        .style('font-family', 'Italianno')
                        .style('opacity', 0) // Start text with opacity 0
                        // .style('color', d=> d.p1 == 1 || d.p2 == 1 ? 'green': 'white')
                        .transition()
                        .delay(200) // Delay each text element
                        .duration(1000) // Transition duration
                        .style('opacity', 1);
                }
                currentState = (currentState + 1) % actionStates.length;
            }
    }

    // Add event listener for keydown events
    document.addEventListener('keydown', handleKeyPress);

}
