<template>
  <view class="rss-search">
    <!-- 这里放一个搜索框 -->
    <uni-search-bar
      v-model="searchValue"
      placeholder="请输入想要搜索的资源"
      bgColor="#EEEEEE"
      cancelButton="none"
      @confirm="search"
    />
  </view>
</template>

<script setup lang='ts'>
import { ref } from "vue";
let searchValue = ref("");
const search = () => {
  console.log(searchValue.value);
  uni.showToast({
    title: searchValue.value,
    icon: "success",
  });
};
</script>
<style scoped lang='scss'>
.rss-search {
  width: 100%;
  .search-bar {
    width: 100%;
  }
}
</style>