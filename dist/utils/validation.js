"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMessages = exports.validateComments = void 0;
const joi_1 = __importDefault(require("joi"));
// validate comments
const validateComments = (comment) => {
    const commentSchema = joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        comment: joi_1.default.string().required()
    });
    return commentSchema.validate(comment);
};
exports.validateComments = validateComments;
const validateMessages = (message) => {
    const messageSchema = joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        content: joi_1.default.string().required()
    });
    return messageSchema.validate(message);
};
exports.validateMessages = validateMessages;
