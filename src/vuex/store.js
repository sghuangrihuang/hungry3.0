/*
* @Author: sghuangrihuang
* @Date:   2017-06-07 16:26:53
 * @Last Modified by: sghuangrihuang
 * @Last Modified time: 2017-06-26 11:11:38
*/

import Vue from 'vue'
import Vuex from 'vuex'
import {urlParse} from '@/common/js/utill.js';

Vue.use(Vuex)

const ALL = 2;

const state = {
    ratings: {},
    activeRating: { onlyContent: true, selectType: ALL} ,
    // 食品集合
    foods:[],
    // 当前食品
    activeFood:{ },
    // 食品页面开关
    foodShowFlag : false,
    // 选中的购物车
    selectFoods : [],
    // seller数据
    seller: {},
}
// 初始化seller数据
const ERR_OK = 0;
const seller = ({ "id":0 } || urlParse());
state.seller.id = seller.id;
new Vue().$http.get('/api/seller?id='+state.seller.id).then((res) => {
    res = res.body;
    if( res.errno === ERR_OK) {
        state.seller = Object.assign({}, state.seller, res.data);
    }
});


const mutations = {

    // ratingselect
    SELECT_RATINGS(state, strId) {
        if(!state.ratings[strId]){
            const data = {
                selectType: ALL,
                onlyContent: true,
            }
            Vue.set(state.ratings, strId, data);
        }
        state.activeRating = state.ratings[strId];
    },
    TOGGLE_CONTENT(state) {
        state.activeRating.onlyContent = !state.activeRating.onlyContent;
    },
    SELECT_ITEM(state, type) {
        state.activeRating.selectType = type;
    },
    // 初始化goods内容
    INIT_FOODS(state, goods) {
        goods.forEach( (good)=> {
            good.foods.forEach( (food)=> {
                state.foods.push(food);
            })
        });
    },
    SELECT_FOOD(state, food){
        state.foodShowFlag = true;
        state.activeFood = food;
    },
    TOGGLE_FLAG(state) {
        state.foodShowFlag = !state.foodShowFlag;
    },
    ADD_CART(state, strId){
        state.foods.forEach((food)=>{
            if(food.id==strId) {
                food.count++;
                return;
            }

        })
    },
    DECREASE_CART(stage, strId) {
        state.foods.forEach((food)=>{
            if(food.id==strId){
                if(food.count > 0 ) {
                    food.count--;
                    return;
                }
            }
        })
    },
    EMPTYCART(stage) {
        state.foods.forEach((food)=>{
            food.count = 0;
        })
    },
    INIT_FOOD(state){
        state.activeFood = state.foods[0];
    }
}

const actions = {
    // ratingselect
    selectRatings({commit}, {strId}){
        commit('SELECT_RATINGS', strId);
    },
    toggleContent({commit}, {e}) {
        if(!e._constructed){
            return;
        }
        commit('TOGGLE_CONTENT');
    },
    selectItem({commit}, {type, e}) {
        if(!e._constructed){
            return;
        }
        commit('SELECT_ITEM', type);
    },
    initFoods({commit}, {goods}){
        commit('INIT_FOODS', goods);
    },
    initActiveFood({commit}){
        commit('INIT_FOOD');
    },
    selectFood({commit}, {food, e}) {
        if(!e._constructed) {
            return;
        }
        commit('SELECT_FOOD', food);
    },
    toggleFlag({commit}) {
        commit('TOGGLE_FLAG');
    },
    addCart({commit}, {strId, e}) {
        if(!e._constructed) {
            return;
        }
        commit('ADD_CART', strId);
    },
    decreaseCart({commit}, {strId, e}) {
        if(!e._constructed) {
            return;
        }
        commit('DECREASE_CART', strId);
    },
    emptyCart({commit}) {
        commit('EMPTYCART');
    }

}

const getters = {
    favoriteNotes: state => {
        return state.notes.filter( (v,i) => v['favorite'] );
    },
}


var store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;