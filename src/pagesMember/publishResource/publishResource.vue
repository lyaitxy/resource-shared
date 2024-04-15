<template>
  <RssEditor ref="myEditor" @getcontent="getcontent"></RssEditor>

  <view>资源描述：</view>
  <input
    v-model="description"
    placeholder=""
    placeholder-class="input-placeholder"
  />
  <view>选择附件(文件链接复制到浏览器获取文件):</view>
  <button
    hover-class="button-hover"
    @click="uploadFile"
  >
    选择文件
  </button>
  
  <view class="fileList">
    <view class="fileItem" v-for="(item, index) in files" :key="index">
      <uni-link
        :href="item"
        :text="item"
      />
    </view>
  </view>
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
let fileList = ref("")
let files = ref<any>([])
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
    publisher_id: memberStore.profile?.id!,
    fileList: fileList.value,
    publisher: memberStore.profile?.username!
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
// 上传文件
const uploadFile = () => {
  // 选择文件
  uni.chooseMessageFile({
    count: 1,
    type: 'file',
    success: (res) => {
      // 将文件上传到服务器
      const file = res.tempFiles[0]
      uni.uploadFile({
        url: 'http://localhost:8081/upload',
        filePath: file.path,
        name: 'file',
        success: (res) => {
          // 上传成功
          const data = JSON.parse(res.data)
          files.value.push(data.data)
          fileList.value += data.data + " "
        },
        fail: (err) => {
          // 上传失败
          uni.showToast({
            title: '上传文件失败',
            icon: 'none'
          })
        }
      })
    },
    fail: (err) => {
      // 选择失败
      uni.showToast({
        title: '选择文件失败',
        icon: 'none'
      })
    }
  })
}
</script>

<style scoped lang="scss">
.tools {
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
}
.fileList {
  display: flex;
  flex-wrap: wrap;
  .fileItem {
    font-size: xx-small;
  }
}
</style>