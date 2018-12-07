<template>
    <div class="match-game">
        <div v-for = "card in gameCards" class="card-div">
            <component 
                
                :is = "cardComponent" 
                :key = "card.key"
                :card-data = "card"
                :class = "card.done ? 'done' : ''"
                @event_card_click = "handleCardClick"
            >
            </component>
        </div>
    </div>
</template>
<script>

export default {
    components : {

    },
    props : {
        gameCards : {
            type : "array",
            default : []
        },
        cardComponent : {
            type : "opject",
            default : null
        }
    },
    data () {
        return {
            flipOne : undefined,
            flipTwo : undefined,
            status : "",
            started : false
        }
    },
    computed : {
        isTwoCardsFlipped () {
            return (this.flipTwo && this.flipOne);

        },
        cardsRemaining () {
            let numRemaining = 0;
            for (let i = 0; i < this.gameCards.length; i++) {
                if (!this.gameCards[i].done) {
                    numRemaining++;
                }
            }
            return numRemaining;
        }
    },
    watch : {
        isTwoCardsFlipped () {
            if (this.isTwoCardsFlipped) {
                let self = this;
                let match = self.checkMatch();
                setTimeout(function() {
                    if (!match) {
                        self.cardsBackOver();
                    } else {
                        //alert("match");
                        self.handleMatch();
                    }
                },1000);
            }
        },
        cardsRemaining () {
            if (this.started && this.cardsRemaining == 0) {
                this.$emit("event_game_over");
            }
        }
    },
    methods : {
        cardsBackOver : function() {
            this.getCardByKey(this.flipOne).isRevealed = false;
            this.flipOne = undefined;
            this.getCardByKey(this.flipTwo).isRevealed = false;
            this.flipTwo = undefined;
        },
        handleMatch : function() {
            this.getCardByKey(this.flipOne).done = true;
            this.flipOne = undefined;
            this.getCardByKey(this.flipTwo).done = true;
            this.flipTwo = undefined;
            this.addStatus("match!");
        },
        addStatus : function(str) {
            let self = this;
            self.status = str;
            setTimeout(function(){
                self.status = "";
            },2000);

        },
        getCardByKey : function(key) {
            debugger;
            for (let i = 0; i < this.gameCards.length; i++) {

                if (this.gameCards[i].key == key) {
                    return this.gameCards[i];
                }
            }
            return null;
        },
        handleCardClick : function(key) {
            debugger;
            this.started = true;
            let card = this.getCardByKey(key);
            if (this.flipTwo && this.flipOne) {
                return;  //do nothing
            }

            if (!card.isRevealed) {
                if (typeof this.flipOne == "undefined") {
                    this.flipOne = card.key;
                    card.isRevealed = true;
                } else {
                    if (card.key == this.flipOne) {
                        //do nothing
                    } else {
                        this.flipTwo = card.key;
                        card.isRevealed = true;
                    }
                }
            } else {
                //do nothing
            }
        },
        checkMatch : function() {
            let match =
                this.getCardByKey(this.flipOne).matchId ==
                this.getCardByKey(this.flipTwo).matchId;
            return match;
        }

    },
}
</script>
<style lang="scss">
    .match-game {

        .alert.alert-info {
            padding-top: 0px;
            padding-bottom: 0px;
        }
        .done {
            visibility : hidden;
        }
        .card-div {
            display : inline-block;
            margin-right: 5px;
            margin-bottom: 5px;
        }
    }
</style>