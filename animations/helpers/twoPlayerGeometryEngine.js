export class GeometryEngine {
    constructor(width, height, margin, rows, cols) {
        this.width = width;
        this.height = height;
        this.margin = margin;
        this.rows = rows;
        this.cols = cols;

        this.compute();
    }
    compute() {
        this.left = this.margin;
        this.right = this.width - this.margin;
        this.top = this.margin;
        this.bottom = this.height - this.margin;

        this.midX = (this.left + this.right) / 2;
        this.midY = (this.top + this.bottom) / 2;

        this.cellWidth = (this.right - this.left) / this.cols;
        this.cellHeight = (this.bottom - this.top) / this.rows;
    }

    xAxis() {
        return [
            { x: this.left, y: this.midY },
            { x: this.right, y: this.midY }
        ];
    }

    yAxis() {
        return [
            { x: this.midX, y: this.top },
            { x: this.midX, y: this.bottom }
        ];
    }

    cellCenter(row, col) {
        return {
            x: this.left + this.cellWidth * (col + 0.5),
            y: this.top + this.cellHeight * (row + 0.5)
        };
    }

    leftStrategy(row) {
        const c = this.cellCenter(row, 0);
        return { x : this.left - 20, y: c.y };
    }

    topStrategy(col) {
        const c = this.cellCenter(0, col);
        return { x: c.x, y : this.top - 10};
    }

    leftPlayer() {
        return { x: this.left - 20, y: this.midY }
    }

    topPlayer() {
        return { x: this.midX, y: this.top - 20 }
    }
}