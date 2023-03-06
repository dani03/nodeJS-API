
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Jwt from "jsonwebtoken";

export const register = (req, res, next) => {
  console.log('heree-------------------')
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("les champs ne sont pas bien remplis verifier le mot de passe ou l'email");
    error.statusCode = 422;
    error.data = errors.array();
    // throw error;
    res.status(statusCode).json({ message: "les champs ne sont pas bien remplis verifier", data: error.data })
  }
  const UserEmail = req.body.email;
  const password = req.body.password;
  const roleUser = req.body.role;
  const pseudo = req.body.pseudo;
  bcrypt.hash(password, 12).then(passwordHashed => {
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

export const login = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;

  let loadUser;
  User.findOne({ email: email })
    .then(theUser => {
      if (!theUser) {
        const error = new Error('identifiant de connexion non reconnu');
        error.statusCode = 404;
        res.status(error.statusCode).json({ message: "identifiants de connexion non reconnus" })
      }
      loadUser = theUser;

      return bcrypt.compare(password, theUser.password);
    })
    .then(passwordMatched => {
      if (!passwordMatched) {
        res.status(401).json({ message: "identifiant ou mot de passe incorrect" })
      }
      //generation du jwt
     // console.log('generation token', 'et user', loadUser);

      const token = Jwt.sign({ userId: loadUser._id.toString(), role: loadUser.role, email: loadUser.email },
        'secrettoken', { expiresIn: '2h' });

      res.status(200).json({ message: "connexion reussie", token: token })

    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
    })
}

export default { register, login }