<template>
  <view class="desc">{{ resourceDetail?.description}}</view>
  <view class="content">{{ resourceDetail?.content }}</view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import type { resource } from '@/types/resource';
const resourceDetail = ref<resource>();
onLoad((option:any) => {
  let resource = JSON.parse(decodeURIComponent(option.item));
  resourceDetail.value = resource;
})
</script>

<style scoped lang="scss">

</style>