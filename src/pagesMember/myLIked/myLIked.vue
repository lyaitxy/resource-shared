<template>
  <RssResourceCard :list="likedList"></RssResourceCard>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { resource } from '@/types/resource'
import { getLikedResourceAPI } from '@/services/resources'
import { useMemberStore } from '@/stores/modules/member'
import { onShow } from '@dcloudio/uni-app'
const memberStore = useMemberStore();
const likedList = ref<resource[]>([])
const getLikedResource = async() => {
  let res = await getLikedResourceAPI({user_id: memberStore.profile?.id!});
  likedList.value = res.data;
}
onShow(() => {
  // 获取收藏资源
  getLikedResource();
})
</script>

<style scoped lang="scss">

</style>