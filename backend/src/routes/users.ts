import express = require('express')
import UserController = require('../controllers/user')
import type { Router } from 'express'

const usersRouter: Router = express.Router()

usersRouter.get('/', UserController.getAll)

usersRouter.get('/:id', UserController.getById)

usersRouter.get('/find', UserController.getByEmail)

usersRouter.post('/:id', UserController.create)

usersRouter.patch('/:id', UserController.update)

usersRouter.delete('/:id', UserController.delete)

export = usersRouter
