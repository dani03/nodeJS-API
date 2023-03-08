
import mongoose from "mongoose";
const Schema = mongoose.Schema;

type MaquetteType = {
  _id: any
  title: {
    type: String,
    required: true
  },
  file_url: {
    type: String,
    required: true
  },

  user: {
    type: String,
    required: true
  },
  aprovals: any,
  unaprovals: any
  createdAt: NativeDate,
  updatedAt: NativeDate,
}

export default MaquetteType;