import { TwoByTwoGameLeftPane } from './twoPlayerGame.js'
import { GeometryEngine } from './twoPlayerGeometryEngine.js';

export class CoordinationGame extends TwoByTwoGameLeftPane {
    
    drawBase() {

        this.geometry = new GeometryEngine(this.width, this.height, this.margin);

        // Draw Axes
        this.xAxis = this.geometry.xAxis();
        this.yAxis = this.geometry.yAxis();

        // Render Strategies 
        this.strategies = [
            { pos: this.geometry.leftStrategy(0), text: "Concert" },
            { pos: this.geometry.leftStrategy(1), text: "Movie" },
            { pos: this.geometry.topStrategy(0), text: "Concert" },
            { pos: this.geometry.topStrategy(1), text: "Movie" }
        ]

        this.strategyText = this.svg.selectAll(".strategy")
            .data(this.strategies)
            .enter()
            .append("text")
            .attr("x", d => d.pos.x)
            .attr("y", d => d.pos.y)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("fill", "white")
            .style("font-size", 20)
            .style("font-style", "italic")
            .style("font-family", "Italianno")
            .style("opacity", 0)
            .text(d => d.text);

        
        // Draw Labels 
        this.players = [
            { pos: this.geometry.leftPlayer(), text: "1", color: "cyan"},
            { pos: this.geometry.topPlayer(), text: "2", color: "tomato"}
        ];

        this.players = this.svg.selectAll(".players")
            .data(this.players)
            .enter()
            .append("text")
            .attr("class", "players")
            .attr("x", d => d.pos.x)
            .attr("y", d => d.pos.y)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("fill", "white")
            .style("opacity", 0)
            .style("font-size", 25)
            .style("font-style", "italic")
            .style("font-family", "Italianno")
            .text(d => d.text);

        // Draw Payoffs
        this.payoffData = [
            { row: 0, col: 0, p1: 2, p2: 1 }, // movie, movie
            { row: 0, col: 1, p1: 0, p2: 0 }, // movie, concert
            { row: 1, col: 0, p1: 0, p2: 0 }, // concert, movie
            { row: 1, col: 1, p1: 1, p2: 2 }  // concert, concert 
        ];

        this.payoffTexts = this.svg.selectAll(".payoffs")
            .data(this.payoffData)
            .enter()
            .append("text")
            .attr("class", "payoffs")
            .attr("x", d => this.geometry.cellCenter(d.row, d.col).x)
            .attr("y", d => this.geometry.cellCenter(d.row, d.col).y)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("fill", "white")
            .style("opacity", 0)
            .style("font-size", 20)
            .style("font-style", "italic")
            .style("font-family", "Italianno")
            .each(function(d) {
                const t = d3.select(this);
                t.append("tspan").attr("class", "p1").text(d.p1);
                t.append("tspan").text(", ");
                t.append("tspan").attr("class", "p2").text(d.p2);
            });
    }

    update(){

        // Setup normal form
        if (this.state === 1) {
            console.log("Normal form initialized");
            this.xaxis = this.axesDrop(this.xAxis);
            this.yaxis = this.axesDrop(this.yAxis);
            this.fadeIn(this.strategyText, null, 1000, 500);
            this.fadeIn(this.players, null, 1000, 500);
        }

        // Update player colors
        if (this.state === 2) {
            console.log("Coloring players");
            this.fillColor(this.players, 1000);
        }
        
        // Update payoff matrix
        if (this.state === 3) {
            console.log("Displaying payoffs");
            this.fadeIn(this.payoffTexts, null, 1000, 500);
        }

        // Focus player 1
        if (this.state === 4) {
            console.log("Highlight Player 1 strategies only");
            this.isolatePlayer(this.payoffTexts, ".p1", ".p2", true);
        }

        // Underline Best Response for Player 1 in Cyan
        if (this.state === 5) {
            console.log("Underline cols for Player 1");
            this.underlineBest(".p1", [0,1], null, "cyan");
        }

        if (this.state === 6) {
            console.log("Highlight Player 1 strategies only");
            this.isolatePlayer(this.payoffTexts, ".p2", ".p1", false);
        }

        if (this.state === 7) {
            console.log("Underline rows for Player 2");
            this.underlineBest(".p2", null, [0,1], "tomato");
        }

        if (this.state === 8) {
            console.log("Show all");
            this.payoffTexts.selectAll(".p1, .p2")
                    .interrupt()
                    .transition()
                    .duration(1000)
                    .delay(500)
                    .style("opacity", 1);
        }

    }
}