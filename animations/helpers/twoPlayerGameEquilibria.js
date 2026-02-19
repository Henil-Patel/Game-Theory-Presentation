export class ComputeEquilibria{

    constructor(payoffData){
        this.payoffData = payoffData;
    }

    // Pure Strategy - Discrete
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
        const bestSet = new Set(best.map(d => `${d.row}-${d.col}`));
        return bestSet;
    }

    // Mixed Strategy - Discrete
    // getMixedStrategyIntervals(player, opponentProbability) {
        
    // }


}