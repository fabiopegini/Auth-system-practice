import zodMon = require("@nullix/zod-mongoose")
import mongoose = require("mongoose")
import z = require("zod")

const UserRegisterSchema = z.object({
  name: z.string().regex(/^[a-zA-Z]/).min(1).max(20),
  email: z.email(),
  password: z.string()
  .min(8, { error: 'Password must have at least 8 characters' })
  .regex(/(?=\S*[a-z])/, { error: 'Password must have at least one lowercase letter'})
  .regex(/(?=\S*[A-Z])/, { error: 'Password must have at least one uppercase letter'})
  .regex(/(?=\S*[0-9])/, { error: 'Password must have at least one number'})
  .regex(/(?=\S*[^\w\s]|_)/, { error: 'Password must have at least one special character'})
})

const UserZodSchema = z.object({
  name: z.string().regex(/^[a-zA-Z]/).min(1).max(20),
  email: z.email(),
  passwordHash: z.string(),
  createdAt: z.date().default(new Date(Date.now())).optional()
})

const validateUser = (input: any) => {
  return UserZodSchema.safeParse(input)
}

const validatePartialUser = (input: any) => {
  return UserZodSchema.partial().safeParse(input)
}

const UserSchema = zodMon.toMongooseSchema(UserZodSchema)
const UserModel = mongoose.model('User', UserSchema)

UserSchema.set('toJSON', {
  transform: (document, objFromDb) => {
    const returnedObject = objFromDb as any
    returnedObject.id = returnedObject._id.toString()
    
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
    delete returnedObject.createdAt

    return returnedObject
  }
})

export = { UserRegisterSchema, UserZodSchema, UserModel, validateUser, validatePartialUser }
