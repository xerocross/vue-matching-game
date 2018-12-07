<template>
    <div class="cross-matching-game">
        <div 
            v-if = "currentState == 'setup'"
        >   
            <match-game-settings @event_submit = "submitSettings" />
        </div>
        <div 
            v-if = "currentState == 'playing'" 
            class="card-grid">
            <button 
                class="btn btn-primary reset-button"
                @click = "reset ">reset</button>
            <match-game 
                :card-component = "cardComponent"
                :game-cards = "gameCards"
                @event_game_over = "handleGameOver"
            >
            </match-game>
        </div>
    </div>
</template>
<script>
import MatchGameSettings from "./match-game-settings.vue";
import ArrayHelpers from "../helpers/array-helpers.js";
import PlayingCardsHelper from "../helpers/playing-cards.js";
import PlayingCard from "./playing-card.vue";
import MatchGame from "./match-game.vue";

export default {
    components : {
        MatchGameSettings,
        MatchGame
    },
    data () {
        return {
            currentState : "setup",
            gameCards : [],
            status : "",
            sizeOfHand : 13,
            cardComponent : PlayingCard
        }
    },
    methods : {
        submitSettings : function(data) {
            this.gameSize = data.gameSize;
            this.currentState = "playing";
            this.generateGameCards();
        },
        handleGameOver : function() {
            alert("Game Complete");
            this.currentState = "setup";

        },
        reset : function() {
            this.currentState = "setup";
            this.gameCards = [];
        },
        addStatus : function(str) {
            let self = this;
            self.status = str;
            setTimeout(function(){
                self.status = "";
            },2000);

        },
        generateGameCards : function() {
            let deck = PlayingCardsHelper.getDeck();
            ArrayHelpers.shuffle(deck);
            this.gameCards = [];
            let drawSize = Math.floor(this.gameSize/2);
            for (let i = 0; i < drawSize; i++) {
                let cardLeft = deck[i];
                let cardRight = JSON.parse(JSON.stringify(cardLeft));
                cardLeft.matchId = cardLeft.cardId;
                cardLeft.key = cardLeft.matchId + "left";
                cardRight.matchId = cardRight.cardId;
                cardRight.key = cardRight.matchId + "right";
                this.gameCards.push(cardLeft);
                this.gameCards.push(cardRight);
            }
            ArrayHelpers.shuffleReactive(this, this.gameCards);
            for (let i = 0; i < this.gameCards.length; i++) {
                this.$set(this.gameCards[i], "isRevealed", false);
                this.$set(this.gameCards[i], "done", false);
            }

        },
    },
}
</script>
<style lang="scss">
    .cross-matching-game {
        .reset-button {
            margin-bottom:10px;
        }
    }
</style>