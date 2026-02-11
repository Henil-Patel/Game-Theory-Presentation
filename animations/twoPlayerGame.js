export class TwoByTwoGameLeftPane {

    constructor(section) {
        this.section = section;
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
        // axes, grid, labels that never change
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


    bestResponses(player) {
        return this.payoffData.filter( d => {
            if (player === 1) {
                const colPayoffs = this.payoffData.filter(dd => dd.col === d.col);
                const max = Math.max(...colPayoffs.map(dd => dd.p1));
                return d.p1 === max;
            } else {
                const rowPayoffs = this.payoffData.filter(dd => dd.row === d.row);
                const max = Math.max(...rowPayoffs.map(dd => dd.p2));
                return d.p2 === max;
            }
        });
    }

    getBestInColumn(colIndex) {
        const columnData = this.payoffData.filter(d => d.col === colIndex);
        const max = Math.max(...columnData.map(d => d.p1));
        const best = columnData.filter(d => d.p1 === max);
        const bestSet = new Set(best.map(d => `${d.row}-${d.col}`));
        return bestSet;
    }

    getBestInRow(rowIndex) {
        const rowData = this.payoffData.filter(d => d.row === rowIndex);
        const max = Math.max(...rowData.map(d => d.p2));
        const best = rowData.filter(d => d.p2 === max);
        const bestSet = new Set(best.map(d => `${d.row}-${d.col}`))
        return bestSet;
    }

    underlineBest(player, column, row, color){
        if (column) {
            column.forEach(element => {
                this.payoffTexts
                .selectAll(player)
                .filter(d => this.getBestInColumn(element).has(`${d.row}-${d.col}`))
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
                .filter(d => this.getBestInRow(element).has(`${d.row}-${d.col}`))
                .transition()
                .delay(1000)
                .duration(500)
                .style("text-decoration", "underline")
                .style("fill", color);
            });
        }
        
    }
    
}