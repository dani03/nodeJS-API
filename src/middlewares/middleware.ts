import Jwt from "jsonwebtoken";
import User from "../models/User";
import { IRequest } from '../interfaces/IRequest';

const is_authenticate = (req: any, res: any, next: any) => {
  const headers = req.get('Authorization');
  if (!headers) {
    res.status(401).json({ message: "unauthenticated" });
    return;
  }
  const token = req.get('Authorization').split(' ')[1];

  let decodeToken: any = null;
  try {
    decodeToken = Jwt.verify(token, 'secrettoken');
  } catch (err: any) {
    console.log('authenticate middleware error token')
    res.status(500).json({ message: "invalide token" })
    return;
  }
  // console.log("decode token is => ", decodeToken);

  if (decodeToken === null) {
    console.log("decode token null")
    res.status(401).json({ message: "unauthenticated" })
    return;
  }
  //si on arrive ici le token est donc valide 
  req.email = decodeToken.email;
  req.userId = decodeToken.userId;
  req.role = decodeToken.role;
  next();
}

const isAdmin = async (req: IRequest, res: any, next: any) => {

  //check if the user has role of admin 
  try {
    const user = await User.findById(req.userId).exec();
    console.log('user => ', user);
    if (!user) {
      console.log("middleware admin")
      res.status(404).json({ message: "user not found" });
      return;
    }

    if (user.role !== 'admin') {
      console.log('il est pas admin')
      res.status(403).json({ message: "unauthorized you need are not admin" });
      return;
    }
    console.log('finnnnnnn je vais executer next')
    next();
  } catch (err) {

  }
}

const isManager = async (req: IRequest, res: any, next: any) => {
  try {

    const user = await User.findById(req.userId).exec();
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    if (user.role !== 'manager') {
      res.status(403).json({ message: "unauthorized you need to be manager" });
      return;
    }
    next();
  } catch (err) {
    throw err;
  }

}
const isArtist = async (req: any, res: any, next: any) => {
  const user = await User.findById(req.userId).exec();
  try {
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    if (user.role !== 'artist') {
      if (user.role !== 'admin') {
        res.status(403).json({ message: "unauthorized you need to be artist" });
        return;
      }
    }
    next();

  } catch (err) {
    throw err;
  }

}

const UserCanCreateMaquette = async (req: any, res: any, next: any) => {

  const user = await User.findById(req.userId).exec();
  try {
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    if (user.role == 'admin') {
      res.status(403).json({ message: " you are unauthorized" })
      return;
    }
    next();
  } catch (err) {
    throw err;
  }

}
const isBlocked = async (req: any, res: any, next: any) => {
  const user = await User.findById(req.userId).exec();
  try {
    if (!user) {
      res.status(404).json({ message: "user not found icii" });
      return;
    }

    if (user.blocked) {
      res.status(403).json({ message: " you are unauthorized to process" })
      return;
    }
    next();

  } catch (err) {
    throw err;
  }

}
const notForArtist = async (req: any, res: any, next: any) => {
  const user = await User.findById(req.userId).exec();
  try {
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    if (user.role == "artist") {
      res.status(403).json({ message: " you are unauthorized to process" })
      return;
    }
    next();
  } catch (err) {
    throw err;
  }
}



export default { notForArtist, isBlocked, is_authenticate, isAdmin, isManager, isArtist, UserCanCreateMaquette }