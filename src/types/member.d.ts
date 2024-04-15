/** 个人信息类型 */
export type memberItem = {
  id: number
  /** 用户昵称 */
  username: string
  /** 用户 */
  password: string
  /** 联系方式 */
  phone: string
  /** 头像 */
  avatar: string
}

export type loginRes = {
  /** 用户信息 */
  user: memberItem
  /** token */
  token: string
}