import { useMemberStore } from "@/stores"
const baseURL = "http://47.107.84.68:8081"
//请求拦截器
const httpInterceptor = {
  //拦截前触发
  invoke(options: UniApp.RequestOptions) {
    if(!options.url.startsWith('http')){
      options.url = baseURL + options.url
    }
    options.timeout = 10000
    options.header = {
      'content-type': 'application/json',
      'Authorization': useMemberStore().token
    }
  }
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

export const http = <T>(options: UniApp.RequestOptions) => {
  // 返回一个promise对象
  return new Promise<T>((resolve, reject) => {
    uni.request({
        ...options,
        header: {
            'content-type': 'application/json' // 默认值
        },
       // 响应成功
        success(res) {
        resolve(res.data as T)
      },
      // 响应失败
      fail(err) {
        reject(err)
      },
    })
})

}
  