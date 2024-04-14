<template>
 <editor id="content" class="ql-container1" read-only="true">
        </editor>
  <view>附件列表：</view>
  <view class="file-list">
    <view class="file-item" v-for="(item, index) in files" :key="index">
      <text>{{ item }}</text>
    </view>
  </view>
</template>

<script lang="ts">
// import { onLoad } from '@dcloudio/uni-app';
// import { ref } from 'vue';
// import type { resource } from '@/types/resource';
// const resourceDetail = ref<resource>();
// onLoad((option:any) => {
//   let resource = JSON.parse(decodeURIComponent(option.item));
//   resourceDetail.value = resource;
//   let content = JSON.parse(resourceDetail.value!.content);
  
// })
export default {
  data() {
    return {
      files: []
    }
  },
  onLoad(option:any) {
    let resource = JSON.parse(decodeURIComponent(option.item));
    // 将resource.fileList 以数组形式存储
    this.files = resource.fileList.split(' ');
    let content = JSON.parse(resource.content);
    uni.createSelectorQuery().in(this).select('#content').context((res:any) => {
      res.context.setContents({
        delta: content
      });
    }).exec();
  }
}
</script>

<style scoped lang="scss">

</style>