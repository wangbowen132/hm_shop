<template>
	<view class="goods">
		<goodsList :goods="goods"></goodsList>
		<view class="bottom-flag" v-if="flag">
			<text class="text">我是有底线的</text>
		</view>
	</view>
</template>

<script>
	import goodsList from 'components/goodsList.vue'
	export default {
		data() {
			return {
				goods: [],
				pageIndex: 1,
				flag: false,
				total: 0
			}
		},
		onLoad() {
			this.getGoods();
		},
		onReachBottom(){
			if(this.goods.length !== this.total){
				this.pageIndex++;
				this.getGoods();
			}else{
				this.flag = true;
			}
		},
		onPullDownRefresh(){
			console.log("下拉刷新");
			this.pageIndex = 1
			this.flag = false;
			this.goods = [];
			this.total = 0;
			setTimeout(() => {
				this.getGoods(() => {
					uni.stopPullDownRefresh();
				});
			}, 500)
		},
		components: {
			goodsList
		},
		methods: {
			getGoods(callback = () => {}){
				this.$myRequest({
					url: '/api/good?pageIndex=' + this.pageIndex,
					success: (res) => {
						console.log(res)
						if(res.data.status === 0){
							this.goods = [...this.goods,...res.data.data];
							if(this.total === 0){
								this.total = res.data.total;	
							}
						}else{
							uni.showToast({
								title: "获取商品信息失败",
								duration: 2000
							});
						}
						callback();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods{
		background-color: #f0eef0;
		.bottom-flag{
			color: #8B8878;
			text-align: center;
			height: 80rpx;
			.text{
				line-height: 80rpx;
				font-size: 32rpx;
				position: relative;
				&::before,&::after{
					content: "";
					display: block;
					border-top: 2rpx #8B8878 dashed;
					height: 1rpx;
					width: 200rpx;
					position: absolute;
					top: 22rpx;
				}
				&::before{
					left: -210rpx;		
				}
				&::after{
					right: -210rpx;
				}
			}
		}	
	}
</style>
