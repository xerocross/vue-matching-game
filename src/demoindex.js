import Vue from "vue";
import {CrossMatchingGame} from "./index.js"


new Vue({
    el : "#widget",
    components : {
        CrossMatchingGame
    },
    render : function (createElement) {
        return createElement(CrossMatchingGame);
    }
});