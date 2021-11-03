<template>
	<view class="content">
		<view class="text-area um">
			<button class="item-box up" type="default" @click="toNav()">测试表单组件</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			toNav() {
				uni.navigateTo({
					url: '../../../pages/components/input'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	/* .item-box{
		width: 100%;
	} */

	.text-area {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 100%;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
