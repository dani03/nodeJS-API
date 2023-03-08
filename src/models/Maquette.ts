import mongodb from "mongodb";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
// const getDb = require('../util/database').getDb;

// class Maquette {
//   constructor(title, file_url, id, date = new Date().toLocaleDateString('fr-FR', { hour12: false })) {
//     this.title = title;
//     this.file_url = file_url;
//     this.created_at = date;
//     this.update_at = date;
//     this._id = id;

//   }

//   save() {
//     const db = mongo.getDb();
//     let dbOperation;
//     if (this._id) {
//       //si l'id est present alors on update
//       dbOperation = db.collection('maquettes')
//         .updateOne({ _id: this._id }, { $set: this })

//     } else {
//       dbOperation = db.collection('maquettes')
//         .insertOne(this);
//     }

//     return dbOperation.then(result => {
//       console.log(result);
//     })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
//   update(maquetteId, data) {

//     const db = mongo.getDb();
//     const maquette = this.constructor.findById(maquetteId);
//     return db.collection('maquettes').updateOne({ _id: new mongodb.ObjectId(maquette._id) },
//       {
//         $set: { title: data.title, file_url: data.file_url, update_at: data.update_at }
//       })

//   }

//   static fetchAll() {
//     const db = mongo.getDb();
//     return db.collection('maquettes').find()
//       .toArray()
//       .then(maquettes => {
//         console.log(maquettes);
//         return maquettes;
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }

//   static findById(maquetteId) {
//     const db = mongo.getDb();
//     return db.collection('maquettes')
//       .find({ _id: new mongodb.ObjectId(maquetteId) })
//       .next()
//       .then(maquette => {
//         console.log(maquette);
//         return maquette;
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }
//   static deleteById(maquetteId) {
//     const db = mongo.getDb();
//     return db.collection('maquettes').deleteOne({ _id: new mongodb.ObjectId(maquetteId) })
//       .then(maquette => {
//         console.log(maquette);
//         return maquette;
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }
// }

const maquetteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  file_url: {
    type: String,
    required: true
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    //required: true
  },
  aprovals: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  unaprovals: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],

}, { timestamps: true });


export default mongoose.model('Maquette', maquetteSchema);

