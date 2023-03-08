
import mongoose from "mongoose";

const Schema = mongoose.Schema;

type UserType = {
  createdAt: NativeDate,
  updatedAt: NativeDate,
  email: string,
  password: string,
  role: string,
  pseudo: string,
  blocked: boolean,
  maquettes: any
}

export default UserType