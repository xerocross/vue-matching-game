<template>
    <form >
        <div class="form-group">
            <div class="row">
                <div class= "col-xs-6">
                    <label>Number of Cards</label>
                </div>
                <div class="col-xs-6">
                    <select 
                        v-model = "gameSize" 
                        class="form-control">
                        <option 
                            v-for = "i in [10, 16, 24, 32, 40]" 
                            :key = "i" 
                            :value = "i">
                            {{ i }}
                        </option>
                    </select>
                </div>
            </div>
            <span 
                class="btn btn-primary" 
                @click = "submit">Deal</span>
        </div>
    </form>
</template>
<script>
export default {
    data() {
        return {
            gameSize : 16,
            numPlayers : 1,
            studyDelay : 1000
        };
    },
    methods : {
        submit () {
            let data = {
                gameSize : this.gameSize,
                numPlayers : this.numPlayers,
                studyDelay : this.studyDelay
            };
            this.$emit("event_submit", data);
        }
    }
};
</script>