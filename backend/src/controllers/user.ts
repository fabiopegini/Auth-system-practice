import type e = require("express")
import { type UserInput } from "../schemas/user"

const UserModel = require('../models/user')

class ResponseJSON {
  public data: UserInput[]
  public ok: boolean
  public msg: string

  constructor(data: UserInput[], ok: boolean, msg: string) {
    this.data = data
    this.ok = ok
    this.msg = msg
  }
}

const UserNotFoundJSON = new ResponseJSON([], false, 'User not found')

class UserController {
  // Add validations and refactor responses
  static getAll: e.RequestHandler = async (req, res, next) => {
    try {
      const users: UserInput[] = await UserModel.getAll()

      if(!users) return res.status(404).json(new ResponseJSON([], false, 'Could not found any users'))

      return res.status(200).json(new ResponseJSON(users, true, 'All users found'))
    } catch (error) {
      next(error)
    }
  }

  static getById: e.RequestHandler = async (req, res, next) => {
    const { id } = req.params

    try {
      const user = await UserModel.getById({ id })

      if(!user) return res.status(404).json(UserNotFoundJSON)

      return res.status(200).json(new ResponseJSON([user], true, 'User found'))
    } catch(error) {
      next(error)
    }
  }

  static getByEmail: e.RequestHandler = async (req, res, next) => {
    const { email } = req.body

    try {
      const user = await UserModel.getByEmail({ email })

      if(!user) return res.status(404).json(UserNotFoundJSON)
      
      return res.status(200).json(new ResponseJSON([user], true, 'User found'))
    } catch (error) {
      next(error)
    }
  }

  static create: e.RequestHandler = async (req, res, next) => {
    const body = req.body

    try {
      const user = await UserModel.create({data: body})

      if(!user) return res.status(404).json(new ResponseJSON([], false, 'Could not create the user'))

      return res.status(201).json(new ResponseJSON(user, true, 'User created successfully'))
    } catch (error) {
      next(error)
    }
  } 

  static delete: e.RequestHandler = async (req, res, next) => {
    const { id } = req.params

    const user = await UserModel.delete({ id })

    if(!user) return res.status(404).json(new ResponseJSON([], false, 'The user to delete was not found'))

    return res.status(200).json(new ResponseJSON([user], true, 'User successfully deleted')) 
  }

  static update: e.RequestHandler = async (req, res, next) => {
    const { id } = req.params
    const body = req.body

    const user = await UserModel.update({ id, data: body })

    if(!user) return res.status(404).json(new ResponseJSON([], false, 'Could not update the user'))

    return res.status(200).json(new ResponseJSON([user], true, 'User successfully updated'))
  }
}

module.exports = UserController