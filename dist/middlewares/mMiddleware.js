"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vMessage = void 0;
const validation_1 = require("../utils/validation");
const vMessage = async (req, res, next) => {
    try {
        const { error } = (0, validation_1.validateMessages)(req.body);
        if (error) {
            return res.status(400).send({ error: error.details[0].message });
        }
        next();
    }
    catch (error) {
        console.error("Error validating comment:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};
exports.vMessage = vMessage;
