import type e = require("express")
import UserModel = require('../models/user')
import { type UserRegister } from "../schemas/user_types"
import userSchemas = require('../schemas/user')
const bcrypt = require('bcrypt')

const { validateUser, validatePartialUser } = userSchemas

class ResJSON {
  public data: UserRegister[]
  public ok: boolean
  public msg: string

  constructor(data: UserRegister[], ok: boolean, msg: string) {
    this.data = data
    this.ok = ok
    this.msg = msg
  }
}

const UserNotFoundJSON = new ResJSON([], false, 'User not found')
const InvalidIDJSON = new ResJSON([], false, 'Invalid id')

class UsersController {
  static getAll: e.RequestHandler = async (req, res, next) => {
    try {
      const users: UserRegister[] = await UserModel.getAll()

      if(!users) return res.status(404).json(new ResJSON([], false, 'Could not found any users'))

      return res.status(200).json(new ResJSON(users, true, 'All users found'))
    } catch (error) {
      next(error)
    }
  }

  static getById: e.RequestHandler = async (req, res, next) => {
    const { id } = req.params

    if(typeof id !== 'string') return res.status(400).json(InvalidIDJSON)

    try {
      const user = await UserModel.getById({ id })

      if(!user) return res.status(404).json(UserNotFoundJSON)

      return res.status(200).json(new ResJSON([user], true, 'User found'))
    } catch(error) {
      next(error)
    }
  }

  static getByEmail: e.RequestHandler = async (req, res, next) => {
    const { email } = req.body

    try {
      const user = await UserModel.getByEmail({ email })

      if(!user) return res.status(404).json(UserNotFoundJSON)

      return res.status(200).json(new ResJSON([user], true, 'User found'))
    } catch (error) {
      next(error)
    }
  }

  static create: e.RequestHandler = async (req, res, next) => {
    const body = req.body

    if(!body.password) return res.status(400).json(new ResJSON([], false, 'Missing password field'))

    const saltRounds = 10

    const passwordHash: string = bcrypt.hash(body.password, saltRounds)

    if(!passwordHash) return res.status(500).json(new ResJSON([], false, 'Server error'))

    body.password = undefined

    const newUser = {
      passwordHash,
      ...body
    }

    const isValidUser = validateUser(newUser)

    // CHECK ISVALIDUSER FOR REFACTOR
    console.log(isValidUser)
    if(!isValidUser) return res.status(400).json(new ResJSON([], false, 'One or more fields are not valid'))

    try {
      const user = await UserModel.create({data: newUser})

      if(!user) return res.status(404).json(new ResJSON([], false, 'Could not create the user'))

      return res.status(201).json(new ResJSON(user, true, 'User created successfully'))
    } catch (error) {
      next(error)
    }
  } 

  static delete: e.RequestHandler = async (req, res, next) => {
    const { id } = req.params

    if(typeof id !== 'string') return res.status(400).json(InvalidIDJSON)

    try {
      const user = await UserModel.delete({ id })
  
      if(!user) return res.status(404).json(new ResJSON([], false, 'The user you tried to delete was not found'))
  
      return res.status(200).json(new ResJSON([user], true, 'User successfully deleted')) 
    } catch (error) {
      next(error)
    }
  }

  static update: e.RequestHandler = async (req, res, next) => {
    const { id } = req.params
    const body = req.body

    if(typeof id !== 'string') return res.status(400).json(InvalidIDJSON)

    const isValidUser = validatePartialUser(body)

    // CHECK ISVALIDUSER FOR REFACTOR
    console.log(isValidUser)
    if(!isValidUser) return res.status(400).json(new ResJSON([], false, 'One or more fields are not valid'))

    try {
      const user = await UserModel.update({ id, data: body })
      
      if(!user) return res.status(404).json(new ResJSON([], false, 'Could not update the user'))
      
      return res.status(200).json(new ResJSON([user], true, 'User successfully updated'))
    } catch (error) {
      next(error)
    }
  }
}

export = UsersController