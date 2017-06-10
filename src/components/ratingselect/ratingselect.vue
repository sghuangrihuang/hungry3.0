<template>
	<div class="ratingselect">
		<div class="rating-type">
		 	<span class="block positive" @click='selectItem({type:2, e:$event})' :class="{active:selectType===2}">
		 		{{desc.all}}<span class="count">{{ratings.length}}</span>
		 	</span>
		 	<span class="block positive" @click='selectItem({type:0, e:$event})' :class="{active:selectType===0}">
		 		{{desc.positive}}<span class="count">{{positives.length}}</span>
		 	</span>
		 	<span class="block negative" @click='selectItem({type:1, e:$event})' :class="{active:selectType===1}">
		 		{{desc.negative}}<span class="count">{{negatives.length}}</span>
		 	</span>
		</div>
		<div class="switch" :class="{'on':onlyContent}" @click='toggleContent({e:$event})'>
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script type="text/javascript">
    import {mapState, mapGetters, mapActions} from "Vuex";
	const POSITIVE = 0;
	const NEGATIVE = 1;
	export default {
		methods: {
			...mapActions({
				selectItem: "selectItem",
				toggleContent: "toggleContent",
			}),
		},
		computed: {
			...mapState({
                selectType: state => state.activeRating.selectType,
                onlyContent: state => state.activeRating.onlyContent
            }),
			positives() {
				// 过滤对应的函数 返回这个对象集合
				return this.ratings.filter( rating => rating.rateType === POSITIVE);
			},
			negatives(){
				return this.ratings.filter( rating => rating.rateType === NEGATIVE);
			}
		},
		props: {
			ratings: {
				type: Array,
				default() {
					return [];
				}
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive:'满意',
						negative:'不满意'
					}
				}
			}
		},
	}

</script>


<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl';

	.ratingselect
		.rating-type
			padding: 18px 0
			margin: 0 18px
			border-1px(rgba(7, 17, 27, .1))
			font-size: 0
			.block
				display: inline-block
				padding:8px 12px
				margin-right: 8px
				border-radius: 1px
				font-size: 12px
				color: rgb(77, 85, 93)
				&.active
					color: #fff
				.count
					margin-left: 12px
					font-size: 8px
				&.positive
					background-color: rgba(0, 160, 220, .2)
					&.active
						background-color: rgba(0, 160, 220, 1)
				&.negative
					background-color: rgba(77, 85, 93, .2)
					&.active
						background-color: rgba(77, 85, 93, 1)
		.switch
			padding: 12px 18px
			line-height: 24px
			border-bottom: 1px solid rgba(7, 17, 27, .1)
			color: rgb(147, 153, 159)
			font-size: 0
			&.on
				.icon-check_circle
					color: #00c850
			.icon-check_circle
				display: inline-block
				vertical-align: top
				margin-right: 4px
				font-size: 24px
			.text
				display: inline-block
				vertical-align: top
				font-size: 12px
</style>