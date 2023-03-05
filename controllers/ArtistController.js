
import User from "../models/User.js";


export const storeArtist = (req, res) => {

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

export const deleteArtist = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId).then(user => {
    if (!user) {
      res.status(404).json({ message: "user not found !" })
    }
    User.findByIdAndRemove(userId).then(deleteUser => {
      res.status(200).json({ message: "user was deleted..." })
    }).catch(err => {
      throw err;
    })
  }).catch()

}


export default { storeArtist, deleteArtist }