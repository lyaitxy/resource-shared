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

//获取搜索资源
export const getSearchResourceAPI = (data: { keyword: string }) => {
  return http<allHttpRes<resource[]>>({
    url: '/resource/findResourceByKeyword',
    method: 'POST',
    data
  })
}

//获取收藏资源
export const getLikedResourceAPI = (data: {user_id: number}) => {
  return http<allHttpRes<resource[]>>({
    url: '/resource/findLikedByUserId',
    method: 'POST',
    data
  })
}

//获取用户发布的资源
export const getPublishedResourceAPI = (data: {publisher_id: number}) => {
  return http<allHttpRes<resource[]>>({
    url: '/resource/findResourceByPublisherId',
    method: 'POST',
    data
  })
}

//新增资源
export const postAddResourceAPI = (data: {desc: string, content: string, publisher_id: number, fileList: string}) => {
  return http<allHttpRes<resource>>({
    url: '/resource/add',
    method: 'POST',
    data
  })
}