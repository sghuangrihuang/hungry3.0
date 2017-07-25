import Vue from 'vue';
import Router from 'vue-router';
// import goods from '@/components/goods/goods.vue';
// import seller from '@/components/seller/seller.vue';
// import ratings from '@/components/ratings/ratings.vue';
const goods = r => require.ensure([], () => r(require('../components/goods/goods')), 'goods');
const seller = r => require.ensure([], () => r(require('../components/seller/seller')), 'seller');
const ratings = r => require.ensure([], () => r(require('../components/ratings/ratings')), 'ratings');

Vue.use(Router);


export default new Router({
    linkActiveClass:'active',
    routes: [{
        path: '/',
        redirect: '/goods'
    }, {
        path: '/goods',
        name: 'goods',
        component: goods
    },{
        path: '/seller',
        name: 'seller',
        component: seller
    },{
        path: '/ratings',
        name: 'ratings',
        component: ratings
    }]
})
