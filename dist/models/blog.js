"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    image: String,
    content: {
        type: String,
        required: true,
    },
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Comment' }],
    like: { type: mongoose_1.Schema.Types.ObjectId, ref: 'like' },
});
exports.Blog = (0, mongoose_1.model)("Blog", blogSchema);
