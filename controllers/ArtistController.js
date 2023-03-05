
import User from "../models/User.js";


export const storeArtist = (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    pseudo: req.body.role,
    role: req.body.role,
    maquettes: []
  });
  newUser.save().then(result => {
    res.status(201).json({ message: 'utilisateur ajouté..', user: result });
  })
    .catch((err) => {
      console.log(err);
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