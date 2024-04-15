<template>
  <view class="rss-search">
    <!-- 这里放一个搜索框 -->
    <uni-search-bar
      class="search-bar"
      v-model="searchValue"
      placeholder="请输入搜索关键词"
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
    <button
      v-if="isSearch"
      class="cancel-search-button"
      hover-class="button-hover"
      @click="cancelSearch"
    >
      取消搜索
    </button>
  </view>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import { getSearchResourceAPI } from "@/services/resources";
const emit = defineEmits(["click_search", "click_cancelSearch"]);
let searchValue = ref("");
defineProps<{
  isSearch: boolean;
}>();
const search = async() => {
    if(searchValue.value === ""){
      uni.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      });
      return;
    }
    let res = await getSearchResourceAPI({keyword: searchValue.value});
    emit('click_search', res.data);
};
const cancelSearch = () => {
    searchValue.value = "";
    emit('click_cancelSearch');
};
</script>
<style scoped lang='scss'>
.rss-search {
  width: 100%;
  display: flex;
  justify-content: center;
  .search-bar {
    position: relative;
    left: -5%;
  }
  .search-button {
    position: relative;
    top: 10px;
    width: 30%;
    height: 40px;
    line-height: 35px;
    color: #020202;
    border: 1px solid #020202;
    border-radius: 5px;
  }
}
</style>