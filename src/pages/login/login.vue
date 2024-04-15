<template>
  <view>
    <!-- 一个登录表单 -->
    <form
      @submit="submit"
      @reset="reset"
      @register="toRegister"
    >
      <text>用户名</text>
      <input type="text" v-model="username" placeholder="请输入用户名" />
      <text>密码</text>
      <input type="password" v-model="password" placeholder="请输入密码" />
      <button form-type="submit">登录</button>
      <button form-type="reset">重置</button>
    </form>
    <button type="primary" @click="toRegister">注册</button>
    <text>注：注册后自动登录</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {postLoginAPI, postRegisterAPI} from '@/services/user'
import { useMemberStore } from '@/stores'
import type { loginRes } from '@/types/member'

const memberStore = useMemberStore()
let username = ref('admin')
let password = ref('123456')
const submit = async() => {
  //发送登录请求
  const res = await postLoginAPI({username: username.value, password: password.value})
  if(res.code === 200) {
    //登录成功
    //保存用户信息
    memberStore.setProfile(res.data.user);
    //保存token
    memberStore.setToken(res.data.token);
    //跳转到个人中心
    uni.switchTab({
      url: '/pages/my/my'
    })
  } else {
    //登录失败
    uni.showToast({
      title: res.msg,
      icon: 'none'
    })
  }
}
const reset = () => {
  username.value = ''
  password.value = ''
}
const toRegister = async() => {
  let res = await postRegisterAPI({username: username.value, password: password.value})
  console.log(res);
  if (res.code === 400) {
    uni.showToast({
      title: res.msg + '，请重新输入',
      icon: 'none'
    })
  } else if(res.code === 200){
    //注册成功
    //保存用户信息
    memberStore.setProfile(res.data.user);
    //保存token
    memberStore.setToken(res.data.token);
    //跳转到个人中心
    uni.switchTab({
      url: '/pages/my/my'
    })
  }
}
</script>

<style scoped lang="scss">
</style>