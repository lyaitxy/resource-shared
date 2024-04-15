<template>
  <RssResourceCard :list="publishedList"></RssResourceCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getPublishedResourceAPI } from '@/services/resources'
import type { resource } from '@/types/resource';
import { useMemberStore } from '@/stores/modules/member'
import { onShow } from '@dcloudio/uni-app'
const memberStore = useMemberStore();
const publishedList = ref<resource[]>([])
const getPublishedResource = async() => {
  let res = await getPublishedResourceAPI({publisher_id: memberStore.profile?.id!});
  publishedList.value = res.data;
}
onShow(() => {
  // 获取发布资源
  getPublishedResource();
})
</script>

<style scoped lang="scss">

</style>