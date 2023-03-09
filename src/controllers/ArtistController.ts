
import User from "../models/User";
import bcrypt from 'bcryptjs';
export const storeArtist = (req: any, res: any) => {

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
    //recherche un artiste avec le meme pseudo
    User.findOne({ pseudo: pseudo }).then(user => {
      if (user) {
        res.status(422).json({ 'message': 'ce pseudo est deja pris choisissez en un autre' });
        return;
      }
    });
    return newUser.save().then((result: any) => {
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

export const deleteArtist = (req: any, res: any) => {
  const userId = req.params.userId;
  User.findById(userId).then(user => {
    if (!user) {
      res.status(404).json({ message: "user not found !" })
      return;
    }
    User.findByIdAndRemove(userId).then(deleteUser => {
      res.status(200).json({ message: "user was deleted..." })
      return;
    }).catch(err => {
      throw err;
    })
  }).catch()

}


export default { storeArtist, deleteArtist }