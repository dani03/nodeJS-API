import Jwt from "jsonwebtoken";
import User from "../models/User.js";
const is_authenticate = (req, res, next) => {
  const headers = req.get('Authorization');
  if (!headers) {
    res.status(401).json({ message: "unauthenticated" })
  }

  const token = req.get('Authorization').split(' ')[1];

  let decodeToken;
  try {
    decodeToken = Jwt.verify(token, 'secrettoken');
  } catch (err) {
    err.statusCode = 500
    res.status(500).json({ message: "invalide token" })
  }
  // console.log("decode token is => ", decodeToken);

  if (!decodeToken) {
    const error = new Error('unauthenticated');
    error.statusCode = 401
    res.status(401).json({ message: "unauthenticated" })
  }
  //si on arrive ici le token est donc valide 
  req.email = decodeToken.email;
  req.userId = decodeToken.userId;
  req.role = decodeToken.role;
  next();
}

const isAdmin = (req, res, next) => {
  //check if the user has role of admin 
  User.findById(req.userId).then(user => {
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    if (user.role !== 'admin') {
      res.status(403).json({ message: "unauthorized you need are not admin" })
    }
  }).catch(err => {
    throw err;
  })
  next();
}

const isManager = (req, res, next) => {
  User.findById(req.userId).then(user => {
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    if (user.role !== 'manager') {
      res.status(403).json({ message: "unauthorized you need to be manager" })
    }
  }).catch(err => {
    throw err;
  })
  next();
}
const isArtist = (req, res, next) => {
  User.findById(req.userId).then(user => {
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    if (user.role !== 'artist' || user.role !== 'admin') {
      res.status(403).json({ message: "unauthorized you need to be artist" })
    }
  }).catch(err => {
    throw err;
  })
  next();
}
const UserCanCreateMaquette = (req, res, next) => {
  User.findById(req.userId).then(user => {
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    if (user.role == 'admin') {
      res.status(403).json({ message: " you are unauthorized" })
    }
  }).catch(err => {
    throw err;
  })
  next();
}
const isBlocked = (req, res, next) => {
  User.findById(req.userId).then(user => {
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    if (user.blocked) {
      res.status(403).json({ message: " you are unauthorized to process" })
    }
  }).catch(err => {
    throw err;
  })
  next();
}
const notForArtist = (req, res, next) => {
  User.findById(req.userId).then(user => {
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    if (user.role == "artist") {
      res.status(403).json({ message: " you are unauthorized to process" })
    }
  }).catch(err => {
    throw err;
  })
  next();
}



export default { notForArtist,  isBlocked, is_authenticate, isAdmin, isManager, isArtist, UserCanCreateMaquette }