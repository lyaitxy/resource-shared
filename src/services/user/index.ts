import { http } from '@/utils/http'
import type { allHttpRes } from '@/types/allHttpRes'
// 登录接口
export const postLoginAPI = (data: { username: string, password: string }) => {
  return http<allHttpRes>({
    url: '/login',
    method: 'POST',
    data,
  })
}