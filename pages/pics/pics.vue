<template>
	<view class="pics">
		<scroll-view class="left" scroll-y="true">
			<view :class="active === index?'active':''" @click="changeCate(index, item.id)" v-for="(item,index) in imgCate" :key="index">{{item.title}}</view>
		</scroll-view>
		<scroll-view class="right" scroll-y="true" >
			<view v-for="(item,index) in cateImg" :key="index">
				<image class="img" :src="item.img" mode="aspectFill" @click="previewImg(index)"></image>
				<view class="title">{{item.title}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgCate: [],
				active: 0,
				cateImg: [],
				id: 14
			}
		},
		onLoad() {
			this.getImgCate();
			this.getCateImg();
		},
		methods: {
			getImgCate(){
				this.$myRequest({
					url: "/api/imgCate",
					success: (res) => {
						if(res.data.status === 0){
							this.imgCate = res.data.data;
						}else{
							uni.showToast({
								title: "获取分类失败",
								duration: 2000
							})
						}
					}
				});
			},
			changeCate(index, id){
				this.active = index;
				console.log(id)
				this.id = id;
				this.getCateImg();
				
			},
			getCateImg(){
				this.$myRequest({
					url: "/api/cateImg/?id=" + this.id,
					success: (res) => {
						if(res.data.status === 0){
							console.log(res)
							this.cateImg = res.data.data.data;
						}else{
							uni.showToast({
								title: "获取分类失败",
								duration: 2000
							});
						}
					}
				});
			}
			,
			previewImg(index){
				uni.previewImage({
					current: index,
					urls: this.cateImg.map(item => item.img)
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.pics{
		height: 100%;
		display: flex;
		.left{
			border-right: 1px solid $hm-shop-gray;
			width: 200rpx;
			height: 100%;
			view{
				height: 120rpx;
				line-height: 120rpx;
				font-size: 32rpx;
				text-align: center;
				border-bottom: 1px solid $hm-shop-gray;
				color: #555555;
			}
			view:nth-child(1){
				border-top: 1px solid $hm-shop-gray;
			}
			.active{
				background-color: $hm-shop-red;
				color: white;
			}
		}
		.right{
			width: 100%;
			.img{
				width: 540rpx;
				height: 540rpx;
				margin: 0 24rpx;
				border-radius: 10rpx;
			}
			view:nth-child(1){
				margin-top: 20rpx;
			}
			.title{
				padding-left: 24rpx;
				padding-bottom: 16rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 28rpx;
				color: #090909;
			}
		}
	}
</style>
