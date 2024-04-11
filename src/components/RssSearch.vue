<template>
  <view class="rss-search">
    <!-- 这里放一个搜索框 -->
    <uni-search-bar
      v-model="searchValue"
      placeholder="请输入想要搜索的资源"
      bgColor="#EEEEEE"
      cancelButton="none"
    />
    <button
    class="search-button"
      hover-class="button-hover"
      @click="search"
    >
    搜索
    </button>
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
  display: flex;
  justify-content: center;
  .search-bar {
    width: 50%;
  }
  .search-button {
    width: 30%;
    height: 40px;
    color: #020202;
    text-align: center;
    border: 1px solid #020202;
    border-radius: 5px;
  }
}
</style>