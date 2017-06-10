<template>
	<div class="star" :class='starType'>
		<span v-for='(item, index) in itemClasses' :class="item" class="star-item" :key='index'></span>
	</div>
</template>

<script>
	const Len=5;
	const CLS_ON="on";
	const CLS_OFF="off";
	const CLS_HALF="half";
	export default{
		data () {
			return {
			}
		},
		props:{
			// 大小
			size:{
				type:Number
			},
			// 分数
			score:{
				type:Number
			}
		},
		computed:{
			starType () {
				return 'star-'+this.size;
			},
			itemClasses() {
				let result = [];
				let score = Math.floor(this.score*2)/2;
				let hasDecimal = score % 1 !=0;
				let integer =Math.floor(score);
				for(let i=0;i<integer;i++){
					result.push(CLS_ON);
				}
				if(hasDecimal){
					result.push(CLS_HALF);
				}
				while(result.length < Len){
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl';
	.star
		font-size:0
		.star-item
			display:inline-block
			background-size: 100%
		&.star-48
			.star-item
				width: 20px
				height: 20px
				margin:0px 11px
				&.on
					bg-images('star48_on')
				&.half
					bg-images('star48_half')
				&.off
					bg-images('star48_off')
		&.star-36
			.star-item
				width: 15px
				height: 15px
				margin:0px 3px
				&.on
					bg-images('star36_on')
				&.half
					bg-images('star36_half')
				&.off
					bg-images('star36_off')
		&.star-24
			.star-item
				width: 10px
				height: 10px
				margin:0px 1.5px
				&.on
					bg-images('star24_on')
				&.half
					bg-images('star24_half')
				&.off
					bg-images('star24_off')
</style>