export type resource = {
  /** 资源id */
  id: number
  /** 资源描述 */
  description: string
  /** 资源内容 */
  content: string
  /** 资源被收藏量 */
  liked: number
  /** 资源发布者 */
  publisher_id: number
  /** 资源发布者 */
  publisher: string
  /** 资源发布时间 */
  publish_time: string
  /** 资源更新时间 */
}