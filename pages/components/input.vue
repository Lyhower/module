<template>
	<view class="temp"> :style="tempList"
		<u-contentInfo @change="change" :dataSource="dataSource" inputType="modal" :response="response">
		</u-contentInfo>
		<button class="button" type="default" @tap="changes()">修改</button>
	</view>
</template>

<script>
	import uContentInfo from "@/components/contentInfo/index.vue"
	import "@/utils/dateFormat";
	import app from "@/utils/app";
	import util from "@/utils/util";
	import menu from "@/utils/menus";
	export default {
		components: {
			uContentInfo,
		},
		data() {
			return {
				tempList:{backgroundColor:"red"},
				dataSource: {
					base: [{
						accessMode: "WebReadWrite",
						columnLockType: "none",
						convertType: "None",
						costPrice: false,
						dataType: "java.lang.String",
						fieldName: "userId",
						hidden: false,
						inputType: "InputText",
						length: 0,
						name: "用户编号",
						notes: "用户编号",
						position: 0,
						propertyId: "userId",
						propertyName: "用户编号",
						propertyRequired: true,
						propertyValue: undefined,
						required: true,
						showType: "Text",
						width: "100px",
						wxDisplay: "None"
					}]
				},
				response: [{
					fieldName: "base",
					// name: "基本信息",
					hidden: true
				}],
			}
		},
		onLoad() {},
		methods: {
			changes(){
				console.log(document.getElementsByTagName('body')[0].style)
				document.getElementsByTagName('body')[0].style.setProperty('--test', 'yellow');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/uni.scss';
	.temp{
		background-color: var(--test, red); 
		height: 100%;
	}
</style>
