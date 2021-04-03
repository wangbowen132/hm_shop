<template>
	<view class="contact">
		<image class="img" src="http://jd.bjwxtd.com/public/uploads/ace343dee896eb47ca87c68f740b4569.jpg" mode="aspectFill"></image>	
		<view class="info">
			<view @click="callPhone">
				联系电话：400-618-9090（点击拨打）
			</view>
			<view>
				地址：浙江省杭州市下沙经济开发区4号大街187号盛泰时代山
			</view>
		</view>
		<map class="map" :latitude="latitude" :longitude="longitude" :markers="covers" :scale="scale">
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 30.311796,
				longitude: 120.362691,
				covers: [{
					latitude: 30.311796,
					longitude: 120.362691,
					iconPath: '/static/icons/school.png',
					title: "黑马学校",
					height: 60
				}],
				scale: 16
			}
		},
		methods: {
			callPhone(){
				uni.makePhoneCall({
					phoneNumber: "4006189090"
				})
			}
		}
	}
</script>

<style lang="scss">
	.contact{
		.img{
			width: 750rpx;
			height: 320rpx;
		}
		.info{
			font-size: 28rpx;
			line-height: 74rpx;
			padding: 0 20rpx;
			view:nth-child(1){
				border-bottom: 1rpx solid $hm-shop-gray;
			}
		}
		.map{
			width: 750rpx;
			height: 750rpx;
		}
		
		
	}
</style>
