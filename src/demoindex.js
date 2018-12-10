import Vue from "vue";
import {VueMatchingGame} from "./index.js"


new Vue({
    el : "#widget",
    components : {
        VueMatchingGame
    },
    render : function (createElement) {
        return createElement(VueMatchingGame);
    }
});