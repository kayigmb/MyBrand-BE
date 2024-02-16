"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const messageSent = new mongoose_1.Schema({
    name: {
        type: 'string',
    },
    email: {
        type: 'string',
    },
    content: {
        type: 'string',
    }
});
exports.Message = (0, mongoose_1.model)('message', messageSent);
