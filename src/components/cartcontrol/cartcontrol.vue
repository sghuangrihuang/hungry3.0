<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease " @click.stop.prevent="decreaseCart({strId:strId ,e:$event})" v-show="activeFood.count>0 && activeFood.count">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="activeFood.count>0 && activeFood.count" >{{activeFood.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart({strId:strId ,e:$event})"></div>
	</div>
</template>

<script>
	import Vue from 'vue';
    import {mapState, mapGetters, mapActions} from "Vuex";
	export default {
		props: {
			strId: {
				type: Number,
				default () {
					return 0;
				}
			},
		},
		computed : {
			...mapState({
				activeFoods: state => state.foods,
			}),
			activeFood() {
				if(!this.activeFoods[this.strId]){
					return {
						count : 0
					}
				}
				return this.activeFoods[this.strId]
			}
		},
		methods: {
			...mapActions({
				addCart: 'addCart',
				decreaseCart: 'decreaseCart'
			}),
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl';
	.cartcontrol
		font-size: 0
		.cart-decrease
			display: inline-block
			padding:6px
			transition:all 0.4s linear
			.inner
				display: inline-block
				color:rgb(0, 160, 220)
				line-height: 24px
				font-size: 24px
				opacity: 1
				transform:translate3d(0,0,0)
				transition:all 0.4s linear
				transform:rotate(0)
			&.move-enter-active,&.move-leave-active
				transition:all 0.4s linear
			&.move-enter,&.move-leave-active
				opacity: 0
				transform:translate3d(24px,0,0)
				.inner
					transform:rotate(180deg)
		.cart-count
			display: inline-block
			vertical-align: top
			width: 12px
			padding-top: 6px
			line-height: 24px
			text-align: center
			font-size: 10px
			color:rgb(147,153,159)
		.cart-add
			display: inline-block
			color:rgb(0, 160, 220)
			line-height: 24px
			font-size: 24px
			padding:6px
</style>