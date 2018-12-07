export default {
    getDeck : function() {
        let suits = [
            {
                name : "hearts",
                id : 0
            }, 
            {
                name : "diamonds",
                id : 1
            },
            { 
                name : "clubs",
                id : 2
            }, 
            { 
                name : "spades",
                id : 3
            }
        ];
        let ranks = [1,2,3,4,5,6,7,8,9,10,11,12,13];
        let deck = [];
        for (let suit of suits) {
            for (let rank of ranks) {
                let id = "(" + suit.id + ":" + rank + ")";
                let card = {
                    rank : rank,
                    suit : suit.name,
                    cardId : id
                };
                console.log(card);
                deck.push(card);
            }
        }
        return deck;
    }
}