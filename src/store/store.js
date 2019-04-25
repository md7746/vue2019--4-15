import Vue from 'vue';
import Vuex from 'vuex';

import menu from './module/menu';
import user from './module/user';

Vue.use(Vuex);

export let store = new Vuex.Store({
    modules:{
        menu,
        user
    }
})