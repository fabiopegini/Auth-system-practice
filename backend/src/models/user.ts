import { type UserType } from '../schemas/user_types'

import userSchemas = require('../schemas/user')
const { UserModel: User } = userSchemas


class UserModel {
  static getAll = async () => {
    const users = await User.find()
    return users
  }

  static getById = async ({ id } : { id: string })  => {
    const user = await User.findById(id)
    return [user]
  }

  static getByEmail = async ({ email } : { email: string }) => {
    const user = await User.find({ email })
    return user
  }

  static create = async ({ data } : { data: UserType }) => {
    const newUser = new User({ ...data })

    const matchingUsers = await User.find({ email: data.email })
    if(matchingUsers.length > 0) return []

    const user = await newUser.save()
    return [user]
  }

  static delete = async ({ id }: { id: string }) => {
    const user = await User.findByIdAndDelete(id)
    return [user]
  }

  static update = async ({ id, data } : { id: string, data: UserType }) => {
    const user = await User.findByIdAndUpdate(id, data, { returnDocument: 'after' })
    return [user]
  }
}

export = UserModel