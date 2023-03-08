import Jwt from "jsonwebtoken";
import User from "../models/User";
const is_authenticate = (req: any, res: any, next: any) => {
  const headers = req.get('Authorization');
  if (!headers) {
    res.status(401).json({ message: "unauthenticated" })
  }

  const token = req.get('Authorization').split(' ')[1];

  let decodeToken: any = null;
  try {
    decodeToken = Jwt.verify(token, 'secrettoken');
  } catch (err: any) {
    err.statusCode = 500
    res.status(500).json({ message: "invalide token" })
  }
  // console.log("decode token is => ", decodeToken);

  if (decodeToken === null) {
    const error = new Error('unauthenticated');
    res.status(401).json({ message: "unauthenticated" })
  }
  //si on arrive ici le token est donc valide 
  req.email = decodeToken.email;
  req.userId = decodeToken.userId;
  req.role = decodeToken.role;
  next();
}

const isAdmin = (req: any, res: any, next: any) => {
  //check if the user has role of admin 
  User.findById(req.userId).then((user: any) => {
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

const isManager = (req: any, res: any, next: any) => {
  User.findById(req.userId).then((user: any) => {
    if (user === null) {
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
const isArtist = (req: any, res: any, next: any) => {
  User.findById(req.userId).then(user => {
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    if (user) {
      if (user.role !== 'artist') {
        if (user.role !== 'admin') {
          res.status(403).json({ message: "unauthorized you need to be artist" })
        }
      }
    }
  }).catch(err => {
    throw err;
  })
  next();
}
const UserCanCreateMaquette = (req: any, res: any, next: any) => {
  User.findById(req.userId).then(user => {
    if (user) {
      if (user.role == 'admin') {
        res.status(403).json({ message: " you are unauthorized" })
      }
    }
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
  }).catch(err => {
    throw err;
  })
  next();
}
const isBlocked = (req: any, res: any, next: any) => {
  User.findById(req.userId).then(user => {
    if (user) {
      if (user.blocked) {
        res.status(403).json({ message: " you are unauthorized to process" })
      }
    }
    res.status(404).json({ message: "user not found" });

  }).catch(err => {
    throw err;
  })
  next();
}
const notForArtist = (req: any, res: any, next: any) => {
  User.findById(req.userId).then(user => {
    if (user) {
      if (user.role == "artist") {
        res.status(403).json({ message: " you are unauthorized to process" })
      }

    }

    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
  }).catch(err => {
    throw err;
  })
  next();
}



export default { notForArtist, isBlocked, is_authenticate, isAdmin, isManager, isArtist, UserCanCreateMaquette }