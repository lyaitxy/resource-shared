<template>
 <editor id="content" class="ql-container1" read-only="true">
        </editor>
  <view class="file-list">
    <view class="file-item" v-for="(item, index) in files" :key="index">
      <text>附件{{index + 1}}：</text>
      <uni-link
        :href="item"
        :text="item"
      />
    </view>
  </view>

  <!-- 下面一栏：有联系作者和收藏两种功能 -->
  <view class="options">
    <uni-fav
      class="fav"
      :checked="isLiked"
      @click="liked"
    />
    <button type="primary" size="small">联系作者</button>
  </view>
</template>

<script lang="ts">
import { getLikedResourceAPI,postUnlikeResourceAPI,postLikeResourceAPI } from '@/services/resources';
import { useMemberStore } from '@/stores/modules/member';
export default {
  data() {
    return {
      files: [],
      resource_id: -1,
      userLikedList: <any>[],
      isLiked: false
    }
  },
  methods: {
    async liked(){
      this.isLiked = !this.isLiked;
      // 如果this.isLiked为true，说明用户点击了收藏按钮，需要将该资源加入用户的收藏列表
      if(this.isLiked) {
        // 调用收藏资源接口
        let res = await postLikeResourceAPI({user_id: useMemberStore().profile?.id!, resource_id: this.resource_id});
      } else {
        // 如果this.isLiked为false，说明用户点击了取消收藏按钮，需要将该资源从用户的收藏列表中删除
        let res = await postUnlikeResourceAPI({user_id: useMemberStore().profile?.id!, resource_id: this.resource_id});
      }
    }
  },
  async onLoad(option:any) {
    let resource = JSON.parse(decodeURIComponent(option.item));
    this.resource_id = resource.resource_id;
    // 将resource.fileList 以数组形式存储
    if(resource.fileList === null || resource.fileList === "") {
      this.files = [];
    } else {
      this.files = resource.fileList.split(' ');
      // 删除最后一个空格
      this.files.pop();
    }
    let content = JSON.parse(resource.content);
    uni.createSelectorQuery().in(this).select('#content').context((res:any) => {
      res.context.setContents({
        delta: content
      });
    }).exec();

    // 获取用户收藏列表
    let res = await getLikedResourceAPI({user_id: useMemberStore().profile?.id!})
    this.userLikedList = res.data.map((item:any) => item.resource_id);
    // 判断该资源是否被用户收藏
    this.isLiked = this.userLikedList.includes(this.resource_id);
  },
}
</script>

<style scoped lang="scss">
.fav{
  //让该按钮在屏幕的右边
  position: relative;
  left: 80%;
}
</style>