<template>
	<view class="news">
		<view class="news-item" @click="navigateTo(item.id)" v-for="(item,index) in newsMsg" :key="item.id">
			<image class="img" :src="item.url" mode="aspectFill"></image>
			<view class="info">
				<view class="title">
					{{item.title}}
				</view>
				<view class="msg">
					<text>发表时间：{{item.newsTime.slice(0,10)}}</text>
					<text>浏览：{{item.watchCount}}次</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"newsList",
		props: ["newsMsg"],
		data() {
			return {
				
			};
		},
		methods: {
			navigateTo(id){
				uni.navigateTo({
					url: "/pages/newsDetail/newsDetail?id=" + id
				});
			}
		}
	}
</script>

<style lang="scss">
	.news {
		.news-item {
			display: flex;
			padding: 8rpx 16rpx;
			border-bottom: 2rpx solid $hm-shop-red;

			.img {
				width: 200rpx;
				height: 150rpx;
				
			}

			.info {
				padding: 10rpx 20rpx;
				width: 460rpx;

				.title {

					font-size: 26rpx;
				}

				.msg {
					display: flex;
					justify-content: space-between;
					padding-top: 20rpx;
					font-size: 20rpx;
				}
			}
		}
	}
</style>
