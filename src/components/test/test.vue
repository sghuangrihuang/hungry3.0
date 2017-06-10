<template>
    <div id="test" ref='test'>
        <div class="test-warpper">
            <button class="btn" @click="addNote({e: $event})">测试</button>
            <div class="list">
                <ul>
                    <li v-for="(item, index) in notes" :key='index'>
                        <span class="text">{{item.text}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters, mapActions} from "Vuex";
    import BScroll from 'better-scroll';
    export default {
        props: {
            seller: {
                type:Object
            }
        },
        data() {
            return {

            }
        },
        created() {
            this.$nextTick(()=>{
                this.scroll = new BScroll(this.$refs.test, {
                    click:true
                });
            });
        },
        computed: {
            ...mapState({
                notes: state => state.notes
            })
        },
        watch: {
            notes() {
                this.$nextTick(()=>{
                    this.scroll.refresh();
                })
            }
        },
        methods: {
            ...mapActions({
                addNote: 'addNote'
            })
        },
    };
</script>
<style lang="stylus" rel="stylesheet/stylus" >
    #test
        text-align: center
        position: absolute
        width: 100%
        top:174px
        left:0
        bottom:0
        overflow:hidden
        .btn
            font-size: 12px
            padding:10px 20px
            line-height: 30px
            height:30px
            box-sizing content-box
            background none
</style>