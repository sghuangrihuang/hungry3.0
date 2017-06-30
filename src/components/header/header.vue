<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand" ></span>
					<span class="name" v-text='seller.name'></span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if='seller.supports' class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if='seller.supports' class="support-count"  @click="showDetail" >
				<span class="count">{{ seller.supports.length }}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="backgound">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div v-show='detailShow' class="detail">
				<div class="detail-wraper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wraper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<div v-if="seller.supports" class="supports">
							<ul>
								<li class="support-item" v-for="(item, index) in seller.supports" :key="index">
									<span class="icon" :class="classMap[item.type]"></span>
									<span class="text">{{item.description}}</span>
								</li>
							</ul>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<div class="content">{{seller.bulletin}}</div>
						</div>
					</div>
				</div>
				<div class="detail-close" @click='hideDetail'>
					<i class="icon-close" ></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import star from '../star/star.vue';
	import {mapState, mapGetters, mapActions} from "Vuex";
	export default{
		computed: {
          ...mapState({
            seller: state => state.seller
          })
        },
		methods:{
			showDetail() {
				this.detailShow=true
			},
			hideDetail() {
				this.detailShow=false;
			}
		},
		data() {
			return {
				detailShow:false
			}
		},
		created() {
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		},
		components: {
			star
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	.header
		color: #fff
		overflow: hidden
		background-color: rgba(7, 17, 27, .5)
		position: relative
		.content-wrapper
			padding: 24px 12px 18px 24px
			font-size: 0
			position: relative
			.avatar
				display: inline-block
				vertical-align: top
				img
					border-radius: 2px
			.content
				display: inline-block
				margin-left: 16px
				.title
					margin:2px 0 8px
					.brand
						width: 30px
						height: 18px
						display: inline-block
						bg-images("brand")
						background-size: 100%
					.name
						margin-left: 6px
						font-size:16px
						line-height: 18px
						font-weight: bold
						vertical-align: top
				.description
					margin-bottom: 10px
					line-height: 12px
					font-size: 12px
				.support
					.icon
						display: inline-block
						width:12px
						height: 12px
						margin-right: 4px
						background-size:100%
						&.decrease
							bg-images("decrease_1")
						&.discount
							bg-images("discount_1")
						&.guarantee
							bg-images("guarantee_1")
						&.invoice
							bg-images("invoice_1")
						&.special
							bg-images("special_1")
					.text
						line-height: 12px
						font-size: 12px
						vertical-align: top
			.support-count
				position: absolute
				right:12px
				bottom: 18px
				padding: 0 8px
				height:24px
				line-height: 24px
				border-radius:14px
				background-color: rgba(0, 0, 0, .2)
				text-align: center
				.count
					font-size:12px
					vertical-align: top
				.icon-keyboard_arrow_right
					margin-left:2px
					line-height: 24px
					font-size: 12px
		.bulletin-wrapper
			height:28px
			line-height: 28px
			padding:0 22px 0 12px
			white-space: nowrap
			overflow:hidden
			position: relative
			background-color: rgba(7, 17, 27, .2)
			text-overflow:ellipsis
			.bulletin-title
				display: inline-block
				width:22px
				height:12px
				vertical-align: top
				margin-top: 8px
				bg-images('bulletin')
				background-size: 100%
			.bulletin-text
				vertical-align: top
				font-size:10px
				margin:0 4px
			.icon-keyboard_arrow_right
				position: absolute
				font-size:10px
				right:12px
				top:8px
		.backgound
			position: absolute
			z-index: -1
			top:0
			left:0
			width:100%
			height:100%
			filter:blur(10px)
		.detail
			position: fixed
			top:0
			left:0
			width:100%
			height:100%
			z-index: 500
			overflow:auto
			opacity: 1
			backdrop-filter:blur(10px)
			background-color: rgba(7, 17, 27, 0.8)
			&.fade-enter-active,&.fade-leave-active
				transition: all 0.5s
			&.fade-enter,&.fade-leave-active
				opacity: 0
				background-color: rgba(7, 17, 27, 0)
			.detail-wraper
				width:100%
				min-height:100%
				.detail-main
					margin-top: 64px
					padding-bottom:64px
					.name
						line-height: 16px
						text-align: center
						font-size: 16px
						font-weight: 700
					.star-wraper
						margin-top:18px
						padding:2px 0
						text-align: center
					.title
						display:flex
						width:80%;
						margin:28px auto 24px;
						.line
							flex:1
							position: relative
							top:-6px
							border-bottom:1px solid rgba(255,255,255,0.2)
						.text
							padding:0 12px
							font-weight: 700
							font-size: 14px
					.supports
						width:80%
						margin:0 auto
						.support-item
							padding:0 12px
							margin-bottom: 12px
							font-size:0
							.icon
								display: inline-block
								width:16px
								height:16px
								vertical-align: top
								margin-right: 6px
								background-size: 100%
								&.decrease
									bg-images("decrease_1")
								&.discount
									bg-images("discount_1")
								&.guarantee
									bg-images("guarantee_1")
								&.invoice
									bg-images("invoice_1")
								&.special
									bg-images("special_1")
							.text
								line-height: 16px
								font-size: 12px
					.bulletin
						width:80%
						margin:0 auto
						.content
							padding:0 12px
							line-height: 24px
							font-size: 12px

			.detail-close
				position: relative
				width:32px
				height:32px
				margin:-64px auto 0;
				clear:both
				font-size: 32px
</style>