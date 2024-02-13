"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
exports.router = router;
// Blog Controllers 
router.get("/blog", controller_1.blogShow);
// Get the information
router.get("/blog/:id", controller_1.blogGet);
// Post a new blog
router.post("/blog", controller_1.blogPost);
// Update blog
router.patch("/blog/update/:id", controller_1.blogUpdate);
// delete blog
router.delete("/blog/delete/:id", controller_1.blogDelete);
