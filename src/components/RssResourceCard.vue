<template>
	
    <uni-card padding="10px 0" v-for="item in list" :key="item.id" @tap="toDetail(item)">
				<text class="uni-body uni-mt-5">{{ item.description }}</text>
				<view class="card-actions">
					<view class="card-actions-item" @click="actionsClick('分享')">
						<uni-icons type="pengyouquan" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">分享</text>
					</view>
					<view class="card-actions-item" @click="actionsClick('点赞')">
						<uni-icons type="heart" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">点赞{{ item.liked }}</text>
					</view>
				</view>
		</uni-card>
</template>

<script setup lang='ts'>
import type { resource } from '@/types/resource'
const actionsClick = (action: string) => {
  uni.showToast({
    title: action,
    icon: 'success'
  })
}
const toDetail = (item:resource) => {
  uni.navigateTo({
    url: `/pages/resourceDetail/resourceDetail?item=` + encodeURIComponent(JSON.stringify(item))
  })
};
defineProps<{
  list: resource[]
}>()
</script>
<style scoped lang='scss'>
.card-actions{
  display: flex;
  justify-content: space-between;
}
</style>