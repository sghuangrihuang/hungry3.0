<template>
	<transition name="move">
	<div v-show="foodShowFlag" class="food" ref="food">
		<div class="food-content">
			<div class="image-header">
				<img  v-lazy="food.image">
				<div class="back" @click="hide">
					<i class="icon-arrow_lift"></i>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{food.name}}</h1>
				<div  class="detail">
					<span class="sell-count">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span>
					<span class="old" v-show='food.oldPrice'>￥{{food.oldPrice}}</span>
				</div>
				<div class="cartcontrol-warpper">
					<cartcontrol :strId="food.id"></cartcontrol>
				</div>
				<transition name="fade">
					<div class="buy"  v-show=" !food.count || food.count===0" @click.stop.prevent="addFirst($event)">加入购物车</div>
				</transition>
			</div>
			<split v-show="food.info"></split>
			<div class="info" v-show="food.info">
				<h1 class="title">商品信息</h1>
				<p class="text">{{food.info}}</p>
			</div>
			<split></split>
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingselect :ratings="food.ratings" :desc="desc"></ratingselect>
				<div class="rating-warpper">
					<ul v-show="food.ratings && food.ratings.length" >
						<li v-for="(rating, index) in food.ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item" :key="index">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img :src="rating.avatar" class="avatar" width="12" height="12">
							</div>
							<div class="time">{{rating.rateTime  | formatDate}}</div>
							<p class="text">
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
							</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
				</div>
			</div>
		</div>
	</div>
	</transition>

</template>

<script type="text/javascript">
	import Vue from 'vue';
    import {mapState, mapGetters, mapActions} from "Vuex";
	import BScroll from 'better-scroll';
	import {formatDate} from '../../common/js/date.js';
	import cartcontrol from '../cartcontrol/cartcontrol.vue';
	import ratingselect from '../ratingselect/ratingselect.vue';
	import split from '../split/split.vue';
	const ALL = 2;
	export default {
		computed: {
			...mapState({
                selectType: state => state.activeRating.selectType,
                onlyContent: state => state.activeRating.onlyContent,
                food: state => state.activeFood,
                foodShowFlag: state => state.foodShowFlag
            })
		},
		watch: {
			selectType() {
				this.$nextTick( ()=>{
					this.scroll.refresh();
				});
			},
			onlyContent() {
				this.$nextTick( ()=>{
					this.scroll.refresh();
				});
			},
			foodShowFlag() {
				if(!this.foodShowFlag) {
					return;
				}
				this.selectRatings({strId:this.food.id});
				this.$nextTick(()=> {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.food, {
							click:true
						});
					} else {
						this.scroll.refresh();
					}
				});
			}
		},
		data() {
			return {
				showFlag:false,
				desc: {
					all: '全部',
					positive:'推荐',
					negative:'吐槽'
				}
			}
		},
		methods: {
			...mapActions({
				selectRatings: "selectRatings",
				toggleFlag: 'toggleFlag'
			}),
			hide() {
				this.toggleFlag();
			},
			addFirst(event) {
				if(!event._constructed){
					return;
				}
				this.$emit('cartadd', event.target);
				Vue.set(this.food, 'count', 1);
			},
			needShow(type, text){
				if( this.onlyContent && !text ){
					return false;
				}
				if( this.selectType=== ALL ){
					return true
				} else {
					return type===this.selectType
				}
			},
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components: {
			cartcontrol,
			split,
			ratingselect
		}
	}

</script>


<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl';
	.food
		position: absolute
		top:0
		left:0
		bottom:48px
		width: 100%
		z-index: 30
		background-color: #FFF
		transform:translate3d(0,0,0)
		&.move-enter-active,&.move-leave-active
			transition: all 0.2s linear
		&.move-enter,&.move-leave-active
			transform:translate3d(100%,0,0)
		.image-header
			position: relative
			width: 100%
			height: 0
			padding-top:100%
			img
				position: absolute
				width: 100%
				height: 100%
				top:0
				left:0
			.back
				position: absolute
				top:10px
				left:0
				.icon-arrow_lift
					display: block
					padding:10px
					font-size: 20px
					color: #fff
		.content
			padding:18px
			position: relative
			.title
				line-height: 14px
				margin-bottom: 8px
				font-size: 14px
				font-weight: 700
				color: rgb(7, 17, 27)
			.detail
				margin-bottom: 18px
				line-height: 10px
				font-size: 0
				.sell-count,.rating
					font-size: 10px
					color: rgb(143, 153, 159)
				.sell-count
					margin-right: 12px
			.price
				font-weight: 700
				line-height: 24px
				.now
					margin-right: 8px
					font-size: 14px
					color:rgb(240,20,20)
				.old
					text-decoration: line-through
					font-size:10px
					color:rgb(147, 153, 159)
			.cartcontrol-warpper
				position: absolute
				right: 12px
				bottom: 12px
			.buy
				position: absolute
				right: 18px
				bottom: 18px
				z-index: 10
				line-height: 24px
				height: 24px
				padding: 0 12px
				font-size: 10px
				box-sizing:border-box
				color:#fff
				border-radius:12px
				opacity: 1
				background-color: rgb(0, 160, 220)
				&.fade-enter-active,&.fade-leave-active
					transition: all 0.4s
				&.fade-enter,&.fade-leave-active
					opacity: 0
		.info
			padding: 18px
			.title
				line-height: 14px
				margin-bottom: 6px
				font-size: 14px
				color: rgb(7, 17, 27)
			.text
				line-height: 24px
				padding: 0 8px
				font-size: 12px
				color: rgb(77, 85, 93)
		.rating
			padding-top: 18px
			.title
				line-height: 14px
				margin: 0 18px
				margin-bottom: 6px
				font-size: 14px
				color: rgb(7, 17, 27)
			.rating-warpper
				padding: 0 18px
				.rating-item
					position: relative
					padding: 16px 0
					border-1px(rgba(7, 17, 27, .1))
					.user
						position: absolute
						right: 0
						top: 16px
						line-height: 12px
						font-size: 0
						.name
							display: inline-block
							vertical-align: top
							font-size :10px
							margin-right: 16
							color: rgb(147, 153, 159)
						.avatar
							border-radius:50%
					.time
						margin-bottom: 6px
						line-height: 12px
						font-size: 10px
						color:rgb(147, 153, 159)
					.text
						line-height: 16px
						font-size: 12px
						color : rgb(7, 17, 27)
						.icon-thumb_up,.icon-thumb_down
							margin-right: 4px
							line-height: 24px
							font-size: 12px
						.icon-thumb_up
							color: rgb(0, 160, 220)
						.icon-thumb_down
							color : rgb(7, 17, 27)
				.no-rating
					padding:16px 0
					font-size: 12px
					color: rgb(147, 153, 159)
</style>