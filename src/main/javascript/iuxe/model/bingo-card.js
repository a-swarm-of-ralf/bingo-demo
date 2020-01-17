import Cell from './bingo-card-song.js'


export default class BingoCard {

        constructor (i, songs, rows, cols) {
            this.cells = _(songs).sampleSize(rows * cols).map((s, i) => new Cell(i, s, rows, cols)).value()
        }
}