import { ComputeEquilibria } from './twoPlayerGameEquilibria.js'; 
import { GeometryEngine } from './helpers/twoPlayerGeometryEngine.js';

export class NByNGame {

    constructor(section, gameData) {
        this.section = section;
        this.gameData = gameData;
        this.rows = gameData.rows.length;
        this.cols = gameData.cols.length;

        this.state = 0;

        this.width = 400;
        this.height = 400;
        this.margin = 50;

        this.svg = null;
        this.init();
    }

    init() {
        d3.select(this.section).select("svg").remove();
        
        // build SVG once
        this.svg = d3.select(this.section)
                     .append("svg")
                     .attr("width", this.width)
                     .attr("height", this.height)
                     .style("position", "relative")
                    //  .style("border", "0.01em solid white")
                     .style("bottom", "675px")
                     .style("left", "300px");

        // draw static elements
        this.drawBase();
    }

    drawBase() {

        // define geometry engine
        this.geometry = new GeometryEngine(this.width, this.height, this.margin);

        // define x and y axes
        this.xAxis = this.geometry.xAxis();
        this.yAxis = this.geometry.yAxis();

        // write player labels 
        const playerData = this.gameData.players.map((p, i) => {
            return {
                label: p,
                pos: i === 0
                    ? this.geometry.leftPlayer()
                    : this.geometry.topPlayer()
            };
        });

        this.players = this.svg.selectAll(".players")
            .data(playerData)
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
            .text(d => d.label);
        
        // write strategies 
        this.columnPlayers = this.gameData.cols.map((label, j) => {
            return {
                label: label,
                pos: this.geometry.topStrategy(j)
            };
        });

        this.rowPlayers = this.gameData.rows.map((label, i) => {
            return {
                label: label,
                pos: this.geometry.leftStrategy(i)
            };
        });

        const strategyData = [...this.rowPlayers,...this.columnPlayers];

        this.strategyText = this.svg.selectAll(".strategy")
            .data(strategyData)
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
            .text(d => d.label);

        // write payoffs
        const payoffData = [];
        this.gameData.payoffs.forEach((row, i) => {
            row.forEach((payoff, j) => {
                payoffData.push({
                    row: i,
                    col: j,
                    p1: payoff.p1,
                    p2: payoff.p2 
                });
            });
        });

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

    next() {
        this.state++;
        this.update();
    }

    update() {
        // change visuals based on this.state
    }

    reset() {
        this.state = 0;
        // this.svg.remove();
        this.init();
    }

    fadeIn(selection, player, duration = 1000, delay = 500) {

        const target = player ? selection.selectAll(player) : selection;

        target
            .style("opacity", 0)
            .transition()
            .duration(duration)
            .delay(delay)
            .style("opacity", 1);
    }

    partialFadeIn(selection, player, duration = 1000, delay = 500) {

        const target = player ? selection.selectAll(player) : selection;

        target
            .style("opacity", 0.2)
            .transition()
            .duration(duration)
            .delay(delay)
            .style("opacity", 1);
    }

    partialFadeOut(selection, player, duration = 1000, delay = 500) {
        
        const target = player ? selection.selectAll(player) : selection;

        target
            .style("opacity", 1)
            .transition()
            .duration(duration)
            .delay(delay)
            .style("opacity", 0.2);
    }

    fillColor(selection, duration = 500) {
        selection.transition()
                .duration(duration)
                .attr("fill", d => d.color);
    }

    axesDrop(points){
        return this.svg.append("line")
                        .attr("x1", points[0].x)
                        .attr("y1", points[0].y)
                        .attr("x2", points[0].x)
                        .attr("y2", points[0].y)
                        .attr("stroke", "white")
                        .attr("stroke-width", 2)
                        .transition()
                        .duration(2000)
                        .delay(500)
                        .attr("x2", points[1].x)
                        .attr("y2", points[1].y);
    }

    isolatePlayer(selection, mainPlayer, isolatedPlayer, enterEvent) {
        if (!enterEvent) {
            this.partialFadeIn(selection, mainPlayer, 1000, 500);
        }
        this.partialFadeOut(selection, isolatedPlayer, 1000, 500);
    }

    underlineBest(player, column, row, color){
        this.equilibriumCompute = new ComputeEquilibria(this.payoffData);
        if (column) {
            column.forEach(element => {
                this.payoffTexts
                .selectAll(player)
                .filter(d => this.equilibriumCompute.getBestInColumn(element).has(`${d.row}-${d.col}`))
                .transition()
                .delay(1000)
                .duration(500)
                .style("text-decoration", "underline")
                .style("fill", color);
            });
        }
        if (row) {
            row.forEach(element => {
                this.payoffTexts
                .selectAll(player)
                .filter(d => this.equilibriumCompute.getBestInRow(element).has(`${d.row}-${d.col}`))
                .transition()
                .delay(1000)
                .duration(500)
                .style("text-decoration", "underline")
                .style("fill", color);
            });
        }
        
    }
    
}