<template>
    <div 
        :class="cardData.isRevealed ? '' : 'back'" 
        class="playing-card"
        @click = "handleCardClick"
    >
        <div 
            v-show="cardData.isRevealed" 
            :class = "color == 'red' ? 'red-suit' : 'black-suit'" 
            class="front">
            <p class="top">
                {{ rankDisplay + suitImage }}
            </p>
            <p class="bottom">
                {{ suitImage + rankDisplay }}
            </p>
        </div>
        <div 
            v-show="!cardData.isRevealed" 
            class="back">
            <p class="top">
                ??
            </p>
            <p class="bottom">
                ??
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props : {
        cardData : {
            type : "object",
            default : {}
        }
    },
    data : function() {
        return {};
    },
    computed : {
        suitImage : function() {
            switch (this.cardData.suit) {
            case "hearts":
                return "♥";
            case "spades":
                return "♠";
            case "clubs":
                return "♣";
            case "diamonds":
                return "♦";
            }
        },
        color : function() {
            if (this.cardData.suit == "hearts" || this.cardData.suit == "diamonds") {
                return "red";
            } else {
                return "black";
            }
        },
        rankDisplay : function() {
            let disp;
            if (this.cardData.rank > 1 && this.cardData.rank <= 10) {
                disp = this.cardData.rank;
            } else if (this.cardData.rank == 11) {
                disp = "J";
            } else if (this.cardData.rank == 12) {
                disp = "Q";
            } else if (this.cardData.rank == 13) {
                disp = "K";
            } else if (this.cardData.rank == 1) {
                disp = "A";
            }
            return disp;
        },
        centerImage : function() {
            var str = "";
            if (this.cardData.rank > 1 && this.cardData.rank <= 10) {
                str = this.suitImage + this.cardData.rank + this.suitImage;
            } else if (this.cardData.rank == 11) {
                str = this.suitImage + "J" + this.suitImage;
            } else if (this.cardData.rank == 12) {
                str = this.suitImage + "Q" + this.suitImage;
            } else if (this.cardData.rank == 13) {
                str = this.suitImage + "K" + this.suitImage;
            } else if (this.cardData.rank == 1) {
                str = this.suitImage + "A" + this.suitImage;
            }
            return str;
        }
    },
    methods : {
        handleCardClick () {
            debugger;
            this.$emit("event_card_click", this.cardData.key);
        }
    },
};
</script>
<style lang="scss">
.playing-card {
  display: inline-block;
  width: 70px;
  padding-left: 10px;
  padding-right: 10px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  box-shadow: 4px 4px 5px darkgray;
  background-color: #fcfcfc;
  border-color: #636363;
  cursor: pointer;

  .bottom {
    text-align: right;
    position: relative;
    bottom: 0px;
  }
  .center {
    text-align: center;
    line-height: 30px;
    font-size: 22px;
  }

    .red-suit {
    color: red;
    }
    .black-suit {
    color: black;
    }
    .back {
    background-color: #fcfcfc;
    border-color: #44607c;
    }
}

</style>