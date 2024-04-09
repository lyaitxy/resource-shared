import { useMemberStore } from "@/stores"
//封装请求
interface Data<T> {
  code: string,
  msg: string,
  result: T
}
export const http = <T>(options: UniApp.RequestOptions) => {
  // 返回一个promise对象
  return new Promise((resolve, reject) => {
    uni.request({
        ...options,
        header: {
            'content-type': 'application/json' // 默认值
        },
       // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 400) {
          // 400错误  -> 清理用户信息，跳转到登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
})

}
  