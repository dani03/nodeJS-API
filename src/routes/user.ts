import express from "express";
import UserController from "../controllers/UserController";
import middleware from "../middlewares/middleware";

const router = express.Router();

router.get('/users', [middleware.is_authenticate, middleware.isAdmin], UserController.getUsers);
router.delete('/user/delete/:userId', [middleware.is_authenticate, middleware.isAdmin], UserController.deleteUser);


export default router;