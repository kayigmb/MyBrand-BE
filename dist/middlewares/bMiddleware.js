"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vBlog = void 0;
const validation_1 = require("../utils/validation");
const vBlog = async (req, res, next) => {
    try {
        const { error } = (0, validation_1.validateBlog)(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ error: "internal error" });
    }
};
exports.vBlog = vBlog;
