/** 请求响应结果 */
export type allHttpRes<T> = {
  /** 状态码 */
  code: number
  /** 消息 */
  msg: string
  /** 数据 */
  data: T
}