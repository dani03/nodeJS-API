import bcryptjs from "bcryptjs";
import User from "../models/User.js";

export const StoreManager = (req, res, next) => {
  const UserEmail = req.body.email;
  const password = req.body.password;
  const roleUser = req.body.role;
  const pseudo = req.body.pseudo;
  bcryptjs.hash(password, 12).then(passwordHashed => {
    const newUser = new User({
      email: UserEmail,
      password: passwordHashed,
      role: roleUser,
      pseudo: pseudo,
    })
    return newUser.save().then(result => {
      res.status(201).json({ message: "inscription reussie", userId: result._id })
    }).catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
    })
  }).catch(err => {
    console.log(err)
    if (!err.statusCode) {
      err.statusCode = 500
    }
  })
}

export default {StoreManager}