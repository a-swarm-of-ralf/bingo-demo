import Card from './bingo-card.js'


export default class Bingo {

    constructor () {
        this.cards = []
    }

    build (songs, numberOfCards = 6, rows = 3, cols = 3) {
        this.cards = _(numberOfCards).range().range().map(i => new Card(i, songs, rows, cols)).value()
    }

    


} 