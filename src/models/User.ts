
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pseudo: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  blocked: {
    type: Boolean,
    default: false
  },
  maquettes: [{
    type: Schema.Types.ObjectId,
    ref: 'Maquette',
    
  }]
}, { timestamps: true })

// class User {
//   constructor(email, password, pseudo, role = "artist", maquettes = new Maquette(), blocked = false, created_at = new Date()) {
//     this.email = email;
//     this.password = password;
//     this.pseudo = pseudo;
//     this.role = role;
//     this.blocked = blocked
//     this.maquettes = maquettes;
//     this.created_at = created_at;
//   }

//   save() {
//     const db = mongo.getDb();
//     return db.collection('users')
//       .insertOne(this)
//       .then(result => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }


// }

export default mongoose.model('User', UserSchema);