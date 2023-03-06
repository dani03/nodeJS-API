import User from "../models/User.js"
import bcrypt from "bcryptjs";


const createAdmin = (req, res) => {
  const userAdmin = new User({
    email: "admin@gmail.com",
    password: bcrypt.hash("password", 12),
    role: "admin",
    pseudo: "administrateur",
  });
  return userAdmin.save();
}

export default { createAdmin }


