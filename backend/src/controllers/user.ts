import type e = require("express")
import { type UserType } from "../schemas/user_types"
import responses = require('./user_utils')
import UserModel = require('../models/user')
import userSchemas = require('../schemas/user')
const bcrypt = require('bcrypt')

const { ResJSON, UserNotFoundJSON , InvalidIDJSON } = responses
const { validateUser, validatePartialUser } = userSchemas

class UsersController {
  static getAll: e.RequestHandler = async (req, res, next) => {
    try {
      const users: UserType[] = await UserModel.getAll()

      if(!users.length) return res.status(404).json(new ResJSON([], false, 'Could not found any users'))

      return res.status(200).json(new ResJSON(users, true, 'All users found'))
    } catch (error) {
      next(error)
    }
  }

  static getById: e.RequestHandler = async (req, res, next) => {
    const { id } = req.params

    if(typeof id !== 'string') return res.status(400).json(InvalidIDJSON)

    try {
      const [user] = await UserModel.getById({ id })

      if(!user) return res.status(404).json(UserNotFoundJSON)

      return res.status(200).json(new ResJSON([user], true, 'User found'))
    } catch(error) {
      next(error)
    }
  }

  static getByEmail: e.RequestHandler = async (req, res, next) => {
    if(!req.body?.email) return res.status(400).json(new ResJSON([], false, 'Email was not provided'))
    
    const { email } = req.body

    try {
      const [user] = await UserModel.getByEmail({ email })

      if(!user) return res.status(404).json(UserNotFoundJSON)

      return res.status(200).json(new ResJSON([user], true, 'User found'))
    } catch (error) {
      next(error)
    }
  }

  static create: e.RequestHandler = async (req, res, next) => {
    const body = req.body

    if(!body.name || !body.email || !body.password) return res.status(400).json(new ResJSON([], false, 'Missing fields'))

    const saltRounds = 10
    const passwordHash: string = await bcrypt.hash(body.password, saltRounds)
    if(!passwordHash) return res.status(500).json(new ResJSON([], false, 'Server error'))

    const { name, email } = body

    const newUser = {
      name,
      email,
      passwordHash
    }

    const isValidUser = validateUser(newUser)
    if(!isValidUser.success) return res.status(400).json(new ResJSON([], false, 'One or more fields are not valid'))

    try {
      const [user] = await UserModel.create({data: newUser})
      
      if(!user) return res.status(404).json(new ResJSON([], false, 'Email is already in use'))

      return res.status(201).json(new ResJSON([user], true, 'User created successfully'))
    } catch (error) {
      next(error)
    }
  } 

  static delete: e.RequestHandler = async (req, res, next) => {
    const { id } = req.params

    if(typeof id !== 'string') return res.status(400).json(InvalidIDJSON)

    try {
      const [user] = await UserModel.delete({ id })
  
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
    if(!body) return res.status(400).json(new ResJSON([], false, 'No data was send'))
    
    let newUserData = body

    if(body.password) {
      const saltRounds = 10
      const passwordHash: string = await bcrypt.hash(body.password, saltRounds)
 
      if(!passwordHash) return res.status(500).json(new ResJSON([], false, 'Server error'))

      const { password, createdAt, ...dataWithoutRawPassword } = newUserData

      newUserData = {
        passwordHash,
        ...dataWithoutRawPassword
      }
    }

    if(body.email) {
      const [user] = await UserModel.getByEmail({ email: body.email })

      if(user) return res.status(400).json(new ResJSON([], false, 'Email already in use'))
      // IMPLEMENT WHEN AUTH TOKENs
      // if(user && user.email === CURRENT_USER) = 'ALLOW CHANGE EMAIL, ELSE NOT'
    }

    const isValidUser = validatePartialUser(newUserData)
    if(!isValidUser.success) return res.status(400).json(new ResJSON([], false, 'One or more fields are not valid'))

    try {
      const [user] = await UserModel.update({ id, data: newUserData })
      
      if(!user) return res.status(404).json(new ResJSON([], false, 'Could not update the user'))
      
      return res.status(200).json(new ResJSON([user], true, 'User successfully updated'))
    } catch (error) {
      next(error)
    }
  }
}

export = UsersController