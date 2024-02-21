import { User } from "../utils/types";
import { Schema,Types,model} from "mongoose"
import bcrypt from "bcrypt"


const UserSchema = new Schema<User>({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },

    admin: {
      type: Boolean, 
      default: false
  },

    blogsCreated:[{ type: Schema.Types.ObjectId, ref: 'Blog' }]
});
  
  
export const UserModel = model<User>('userAccess', UserSchema);
  


