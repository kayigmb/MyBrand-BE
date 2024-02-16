"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const queryController_1 = require("../controllers/queryController");
const controllerComment_1 = require("../controllers/controllerComment");
const cMiddleware_1 = require("../middlewares/cMiddleware");
const mMiddleware_1 = require("../middlewares/mMiddleware");
const bMiddleware_1 = require("../middlewares/bMiddleware");
const router = express_1.default.Router();
exports.router = router;
// Blog Controllers 
router.get("/blog", controller_1.blogShow);
// Get the information
router.get("/blog/:id", controller_1.blogGet);
// Post a new blog
router.post("/blog", bMiddleware_1.vBlog, controller_1.blogPost);
// Update blog
router.patch("/blog/update/:id", controller_1.blogUpdate);
// delete blog
router.delete("/blog/delete/:id", controller_1.blogDelete);
//router Comment
// query router
// query show 
router.get("/query", queryController_1.messageShow);
// query create
router.post("/query", mMiddleware_1.vMessage, queryController_1.messageCreate);
//Comment router
// get comments from id
router.get("/blog/:id/comment", controllerComment_1.commentShow);
router.post("/blog/:id/comment", cMiddleware_1.vComments, controllerComment_1.commentPost);
