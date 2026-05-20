import userSchemas = require('./user')
import z = require('zod')

const { UserRegisterSchema, UserZodSchema } = userSchemas

export type UserRegister = z.infer<typeof UserRegisterSchema>
export type UserType = z.infer<typeof UserZodSchema>