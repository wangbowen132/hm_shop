<template>
	<view class="content">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
			<swiper-item v-for="item in swiperInfo">
				<image class="swiper-img" :src="item.img" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<!-- 导航区 -->
		<view class="nav">
			<view class="nav-item" v-for="(item, index) in navs" :key="index" @click="toNavPath(item.path)">
				<view class="icon-img">
					<i :class="'iconfont ' + item.icon"></i>
				</view>
				<view class="text">
					{{item.text}}
				</view>
			</view>
		</view>
		
		<!-- 推荐商品 -->
		<view class="hot-goods">
			<view class="title">
				<text space="nbsp">推    荐    商    品</text>
			</view>
			<goodsList :goods="goods"></goodsList>
		</view>
		
		
		
	</view>
</template>

<script>
	import goodsList from 'components/goodsList.vue'
	export default {
		data() {
			return {
				swiperInfo: [],
				goods: [],
				navs: [
					{
						icon: "icon-ziyuan",
						text: "黑马超市",
						path: "/pages/goods/goods"
					},{
						icon: "icon-xiaoxi_huaban1",
						text: "联系我们",
						path: "/pages/contact/contact"
					},{
						icon: "icon-tupian",
						text: "社区图片",
						path: "/pages/pics/pics"
					},{
						icon: "icon-shipin",
						text: "学习视频",
						path: "/pages/vedios/vedios"
					}
				]
			}
		},
		components: {
			goodsList
		},
		onLoad() {
			this.getSwiper();
			this.getGoods();
		},
		methods: {
			getSwiper(){
				this.$myRequest({
					url: "/api/image/getImage",
					success:(res) => {
						if(res.data.status === 0){
							this.swiperInfo = res.data.data;	
						}else{
							uni.showToast({
								title: "获取轮播图失败",
								duration: 2000
							});
						}
					}
				});
			},
			getGoods(){
				this.$myRequest({
					url: '/api/good?pageIndex=1',
					success: (res) => {
						if(res.data.status === 0){
							this.goods = res.data.data;
						}else{
							uni.showToast({
								title: "获取商品信息失败",
								duration: 2000
							})
						}
					}
				})
			},
			toNavPath(path){
				uni.navigateTo({
					url: path
				})
			}
		
		}
	}
</script>

<style lang="scss">
		
	.content{
		background-color: #f0eef0;
		.swiper{
			width: 750rpx;
			height: 380rpx;
			.swiper-img{
				width: 100%;
				height: 100%;
			}		
		}
		.nav{
			display: flex;
			padding-bottom: 40rpx;
			margin-bottom: 16rpx;
			background-color: white;
			.nav-item{
				width: 25%;
				text-align: center;
				
				.text{
					font-size: 30rpx;
				}
				.icon-img{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					margin: 20rpx auto;
					background-color: $hm-shop-red;
					color: white;
					.iconfont{
						font-size: 50rpx;
						line-height: 120rpx;
					}
					.icon-xiaoxi_huaban1{
						font-size: 70rpx;
					}
					.icon-shipin{
						font-size: 80rpx;
					}
				}
			}
		}
		.hot-goods{
			.title{
				background-color: white;
				text-align: center;
				height: 100rpx;
				line-height: 100rpx;
				font-size: 40rpx;
				color: $hm-shop-red;
			}
		}
	
		
	}

</style>
