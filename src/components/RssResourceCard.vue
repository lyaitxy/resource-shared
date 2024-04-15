<template>

    <uni-card padding="10px 0" v-for="item in list" :key="item.id" @tap="toDetail(item)">
				<text class="uni-body uni-mt-5">{{ item.description }}</text>
				<view class="card-actions">
					<view class="card-actions-item">
						<uni-icons type="person" size="18" color="#999"></uni-icons>
						<text class="card-actions-item-text">{{ item.publisher}} {{ item.publish_time }}</text>
					</view>
					<view class="card-actions-item" >
						<text class="card-actions-item-text">收藏量:{{ item.liked }}</text>
					</view>
				</view>
		</uni-card>
</template>

<script setup lang='ts'>
import type { resource } from '@/types/resource'
import { useMemberStore } from '@/stores/modules/member'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
const memberStore = useMemberStore()
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