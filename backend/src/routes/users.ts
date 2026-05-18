const usersRouter = require('express').Router()
const UserController = require('../controllers/user')

usersRouter.get('/', UserController.getAll)

usersRouter.get('/:id', UserController.getById)
// Implement better the email one
usersRouter.get('/', UserController.getByEmail)

usersRouter.post('/:id', UserController.create)

usersRouter.put('/:id', UserController.update)

usersRouter.delete('/:id', UserController.delete)

module.exports = usersRouter
