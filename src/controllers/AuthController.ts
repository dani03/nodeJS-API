
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Jwt from "jsonwebtoken";

export const register = (req: any, res: any, next: any) => {
  console.log('heree-------------------')
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: Error = new Error("les champs ne sont pas bien remplis verifier le mot de passe ou l'email");

    // throw error;
    res.status(422).json({ message: "les champs ne sont pas bien remplis verifier" })
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

export const login = (req: any, res: any, next: any) => {

  const email = req.body.email;
  const password = req.body.password;

  let loadUser: any;
  User.findOne({ email: email })
    .then((theUser) => {
      if (theUser) {
        loadUser = theUser;
        return bcrypt.compare(password, theUser.password);
      }
      const error = new Error('identifiant de connexion non reconnu');

      res.status(422).json({ message: "identifiants de connexion non reconnus" })
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