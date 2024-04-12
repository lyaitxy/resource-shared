<template>
  <div class="settings">settings</div>
  <button
    hover-class="button-hover"
    @click="loginOut"
  >
    退出登录
  </button>
</template>

<script lang="ts" setup>
import { useMemberStore } from '@/stores/modules/member'
const memberStore = useMemberStore()
const loginOut = () => {
  uni.showModal({
    title: '提示',
    content: '确定退出登录吗？',
    success: function (res) {
      if (res.confirm) {
        //清除用户信息
        memberStore.clearProfile();
        //清除token
        memberStore.clearToken();
        //跳转到登录页
        uni.switchTab({
          url: '/pages/my/my'
        })
      }
    }
  });

}
</script>

<style scoped lang="scss">

</style>