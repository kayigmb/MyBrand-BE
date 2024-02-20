import { User } from "../utils/types";
import { Schema,Types,model} from "mongoose"
import passportLocalMongoose from  "passport-local-mongoose"
import bcrypt from "bcrypt"

const UserSchema = new Schema<User>({
    user: {
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
      required: true
    }
});
  
// to hash the password

UserSchema.pre(
'save',
async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next(); 
}
);

export const isValidPassword = async function(user: User, password: string) {
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}
  
export const UserModel = model<User>('user', UserSchema);
  


