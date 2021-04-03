<template>
	<newsList :newsMsg="newsMsg"></newsList>
</template>

<script>
	import newsList from 'components/newsList.vue'
	export default {
		data() {
			return {
				newsMsg: [],
				pageIndex: 1,
				isEnd: false
			}
		},
		components: {
			newsList
		},
		onLoad() {
			this.getNewsMsg();
		},
		onReachBottom() {
			this.pageIndex++;
			if(this.isEnd)return;
			this.getNewsMsg();
		},
		methods: {
			getNewsMsg() {
				this.$myRequest({
					url: '/api/newsMsg?pageIndex=' + this.pageIndex,
					success: (res) => {
						if (res.data.status === 0) {
							if(res.data.data.length === 0){
								this.isEnd = true;
							}
							this.newsMsg = [...this.newsMsg, ...res.data.data];
						} else {
							uni.showToast({
								title: "获取资讯失败",
								duration: 2000
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
