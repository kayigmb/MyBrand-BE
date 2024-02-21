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
  
// to hash the password

UserSchema.pre(
    'save',
            async function(next) {
                const username = this;
                const hash = await bcrypt.hash(this.password, 10);

            this.password = hash;
        next(); 
}
);

export const isValidPassword = async function(user: User, password: string) {
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}
  
export const UserModel = model<User>('userAccess', UserSchema);
  


