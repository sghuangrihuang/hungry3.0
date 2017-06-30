<template>
	<div class="ratings"  ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">总合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}</div>
				</div>
				<div class="overview-right">
					<div class="score-warpper">
						<span class="title">服务态度</span>
						<star :size='36' :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-warpper">
						<span class="title">商品态度</span>
						<star :size='36' :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-warpper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<!-- <ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings" @ratingtype="ratingType" @contenttoggle="contentToggle"></ratingselect> -->
			<ratingselect :ratings="ratings"></ratingselect>
			<div class="rating-warpper">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-warpper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend||rating.recommend.length">
								<span class="icon-thumb_up"></span>
								<span v-for="item in rating.recommend" class="item">{{item}}</span>
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from "Vuex";
	import star from '../star/star.vue';
	import BScroll from 'better-scroll';
	import {formatDate} from '../../common/js/date.js';
	import ratingselect from '../ratingselect/ratingselect.vue';
	import split from '../split/split.vue';
	const ALL = 2;
	const ERR_OK=0;
	export default {
		computed: {
			...mapState({
                selectType: state => state.activeRating.selectType,
                onlyContent: state => state.activeRating.onlyContent,
				seller: state => state.seller,
            })
		},
		data() {
			return {
				ratings:[],
				showFlag: false,
			}
		},
		created() {
			this.$http.get('/api/ratings').then( (res) => {
				res = res.body;
		        if( res.errno === ERR_OK) {
					this.ratings = res.data;
					this.$nextTick( ()=>{
						this.scroll = new BScroll(this.$refs.ratings, {
		          			click:true
		          		});
					});
		        }
			})
		},
		methods: {
			...mapActions({
				selectRatings:'selectRatings'
			}),
			needShow(type, text){
				if( this.onlyContent && !text ){
					return false;
				}
				if( this.selectType===ALL ){
					return true
				} else {
					return type===this.selectType
				}
			}
		},
		watch: {
			selectType() {
				this.$nextTick(()=>{
					this.scroll.refresh();
				});
			},
			onlyContent() {
				this.$nextTick(()=>{
					this.scroll.refresh();
				});
			},
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components:{
			star,
			ratingselect,
			split
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl';
	.ratings
		position: absolute
		width: 100%
		top:174px
		left:0
		bottom:0
		overflow:hidden
		.overview
			display: flex
			padding:18px 0
			.overview-left
				flex: 0  0 137px
				padding: 6px 0
				width: 137px
				border-right: 1px solid rgba(7, 17, 27, .1)
				text-align: center
				@media only screen and (max-width:320px)
					flex: 0  0 110px
					width: 110px
				.score
					margin-bottom: 6px
					line-height: 28px
					font-size: 24px
					color: rgb(255, 133, 0)
				.title
					margin-bottom: 8px
					line-height: 12px
					font-size: 12px
					color: rgb(7, 17, 27)
				.rank
					line-height: 10px
					font-size: 10px
					color: rgb(147, 153, 159)
			.overview-right
				flex: 1
				padding:6px 0 6px 24px
				@media only screen and (max-width:320px)
					padding-left: 6px
				.score-warpper
					margin-bottom: 8px
					line-height: 18px
					font-size: 0
					.title
						display: inline-block
						font-size: 12px
						line-height: 18px
						color: rgb(7, 17, 27)
						vertical-align: top
					.star
						display: inline-block
						margin: 0 12px
						vertical-align: top
					.score
						display: inline-block
						line-height: 18px
						vertical-align: top
						font-size: 12px
						color: rgb(255, 153, 0)
				.delivery-warpper
					font-size: 0
					.title
						font-size: 12px
						line-height: 18px
						color: rgb(7, 17, 27)
					.delivery
						font-size: 12px
						margin-left:  12px
						color: rgb(147, 153, 159)
		.rating-warpper
			padding: 0 18px
			.rating-item
				display: flex
				padding: 18px 0
				border-1px(rgba(7, 17, 27, .1))
				.avatar
					flex: 0 0 28px
					width: 28px
					margin-right: 12px
					img
						border-radius: 50%
				.content
					position: relative
					flex: 1
					.name
						margin-bottom: 4px
						line-height: 12px
						font-size: 10px
						color: rgb(7, 17, 27)
					.star-warpper
						margin-bottom: 6px
						font-size: 0
						.star
							display: inline-block
							margin-right: 6px
							vertical-align: top
						.delivery
							display: inline-block
							vertical-align: top
							font-size: 10px
							line-height: 12px
							color: rgb(147, 153, 159)
					.text
						margin-bottom: 8px
						line-height: 18px
						color: rgb(7, 17, 27)
						font-size: 12px
					.recommend
						line-height: 16px
						.icon-thumb_up,.item
							display: inline-block
							margin: 0 8px 4px 0
							font-size: 9px
						.icon-thumb_up
							color: rgb(0, 160, 220)
						.item
							padding:0 6px
							border:1px solid rgba(7, 17, 27, .1)
							border-radius:1px
							background-color: #FFF
					.time
						position: absolute
						top: 0
						right: 0
						color: rgb(147, 153, 159)
						font-size: 10px
						line-height: 12px
</style>