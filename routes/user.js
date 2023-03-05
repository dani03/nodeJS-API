import express from "express";
import UserController from "../controllers/UserController.js";
import middleware from "../middlewares/middleware.js";


const router = express.Router();

router.delete('/user/delete/:userId', [middleware.is_authenticate, middleware.isAdmin], UserController.deleteUser);
router.get('/users', [middleware.is_authenticate, middleware.isAdmin], UserController.getUsers);


export default router;