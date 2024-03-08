var width = 400;
var height = 400;
var bottom = "90%";
var left = "30%";
var setRadius = 150;
var pointRadius = 5;
var xoffset = 20;
var yoffset = 20;
window.sequentialGames = function(section) {
    var existingSVG = section.querySelector("svg");
    if (existingSVG) {
        existingSVG.remove();
    }
    var xaxisData1 = [
        { x: 200, y: 100},
        { x: 200, y: 400}
    ];

    var xaxisData2 = [
        { x: 380, y: 100},
        { x: 380, y: 400}
    ];

    var xaxisData3 = [
        { x: 560, y: 100},
        { x: 560, y: 400}
    ];

    var yaxisData = [
        { x: 50, y: 250},
        { x: 750, y: 250}
    ]

    var centerX = 185;
    var centerY = 200;
    var payOffPosition = [
        {x : 110, y: 175},
        {x : 110, y: 325},
        {x : 290 - xoffset, y: 175},
        {x : 290 - xoffset, y: 325},
        {x : 470 - xoffset, y: 175},
        {x : 470 - xoffset, y: 325},
        {x : 650 - xoffset, y: 175},
        {x : 650 - xoffset, y: 325}
    ]

    var payOffs = [
        {p1: "2", p2: "1"},
        {p1: "0", p2: "0"},
        {p1: "2", p2: "1"},
        {p1: "1", p2: "2"},
        {p1: "0", p2: "0"},
        {p1: "0", p2: "0"},
        {p1: "0", p2: "0"},
        {p1: "1", p2: "2"}
    ]

    const strategy2 = ["m | m, m | c", "m | m, c | c", "c | m, m | c", "c | m, c | c"];
    const strategy1 = ['m', 'c'];

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

    var svg3 = d3.select(section)
                .append("svg")
                .attr("width", 800)
                .attr("height", 400)
                .style("position", "relative")
                // .style("border", "0.01em solid white")
                .style("bottom", "90%")
                .style("left", "0%");

    xaxis1 = svg3.append('line')
                .attr('x1', xaxisData1[0].x)
                .attr('y1', xaxisData1[0].y)
                .attr('x2', xaxisData1[0].x)
                .attr('y2', xaxisData1[0].y)
                .attr('stroke', 'white')
                .attr('stroke-width', 2);

    xaxis1.transition()
            .delay(1000) // Delay before transition starts
            .duration(2500) // Transition duration
            .attr('x2', xaxisData1[1].x)
            .attr('y2', xaxisData1[1].y);

    xaxis2 = svg3.append('line')
            .attr('x1', xaxisData2[0].x)
            .attr('y1', xaxisData2[0].y)
            .attr('x2', xaxisData2[0].x)
            .attr('y2', xaxisData2[0].y)
            .attr('stroke', 'white')
            .attr('stroke-width', 2);

    xaxis2.transition()
        .delay(1000) // Delay before transition starts
        .duration(2500) // Transition duration
        .attr('x2', xaxisData2[1].x)
        .attr('y2', xaxisData2[1].y);

    xaxis3 = svg3.append('line')
            .attr('x1', xaxisData3[0].x)
            .attr('y1', xaxisData3[0].y)
            .attr('x2', xaxisData3[0].x)
            .attr('y2', xaxisData3[0].y)
            .attr('stroke', 'white')
            .attr('stroke-width', 2);

    xaxis3.transition()
        .delay(1000) // Delay before transition starts
        .duration(2500) // Transition duration
        .attr('x2', xaxisData3[1].x)
        .attr('y2', xaxisData3[1].y);

    yaxis = svg3.append('line')
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
    svg3.attr('class', '.strategy1')
        .attr('class', '.strategy2')
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
    svg3.selectAll('.strategy2')
        .data(strategy2)
        .enter().append('text')
        .attr('x', (d, i) => i * 180 + 65)
        .attr('y', 80)
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
    

    svg3.selectAll('.strategy1')
        .data(strategy1)
        .enter().append('text')
        .attr('x', 30)
        .attr('y', (d, i) => i * 145 + 180)
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

    svg3.selectAll('.p2')
        .data(p2)
        .enter()
        .append('text')
        .text(d=>d)
        .attr('x', 375)
        .attr('y', 35)
        .attr('fill', 'white')
        .style('font-size', '20px')
        .style('font-style', 'italic')
        .style('font-family', 'Italianno')
        .style('opacity', 0) // Start text with opacity 0
        .transition()
        .delay(200) // Delay each text element
        .duration(1000) // Transition duration
        .style('opacity', 1);

    svg3.selectAll('.p1')
        .data(p1)
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', 10)
        .attr('y', 255)
        .attr('fill', 'white')
        .style('font-size', '20px')
        .style('font-style', 'italic')
        .style('font-family', 'Italianno')
        .style('opacity', 0) // Start text with opacity 0
        .transition()
        .delay(200) // Delay each text element
        .duration(1000) // Transition duration
        .style('opacity', 1);

    const actionStates = ["highlightPlayers", "setupPayoff", "showNashEquilibrium"];
    let currentState = 0;
    function handleKeyPress(event) {
            if (event.key === 'Enter' ) {
                const action = actionStates[currentState];
                if (action == "highlightPlayers"){
                    // Add your custom actions here
                    svg3.selectAll('.p2')
                        .data(p2)
                        .enter()
                        .append('text')
                        .text(d=>d)
                        .attr('x', 375)
                        .attr('y', 35)
                        .attr('fill', "tomato")
                        .style('font-size', '20px')
                        .style('font-style', 'italic')
                        .style('font-family', 'Italianno')
                        .style('opacity', 0) // Start text with opacity 0
                        .transition()
                        .delay(200) // Delay each text element
                        .duration(1000) // Transition duration
                        .style('opacity', 1);
                    svg3.selectAll('.p1')
                        .data(p1)
                        .enter()
                        .append('text')
                        .text(d => d)
                        .attr('x', 10)
                        .attr('y', 255)
                        .attr('fill', 'cyan')
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
                    svg3.selectAll('.udd')
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

                if (action == "showNashEquilibrium") {
                    svg3.selectAll('.udd')
                        .data(payOffs)
                        .enter()
                        .append('text')
                        .text(d => d.p1 + " , " + d.p2)
                        .attr('x', (d, i) => payOffPosition[i].x)
                        .attr('y', (d, i) => payOffPosition[i].y)
                        .attr('fill', d => d.p1 == 2 && d.p2 == 1 ? 'green' : 'white' && d.p1 == 1 && d.p2 == 2 ? 'yellow': 'white')
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
