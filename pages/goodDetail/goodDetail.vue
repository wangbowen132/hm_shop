<template>
	<view class="good-detail">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in goodDetail.img" :key ="index">
				<image class="img" :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		
		<view class="box1">
			<view  class="price">
				<text>￥{{good.price}}</text>
				<del>{{good.del}}</del>
			</view>
			<view class="title">
				{{goodDetail.title}}
			</view>
			<view class="info">
				{{goodDetail.info}}
			</view>
		</view>
		
		<view class="box2">
			<view  v-for="(item,index) in urlCut" :key="index">
				<image lazy-load class="img" :src="item" mode="widthFix"></image>
			</view>
		</view>
		
		<view class="box3">
			
		</view>
		
		<uni-goods-nav class="bottomNav" :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodDetail: {},
				good: {},
				options: [
					{
						icon: 'headphones',
						text: '客服'
					}, 
					{
						icon: 'shop',
						text: '店铺',
						info: 2,
						infoBackgroundColor:'#007aff',
						infoColor:"red"
					}, 
					{
						icon: 'cart',
						text: '购物车',
						info: 2
					}
				],
				buttonGroup: [
					{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
				
			}
		},
		computed: {
			urlCut(){
				if(!this.goodDetail['info-img'])return;
				
				var urls = this.goodDetail['info-img'];
				var newUrls = [];
				for(var i = 0; i < urls.length; i ++){
					var isExist = urls[i].indexOf('/pimages/detailImg/');
					if(isExist > -1){
						newUrls.push(urls[i]);
					}
				}
				return newUrls;
			}
		},
		onLoad(obj) {
			this.getGoodDetail(obj);
			this.getGood(obj);
		},
		methods: {
			getGoodDetail(obj){
				this.$myRequest({
					url: '/api/goodDetail?id=' + obj.id,
					success: (res) => {
						if(res.data.status === 0){
							this.goodDetail = res.data.data;
						}else{
							uni.showToast({
								title: "获取商品详情失败",
								duration: 2000
							});
						}
					}
				})
			},
			getGood(obj){
				this.$myRequest({
					url: '/api/good/byId?id=' + obj.id,
					success: (res) => {
						if(res.data.status === 0){		
							this.good = res.data.data
						}else{
							uni.showToast({
								title: "获取商品失败",
								duration: 2000
							})
						}
					}
				})
			},
			onClick (e) {
				uni.showToast({
				  title: `点击${e.content.text}`,
				  icon: 'none'
				})
			},
			buttonClick (e) {
				console.log(e)
				this.options[2].info++
			}
		}
	}
</script>

<style lang="scss">
	.good-detail{
		background-color: $hm-shop-gray;
		.swiper{
			background-color: white;
			width: 100%;
			height: 720rpx;
			margin-bottom: 12rpx;
			.img{
				width: 100%;
				height: 100%;
				img{
					height: 100%;
					width: 100%;
				}
			}
		
		}
		.box1{
			background-color: white;
			padding: 0 20rpx;
			margin-bottom: 12rpx;
			.price{
				height: 80rpx;
				text{
					line-height: 80rpx;
					padding-right: 20rpx;
					color: #c93a3a;
					font-size: 48rpx;
				}
				del{
					color: #c7c7c7;
					font-size: 36rpx;
				}
				
			}
			.title{
				line-height: 60rpx;
				font-size: 36rpx;
				color: #333333;
				
			}
			.info{
				line-height: 48rpx;
				font-size: 32rpx;
				color: #999999;
			}
		}
		.box2{
			background-color: white;
			width: 100%;
			.img{
				width: 100%;
				
			}
		}
		.box3{
			height: 100rpx;
		}
		.bottomNav{
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	}
</style>
