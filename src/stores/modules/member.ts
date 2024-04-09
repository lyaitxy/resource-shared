import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { memberItem } from '@/types/member'
//定义store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 定义响应式数据
    const profile = ref<memberItem>()
    //保存用户信息
    const setProfile = (newProfile: memberItem) => {
      profile.value = newProfile
    }
    //清除用户信息
    const clearProfile = () => {
      profile.value = undefined
    }
    //返回数据
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  {
    // 持久化存储
    persist: {
      storage: {
        setItem: (key, value) => uni.setStorageSync(key, value),
        getItem: (key) => uni.getStorageSync(key),
      }
    }
  }
)