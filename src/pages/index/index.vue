<template>
  <view class="content">
    <view class="reseach">
      <!-- 这里放一个搜索框 -->
      <RssSearch></RssSearch>

    </view>

    <view class="liked">
      <!-- 这里放一个猜你喜欢模块 -->
      <view>热门前10资源</view>
      <RssResourceCard :list="likedList"></RssResourceCard>
    </view>

  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { resource } from '@/types/resource'
import {getTop10ResourceAPI} from '@/services/resources'
const likedList = ref<resource[]>([])
// 获取热门资源方法
const getHotResource = async() => {
  // 获取热门资源
  let res = await getTop10ResourceAPI();
  likedList.value = res.data;
  console.log(likedList.value);
}
onLoad(() => {
  // 获取热门资源
  getHotResource();
})
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.liked {
  width: 100%;

  border: 1px solid #000;
}

</style>
