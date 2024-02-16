"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageShow = exports.messageCreate = void 0;
const query_1 = require("../models/query");
// message show 
const messageShow = async (req, res) => {
    const messages = await query_1.Message.find();
    res.send(messages);
};
exports.messageShow = messageShow;
const messageCreate = async (req, res) => {
    try {
        const message = new query_1.Message({
            name: req.body.name,
            email: req.body.email,
            content: req.body.content
        });
        await message.save();
        res.status(201).send(message);
    }
    catch (err) {
        res.status(404).send({ error: 'unable to create message' });
    }
};
exports.messageCreate = messageCreate;
