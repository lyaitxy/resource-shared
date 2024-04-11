import { http } from '@/utils/http'
import type { allHttpRes } from '@/types/allHttpRes'
import type { resource } from '@/types/resource'
//获取热门资源
export const getTop10ResourceAPI = () => {
  return http<allHttpRes<resource[]>>({
    url: '/resource/findTop10',
    method: 'GET'
  })
}