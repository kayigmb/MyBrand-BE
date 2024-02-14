import { Schema, model } from  "mongoose"
import { commentPost} from "../controllerComment"
interface blog{
    title:string,
    author:string,
    image:string,
    content:string,
    comments:string
}

const blogSchema = new Schema<blog>({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    image: String,
    content: String,
    comments: String
});

export const Blog = model("Blog", blogSchema);
