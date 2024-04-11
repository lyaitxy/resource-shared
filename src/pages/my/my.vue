<template>
  <view>
    <!--个人头像与名称-->
    <view class="user-info" v-if="isLogin">
      <image src="https://img.yzcdn.cn/vant/cat.jpeg" class="avatar"></image>
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
      <view class="item">
        <text class="text">发布资源</text>
        <uni-icons type="right" size="20" color="#999"></uni-icons>
      </view>
      <view class="item">
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
import { postLoginAPI } from '@/services/user';
const memberStore = useMemberStore();
// 获取用户信息
const userInfo = ref(memberStore.profile);
const username = ref('');

//是否登录
const isLogin = ref(false);
isLogin.value = memberStore.profile ? true : false;
//跳转到登录界面
const toLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  })
}
const toSetting = () => {
  uni.navigateTo({
    url: '/pagesMember/settings/settings'
  })
}
const logining = async(username: string, password: string) => {
  const res = await postLoginAPI({username, password});
  console.log(res);
}
const openLiked = () => {
  uni.showToast({
    title: '打开我的收藏',
    icon: 'success'
  })
}
onShow(() => {
  username.value = memberStore.profile?.username || '';
})
</script>

<style scoped lang="scss">
.user-info {
  width: 70%;
  display: flex;
  align-items: center;
  padding: 20px;
  border: 1px solid #000;
  /* 居中 */
  margin: 0 auto;
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .name {
    margin-left: 20px;
    font-size: 24px;
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
    padding: 20px 0;
    border-bottom: 1px solid #000;
    .text {
      font-size: 20px;
    }
  }
}
</style>