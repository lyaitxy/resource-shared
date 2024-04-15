<template>
  <!--头像， 用户名，电话， -->
  <div class="userInfo">
    <div class="userInfo-item">
        <div class="avatar-text">头像:</div>
        <img class="avatar-img" :src="avatar" alt="" />
        <button class="avatar-btn" type="primary" @click="changeAvatar">更换头像</button>
    </div>
    <div class="userInfo-item">
      <div class="username-text">用户名:</div>
      <div class="username">{{ username }}</div>
    </div>
    <div class="userInfo-item">
      <div class="phone-text">电话:</div>
      <div class="phone">{{ phone }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMemberStore } from '@/stores/modules/member'
import { onShow } from '@dcloudio/uni-app';
import { postAvatarAPI } from '@/services/user';
const memberStore = useMemberStore();
let username = ref('');
let avatar = ref('');
let phone = ref('');

const changeAvatar = () => {
  // 上传文件
  uni.chooseImage({
    count: 1,
    success: (res) => {
      // 上传文件
      uni.uploadFile({
        url: 'http://localhost:8081/upload',
        filePath: res.tempFilePaths[0],
        name: 'file',
        success: async (res) => {
          console.log(JSON.parse(res.data).data);
          let result = await postAvatarAPI({username: memberStore.profile?.username!,avatar: JSON.parse(res.data).data});
          if(result.code === 200) {
            memberStore.profile!.avatar = JSON.parse(res.data).data;
            avatar.value = JSON.parse(res.data).data;
          } else {
            uni.showToast({
              title: '修改失败',
              icon: 'none'
            })
          }
        }
      })
    }
  })
}
onShow(() => {
  if(memberStore.profile) {
    username.value = memberStore.profile.username;
    avatar.value = memberStore.profile.avatar;
    phone.value = memberStore.profile.phone || '未填写';
  }
})
</script>

<style scoped lang="scss">
.userInfo-item {
  padding: 10px 20px;
  border-bottom: 1px solid #f0f0f0;
  .avatar-text {
    position: relative;
    top: 20px;
    font-size: 20px;
  }
  .avatar-img {
    position: relative;
    left: 16%;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .avatar-btn{
    width: 100px;
    height: 50px;
    position: absolute;
    left: 60%;
    top: 10%;
  }
  .username-text {
    position: relative;
    top: 15px;
    font-size: 20px;
  }
  .username {
    position: relative;
    top:-10px;
    left: 30%;
    font-size: 20px;
  }
  .phone-text {
    position: relative;
    top: 15px;
    font-size: 20px;
  }
  .phone {
    position: relative;
    top:-10px;
    left: 30%;
    font-size: 20px;
  }
}

</style>