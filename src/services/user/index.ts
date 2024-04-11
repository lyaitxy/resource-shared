import { http } from '@/utils/http'
import type { allHttpRes } from '@/types/allHttpRes'
import type { loginRes } from '@/types/member'
// 登录接口
export const postLoginAPI = (data: { username: string, password: string }) => {
  return http<allHttpRes<loginRes>>({
    url: '/user/login',
    method: 'POST',
    data,
  })
}