<template>
  <RssEditor ref="myEditor" @getcontent="getcontent"></RssEditor>

  <view>资源描述：</view>
  <input
    v-model="description"
    placeholder=""
    placeholder-class="input-placeholder"
  />

  <view>
    <button type="primary" @click="publish">发布</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { postAddResourceAPI } from '@/services/resources'
import { useMemberStore } from '@/stores/modules/member'
const memberStore = useMemberStore()
let description = ref('')
let resourceDetail = ref("")
const myEditor = ref()
const publish = async() => {
  await myEditor.value.getContent()
}
const getcontent = (content: any) => {
  resourceDetail.value = JSON.stringify(content)
  addResource()
}
// 新增资源方法
const addResource = async () => {
  // 调用新增资源接口
  const res = await postAddResourceAPI({
    desc: description.value,
    content: resourceDetail.value,
    publisher_id: memberStore.profile?.id!
  })
  if (res.code === 200) {
    // 新增成功
    uni.showToast({
      title: '新增成功',
      icon: 'success'
    })
    // 跳转到我的发布
    uni.navigateTo({
      url: '/pagesMember/myPublished/myPublished'
    })
    
  } else {
    // 新增失败
    uni.showToast({
      title: res.message,
      icon: 'none'
    })
  }
}
</script>

<style scoped lang="scss">
.tools {
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
}
</style>