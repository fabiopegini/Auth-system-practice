import { type UserType } from "../schemas/user_types"

class ResJSON {
  public data: UserType[]
  public ok: boolean
  public msg: string

  constructor(data: UserType[], ok: boolean, msg: string) {
    this.data = data
    this.ok = ok
    this.msg = msg
  }
}

const UserNotFoundJSON = new ResJSON([], false, 'User not found')
const InvalidIDJSON = new ResJSON([], false, 'Invalid id')

export = { ResJSON, UserNotFoundJSON, InvalidIDJSON }