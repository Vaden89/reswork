export type UserType = 'guest' | 'authenticated'

export type User = {
  id: string
  type: UserType
}
