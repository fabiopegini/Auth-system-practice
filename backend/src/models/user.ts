import { type UserType } from '../schemas/user_types'

const userSchemas = require('../schemas/user')
const { UserModel: User } = userSchemas


class UserModel {

  static getAll = async () => {
    const users = await User.find()
    return users
  }

  static getById = async ({ id } : { id: string })  => {
    const user = await User.findById(id)
    return user
  }

  static getByEmail = async ( { email } : { email: string }) => {
    const user = await User.find({ email })
    return user
  }

  static create = async ({ data } : { data: UserType }) => {
    const newUser = {
      createdAt: new Date(Date.now()),
      ...data
    }

    const user = await User.save(newUser)
    return user
  }

  static delete = async ({ id }: { id: string }) => {
    const user = await User.findByIdAndDelete(id)
    return user
  }

  static update = async ({ id, data } : { id: string, data: UserType  }) => {
   const user = await User.findByIdAndUpdate(id, data, { returnDocument: 'after' })
   return user
  }
}

export = UserModel