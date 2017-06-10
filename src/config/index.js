/*
* @Author: sghuangrihuang
* @Date:   2017-06-07 14:12:07
* @Last Modified by:   sghuangrihuang
* @Last Modified time: 2017-06-07 14:16:52
*/
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueLazyload from 'vue-lazyload';

import '@/common/stylus/index.styl';
Vue.use(VueResource);
Vue.use(VueLazyload, {
    error: 'http://a0.att.hudong.com/77/31/20300542906611142174319458811.jpg',
    loading: 'http://img.zcool.cn/community/013cb15648986a32f87512f6d87dc8.gif',
    try: 3 // default 1
});

export default '';