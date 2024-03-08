var width = 400;
var height = 400;
var bottom = "90%";
var left = "30%";
window.extensiveForm = function(section) {
    var existingSVG = section.querySelector("svg");
    if (existingSVG) {
        existingSVG.remove();
    }

    movie1Data = [
        {x: 200, y: 200},
        {x: 300, y: 300}
    ];

    concert1Data = [
        {x: 200, y: 200},
        {x: 300, y: 100}
    ];

    movieconcert2Data = [
        {x: 300, y: 300},
        {x: 450, y: 350}
    ];

    moviemovie2Data = [
        {x: 300, y: 300},
        {x: 450, y: 250}
    ];
    concertmovie2Data = [
        {x: 300, y: 100},
        {x: 450, y: 50}
    ];
    concertconcert2Data = [
        {x: 300, y:100},
        {x: 450, y:150}
    ];

    // const 
    var svg3 = d3.select(section)
                .append("svg")
                .attr("width", 800)
                .attr("height", 400)
                .style("position", "relative")
                .style("border", "0.01em solid white")
                .style("bottom", "90%")
                .style("left", "0%");

    svg3.attr("class", "p1")
        .attr("class", "p1movie")
        .attr("class", "p1concert")
        .attr("class", "p2")
        .attr("class", "p2moviemovie")
        .attr("class", "p2movieconcert")
        .attr("class", "p2concertmovie")
        .attr("class", "p2concertconcert");


    const actionStates = ["showFirstPlayerStrategies", "showSecondPlayerStrategies", "showPayoffs"];
    let currentState = 0;
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            const action = actionStates[currentState];
            if (action == "showFirstPlayerStrategies") {                    
                svg3.selectAll(".p1")
                    .data(["1"])
                    .enter()
                    .append('text')
                    .attr("x", 180)
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
                svg3.selectAll(".p1movie")
                    .data(["movie"])
                    .enter()
                    .append('text')
                    .attr("x", 175)
                    .attr("y", 275)
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
                svg3.selectAll(".p1concert")
                    .data(["concert"])
                    .enter()
                    .append('text')
                    .attr("x", 175)
                    .attr("y", 125)
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
                movie1 = svg3.append('line')
                    .attr('x1', movie1Data[0].x)
                    .attr('y1', movie1Data[0].y)
                    .attr('x2', movie1Data[0].x)
                    .attr('y2', movie1Data[0].y)
                    .attr('stroke', 'white')
                    .attr('stroke-width', 2);

                movie1.transition()
                            .delay(1000) // Delay before transition starts
                            .duration(2500) // Transition duration
                            .attr('x2', movie1Data[1].x)
                            .attr('y2', movie1Data[1].y);

                concert1 = svg3.append('line')
                            .attr('x1', concert1Data[0].x)
                            .attr('y1', concert1Data[0].y)
                            .attr('x2', concert1Data[0].x)
                            .attr('y2', concert1Data[0].y)
                            .attr('stroke', 'white')
                            .attr('stroke-width', 2);

                concert1.transition()
                            .delay(1000) // Delay before transition starts
                            .duration(2500) // Transition duration
                            .attr('x2', concert1Data[1].x)
                            .attr('y2', concert1Data[1].y);

            }

            if (action == "showSecondPlayerStrategies") {
                svg3.selectAll(".p2")
                    .data(["2"])
                    .enter()
                    .append('text')
                    .attr("x", 280)
                    .attr("y", 320)
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
                svg3.selectAll(".p2")
                    .data(["2"])
                    .enter()
                    .append('text')
                    .attr("x", 280)
                    .attr("y", 90)
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

                svg3.selectAll(".p2moviemovie")
                    .data(["movie"])
                    .enter()
                    .append('text')
                    .attr("x", 350)
                    .attr("y", 350)
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
                svg3.selectAll(".p2movieconcert")
                    .data(["concert"])
                    .enter()
                    .append('text')
                    .attr("x", 350)
                    .attr("y", 250)
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
                svg3.selectAll(".p2concertmovie")
                    .data(["movie"])
                    .enter()
                    .append('text')
                    .attr("x", 350)
                    .attr("y", 150)
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
                svg3.selectAll(".p2concertconcert")
                    .data(["concert"])
                    .enter()
                    .append('text')
                    .attr("x", 350)
                    .attr("y", 50)
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

                movieconcert2 = svg3.append('line')
                    .attr('x1', movieconcert2Data[0].x)
                    .attr('y1', movieconcert2Data[0].y)
                    .attr('x2', movieconcert2Data[0].x)
                    .attr('y2', movieconcert2Data[0].y)
                    .attr('stroke', 'white')
                    .attr('stroke-width', 2);

                movieconcert2.transition()
                            .delay(1000) // Delay before transition starts
                            .duration(2500) // Transition duration
                            .attr('x2', movieconcert2Data[1].x)
                            .attr('y2', movieconcert2Data[1].y);
                
                moviemovie2 = svg3.append('line')
                            .attr('x1', moviemovie2Data[0].x)
                            .attr('y1', moviemovie2Data[0].y)
                            .attr('x2', moviemovie2Data[0].x)
                            .attr('y2', moviemovie2Data[0].y)
                            .attr('stroke', 'white')
                            .attr('stroke-width', 2);
        
                moviemovie2.transition()
                                    .delay(1000) // Delay before transition starts
                                    .duration(2500) // Transition duration
                                    .attr('x2', moviemovie2Data[1].x)
                                    .attr('y2', moviemovie2Data[1].y);
                concertmovie2 = svg3.append('line')
                                    .attr('x1', concertmovie2Data[0].x)
                                    .attr('y1', concertmovie2Data[0].y)
                                    .attr('x2', concertmovie2Data[0].x)
                                    .attr('y2', concertmovie2Data[0].y)
                                    .attr('stroke', 'white')
                                    .attr('stroke-width', 2);
                
                concertmovie2.transition()
                            .delay(1000) // Delay before transition starts
                            .duration(2500) // Transition duration
                            .attr('x2', concertmovie2Data[1].x)
                            .attr('y2', concertmovie2Data[1].y);

                concertconcert2 = svg3.append('line')
                                .attr('x1', concertconcert2Data[0].x)
                                .attr('y1', concertconcert2Data[0].y)
                                .attr('x2', concertconcert2Data[0].x)
                                .attr('y2', concertconcert2Data[0].y)
                                .attr('stroke', 'white')
                                .attr('stroke-width', 2);

                concertconcert2.transition()
                        .delay(1000) // Delay before transition starts
                        .duration(2500) // Transition duration
                        .attr('x2', concertconcert2Data[1].x)
                        .attr('y2', concertconcert2Data[1].y);
            }
            if ()
            currentState = (currentState + 1) % actionStates.length;
        }
    }
    document.addEventListener('keydown', handleKeyPress);

}