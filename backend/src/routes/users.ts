import express = require('express')
import UserController = require('../controllers/user')
import type { Router } from 'express'

const usersRouter: Router = express.Router()

usersRouter.get('/', UserController.getAll)

usersRouter.get('/find', UserController.getByEmail)

usersRouter.get('/:id', UserController.getById)

usersRouter.post('/', UserController.create)

usersRouter.post('/login', UserController.login)

usersRouter.patch('/:id', UserController.update)

usersRouter.delete('/:id', UserController.delete)

export = usersRouter
