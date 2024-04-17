<template>
  <view>
    <!--个人头像与名称-->
    <view class="user-info" v-if="isLogin" @tap="touserInfo">
      <image :src="avatar" class="avatar"></image>
      <text class="name">{{ username }}</text>
    </view>
    <view v-else>
      <text class="name" @tap="toLogin">点击登录</text>
    </view>
    <!-- 一条线 -->
    <view class="line"></view>
    <view class="detail"> 
      <view class="item" @tap="openLiked">
        <text class="text">我的收藏</text>
        <uni-icons type="right" size="20" color="#999"></uni-icons>
      </view>
      <view class="item" @tap="toPublished">
        <text class="text">我的发布</text>
        <uni-icons type="right" size="20" color="#999"></uni-icons>
      </view>
      <view class="item" @tap="toAddResource">
        <text class="text">发布资源</text>
        <uni-icons type="right" size="20" color="#999"></uni-icons>
      </view>
      <view class="item" @tap="touserInfo">
        <text class="text">个人信息</text>
        <uni-icons type="right" size="20" color="#999"></uni-icons>
      </view>
      <view class="item" @tap="toSetting">
        <text class="text">设置</text>
        <uni-icons type="right" size="20" color="#999"></uni-icons>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useMemberStore } from '@/stores';
const memberStore = useMemberStore();
// 获取用户信息
let username = ref('');
let avatar = ref('');
//是否登录
const isLogin = ref(false);
//跳转到登录界面
const toLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  })
}
//跳转到设置界面
const toSetting = () => {
  uni.navigateTo({
    url: '/pagesMember/settings/settings'
  })
}
//跳转到我的发布
const toPublished = () => {
  if(memberStore.profile === undefined) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    return;
  }
  uni.navigateTo({
    url: '/pagesMember/myPublished/myPublished'
  })
}
//跳转到发布资源
const toAddResource = () => {
  if(memberStore.profile === undefined) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    return;
  }
  uni.navigateTo({
    url: '/pagesMember/publishResource/publishResource'
  })
}
//跳转到个人信息
const touserInfo = () => {
  if(memberStore.profile === undefined) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    return;
  }
  uni.navigateTo({
    url: '/pagesMember/userInfo/userInfo'
  })
}
const openLiked = () => {
  if(memberStore.profile === undefined) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    return;
  }
  uni.navigateTo({
    url: '/pagesMember/myLIked/myLIked'
  })
}
onShow(() => {
  username.value = memberStore.profile?.username || '';
  avatar.value = memberStore.profile?.avatar || '';
  isLogin.value = memberStore.profile ? true : false;
})
</script>

<style scoped lang="scss">
.user-info {
  width: 70%;
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #000;
  /* 居中 */
  margin: 0 auto;
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    //border: 1px solid #f9f5f5;
    //阴影
    box-shadow: 0 0 5px #b9b8b8;
  }
  .name {
    margin-left: 40px;
    font-size: 20px;
  }
}
.line {
  width: 100%;
  height: 1px;
  background-color: #000;
  margin-top: 20px;
}
.detail {
  width: 70%;
  margin: 0 auto;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #000;
    .text {
      font-size: 20px;
    }
  }
}
</style>