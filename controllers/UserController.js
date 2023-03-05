import User from "../models/User.js";

const deleteUser = (req, res) => {
  User.findById(req.params.userId).then(user => {
    if (!user) {
      res.status(404).json({ message: "user not found" })
    }
    return User.findByIdAndRemove(req.params.userId);
  })
    .then(result => {
      res.status(200).json({ message: 'user delete succefully' })
    })
    .catch(err => {
      throw err;
    })
}

const getUsers = (req, res) => {
  User.find({ blocked: false }).then(users => {
    res.status(200).json([{ data: users }])
  }).catch(err => {
    throw err;
  })
}

export default { deleteUser, getUsers }