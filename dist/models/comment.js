"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    name: {
        type: 'string',
        required: false
    },
    email: {
        type: 'string',
        required: false,
    },
    comment: {
        type: 'string',
        required: false,
    },
    // createdAt: {
    //     type: Date,
    // },
    blog: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Blog'
    }
});
exports.Comment = (0, mongoose_1.model)('Comment', commentSchema);
