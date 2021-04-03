<template>
	<view>
		<view class="goods-list">
			<view class="goods-item" @click="navigateTo(item.id)" v-for="(item,index) in goods" :key="index">
				<image class="item-img" :src="item.img" mode="aspectFit"></image>
				<view class="price">
					<text>{{item.price}}</text>
					<del>{{item.del}}</del>
				</view>
				<view class="desc">
					{{item.desc.substring(0, 22)}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"goodsList",
		props: ["goods"],
		methods: {
			navigateTo(id){
				console.log(id)
				uni.navigateTo({
					url: '/pages/goodDetail/goodDetail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-list{
		display: flex;
		flex-wrap: wrap;
		padding-top: 16rpx;
		.goods-item{
			width: 350rpx;
			height: 570rpx;
			margin-left: 16rpx;
			margin-bottom: 16rpx;
			background-color: white;
			.item-img{
				width: 100%;
				padding-top: 60rpx;
				height: 300rpx;
			}
			.price{
				height: 80rpx;
				text{
					padding: 0 20rpx;
					color: #c93a3a;
					font-size: 30rpx;
				}
				del{
					color: #c7c7c7;
					font-size: 20rpx;
				}
				
			}
			.desc{
				font-size: 30rpx;
				padding: 0 20rpx;
			}
		}
	}
			
</style>
