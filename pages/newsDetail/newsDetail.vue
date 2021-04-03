<template>
	<view class="news-detail">
		<view class="title">
			{{detail.title}}
		</view>
		<view class="info">
			<text v-if="detail.newsTime">发布时间：{{detail.newsTime.slice(0,10)}}</text>
			<text>浏览：{{detail.watchCount}}次</text>
		</view>
		<view class="content">
			<rich-text v-if="detail.content" :nodes="detail.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {}
			}
		},
		onLoad(obj) {
			console.log(obj.id);
			this.$myRequest({
				url: '/api/newsDetail?id=' + obj.id,
				success: (res) => {
					if (res.data.status === 0) {
						this.detail = res.data.data;
					} else {
						uni.showToast({
							title: "获取详情失败",
							duration: 2000
						})
					}
				}
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #b9cad0;

	}

	.news-detail {
		padding: 20rpx;

		.title {
			line-height: 80rpx;
			font-size: 40rpx;
		}

		.info {
			display: flex;
			justify-content: space-between;
			font-size: 32rpx;
			line-height: 60rpx;
			color: #333333;
			padding-bottom: 20rpx;
		}

		.content {
			text-indent: 2em;
			font-size: 36rpx;
			color: #222222;

			::v-deep p {
				padding-bottom: 14rpx;
			}
		}
	}
</style>
