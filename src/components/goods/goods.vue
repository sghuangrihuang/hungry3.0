<template>
	<div>
		<div class="goods">
			<div class="menu-warpper" ref="menuWrapper">
				<ul>
					<li v-for="(item, index) in goods" class="menu-item" :class="{ 'current':currentIndex === index }" @click="selectMenu(index, $event)">
						<span class="text">
							<span v-show='item.type>0' class="icon" :class='classMap[item.type]'></span>{{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-warpper" ref="foodWrapper">
				<ul>
					<li v-for="item in goods" class="food-list foot-list-hook">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li v-for='food in item.foods' @click='selectFoodItem(food, $event)' class="food-item border-1px">
								<div class="icon">
									<img :src='food.icon' width="100%">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span><span class="old" v-show='food.oldPrice'>{{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<cartcontrol :strId="food.id"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart ref="showcart" :delivery-price='seller.deliveryPrice' :min-price='seller.minPrice'></shopcart>
		</div>
		<food ref="food"></food>
	</div>
</template>

<script>
	import Vue from 'vue';
	import BScroll from 'better-scroll';
    import {mapState, mapGetters, mapActions} from "Vuex";
 	import shopcart from '../shopcart/shopcart.vue';
 	import cartcontrol from '../cartcontrol/cartcontrol.vue';
 	import food from '../food/food.vue';
	const ERR_OK = 0;
	export default {
		props: {
			seller:{
				type:Object
			}
		},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
			}
		},
		created() {
			this.classMap = ['decrease','discount','special','invoice','guarantee']
			this.$http.get('/api/goods').then( (res) => {
				res = res.body;
		        if( res.errno === ERR_OK) {
					let data = res.data;
					let i = 0;
					data.forEach((item)=>{
						item.foods.forEach((food)=>{
							Vue.set(food, 'id', i++);
							Vue.set(food, 'count', 0);
						});
					});
					this.goods = data;

					// 数据加载完毕之后  才获取初始化参数
					this.$nextTick(() =>{
						this._calculateHeight();
					 	this._initScroll();
					});
					this.initFoods({goods:this.goods});
					// this.initActiveFood();
		        }
			})
		},
		computed: {
			currentIndex() {
				for(let i = 0; i < this.listHeight.length; i++){
					let height1= this.listHeight[i];
					let height2= this.listHeight[i+1];
					if( !height2 || (this.scrollY >=height1 &&  this.scrollY <height2)) {
						return i;
					}
				}
				return 0;
			},
		},
		methods: {
			...mapActions({
				initFoods: 'initFoods',
				selectFood: 'selectFood',
				initActiveFood:'initActiveFood'
			}),
			selectFoodItem(food, event) {
				if( !event._constructed ){
					return;
				}
				// 在修改数据之后立即使用这个方法，获取更新后的 DOM。(DOM重新渲染完毕)
				this.$nextTick(()=>{
					this.selectFood({food:food, e:event});
				})
			},
			selectMenu(index, event) {
				// pc默认追加个事件。阻止默认事件 没有_constructed事件（等价于BScroll自带了个事件）
				if( !event._constructed ){
					return;
				}
				let foodList = this.$refs.foodWrapper.getElementsByClassName('foot-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300);
			},
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click: true
				});
				this.foodsScroll = new BScroll(this.$refs.foodWrapper,{
					click: true,
					probeType: 3
				});
				this.foodsScroll.on('scroll',(pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_calculateHeight() {
				let foodList = this.$refs.foodWrapper.getElementsByClassName('foot-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for(let i = 0; i < foodList.length; i++){
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
		},
		components: {
			shopcart,
			cartcontrol,
			food
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl';
	.goods
		display: flex
		position: absolute
		width: 100%
		left:0
		top:174px
		bottom:46px
		overflow: hidden
		.menu-warpper
			flex:0 0 80px
			width: 80px
			background-color: #f3f5f7
			.menu-item
				display:table
				width:56px
				height:54px
				padding: 0 12px
				font-size: 0
				line-height: 14px
				.icon
					display: inline-block
					width:12px
					vertical-align: top
					height: 12px
					margin-right: 4px
					background-size:100%
					&.decrease
						bg-images("decrease_3")
					&.discount
						bg-images("discount_3")
					&.guarantee
						bg-images("guarantee_3")
					&.invoice
						bg-images("invoice_3")
					&.special
						bg-images("special_3")
				&.current
					position: relative
					z-index: 100
					margin-top:-1px
					background-color: #FFF
					font-weight: bold
					.text
						border-none()
				.text
					display: table-cell
					width: 56px
					border-1px(rgba(7, 17, 27, 0.1))
					vertical-align: middle
					font-size: 12px
					line-height: 14px
					color:rgb(77, 85, 93)
					font-weight: 200
		.foods-warpper
			flex:1
			.title
				padding-left: 14px
				height: 26px
				line-height: 26px
				border-left: 2px solid #d9dde1
				font-size: 12px
				color:rgb(147, 153, 159)
				background-color: #f3f5f7
			.food-item
				display: flex
				margin:18px
				padding-bottom:18px
				border-1px(rgba(7, 17, 27, 0.1))
				&:last-child
					border-none()
					margin-bottom:0
				.icon
					flex: 0 0 57px
					margin-right: 10px
				.content
					flex:1;
					.name
						margin:2px 0 8px 0
						line-height: 14px
						height:14px
						font-size: 14px
						color:rgb(7, 17, 27)
					.desc
						margin-bottom: 8px
						line-height: 12px
						font-size: 10px
						color:rgb(147, 153, 159)
					.extra
						line-height: 10px
						font-size: 10px
						color:rgb(147, 153, 159)
						.count
							margin-right: 8px
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
					.cartcontrol-wrapper
						position: absolute
						right:0
						bottom: 12px
</style>