import User from "../Models/user-model";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import Users from "../Controllers/users";
const JWT_SECRET
    =
    '75911006393537b222637773603aa808dcfa871cfc29a90e51427c5bb7f6c0579ce4f5fa05042a237cb0200dc95055407d9873f0a910722c8db6b2d9dbb2b188'


export class UserService {
    constructor() {
    }

    async register(username  :string , password : string, confirm_password : string, firstName  :string , lastName : string , email : string , phone : string) {
        if(!username || !password || !firstName || !lastName || !email || !phone || !confirm_password) {
          throw  {
              status : 400,
              message : 'Please provide all required data !!!!'
          }
        }

        const existingUser = await  User.findOne({ username })

        if(existingUser) {
            throw {
                status : 500,
                message : 'User already exists'
            }
        }
        if (password.trim() !== confirm_password.trim()) {
            throw {
                status: 400,
                message: 'Password and confirm password do not match'
            };
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({ username , password: hashedPassword , firstName,lastName, phone, email, confirm_password : hashedPassword })
        await newUser.save()

        return newUser

    }

   async login( username: string , password:string ) {
        if( !username || !password ) {
            throw  {
                status : 400,
                message : 'Please provide all required data !!!!'
            }
        }
        const user = await User.findOne({username})
       if(!user) {
           throw  {
               status : 400,
               message : 'User not found'
           }
       }

       const isMatch = await bcrypt.compare(password , user.password)

       if(!isMatch) {
           throw  {
               status : 400,
               message : 'Password does not match'
           }
       }

       const token = jwt.sign({userId : user._id}, JWT_SECRET)

       return token

   }
}