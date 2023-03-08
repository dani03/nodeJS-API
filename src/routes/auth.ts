import express from "express";
import AuthController from "../controllers/AuthController";
import { body } from "express-validator";
import middleware from "../middlewares/middleware";
import ManagerController from "../controllers/ManagerController";
const router = express.Router();

console.log("inside router");
router.post('/login', AuthController.login);


router.post('/register', [
  body('email')
    .trim()
    .isEmail()
    .withMessage("entrez une email valide "),
  body('password').trim().isLength({ min: 5 }),
  body('pseudo').trim(),
], AuthController.register);

router.post('/manager/register', [middleware.is_authenticate, middleware.isAdmin], ManagerController.StoreManager)

export default router;