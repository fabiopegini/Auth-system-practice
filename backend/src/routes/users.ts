import express = require('express')
import UserController = require('../controllers/user')
import extractUser from "../middlewares/auth_token"
import type { Router } from 'express'

const usersRouter: Router = express.Router()

usersRouter.get('/', UserController.getAll)

usersRouter.get('/find', UserController.getByEmail)

usersRouter.get('/:id', UserController.getById)

usersRouter.post('/', extractUser, UserController.create)

usersRouter.post('/login', UserController.login)

usersRouter.patch('/:id', extractUser, UserController.update)

usersRouter.delete('/:id', extractUser, UserController.delete)

export = usersRouter
