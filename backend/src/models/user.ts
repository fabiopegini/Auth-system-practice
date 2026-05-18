import type { UserInput } from "../schemas/user";

class UserModel {
  static getAll = async () => {
    // FindAll db
  }

  static getById = async ({ id } : { id: string })  => {
    // Findby id db
  }

  static getByEmail = async ( { email } : { email: string }) => {
    // Findby email db
  }

  static create = async ({ data } : { data: UserInput }) => {
    const newUser = {
      id: 'Generate here or in db',
      createdAt: 'Timestamp',
      ...data
    }

    // Save in db
  }

  static delete = async ({ id }: { id: string }) => {
    // FindById and delete from db
  }

  static update = async ({ id, data } : { id: string, data: UserInput }) => {
   // FindById and Update in db 
  }
}

module.exports = UserModel