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

// 注册接口
export const postRegisterAPI = (data: { username: string, password: string }) => {
  return http<allHttpRes<loginRes>>({
    url: '/user/register',
    method: 'POST',
    data,
  })
}

// 更换头像
export const postAvatarAPI = (data: { username:string, avatar: string}) => {
  return http<allHttpRes<string>>({
    url: '/user/updateAvatar',
    method: 'POST',
    data,
  })
}