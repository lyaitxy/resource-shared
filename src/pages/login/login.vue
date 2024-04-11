<template>
  <view>
    <!-- 一个登录表单 -->
    <form
      @submit="submit"
      @reset="reset"
    >
      <text>用户名</text>
      <input type="text" v-model="username" placeholder="请输入用户名" />
      <text>密码</text>
      <input type="password" v-model="password" placeholder="请输入密码" />
      <button form-type="submit">提交</button>
      <button form-type="reset">重置</button>
    </form>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {postLoginAPI} from '@/services/user'
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
      title: res.message,
      icon: 'none'
    })
  }
}
const reset = () => {
  username.value = ''
  password.value = ''
}

</script>

<style scoped lang="scss">
</style>