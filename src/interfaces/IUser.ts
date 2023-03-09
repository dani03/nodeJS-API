import mongoose, { Schema } from "mongoose";

//const Schema = mongoose.Schema;

export interface IUser {
  _id?: Array<Schema.Types.ObjectId>
  email: string;
  pseudo: string;
  role: string;
  password: string;
  unaprovals?: Array<Schema.Types.ObjectId>;
  aprovals?: Array<Schema.Types.ObjectId>;
  createdAt?: NativeDate;
  update?: NativeDate;
}