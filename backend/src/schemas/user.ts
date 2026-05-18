import z = require("zod")

const UserSchema = z.object({
  name: z.string().regex(/^[a-zA-Z]/).min(1).max(20),
  email: z.email(),
  password: z.string()
  .min(8, { error: 'Password must have at least 8 characters' })
  .regex(/(?=\S*[a-z])/, { error: 'Password must have at least one lowercase letter'})
  .regex(/(?=\S*[A-Z])/, { error: 'Password must have at least one uppercase letter'})
  .regex(/(?=\S*[0-9])/, { error: 'Password must have at least one number'})
  .regex(/(?=\S*[^\w\s]|_)/, { error: 'Password must have at least one special character'}),
  passwordHash: z.hash('sha256')
})

// Make a partial validation for update

export type UserInput = z.infer<typeof UserSchema>

module.exports = UserSchema
