
import express from "express";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import adminRoutes from "./src/routes/admin";
import authRoutes from "./src/routes/auth";
import maquetteRoutes from "./src/routes/maquette";
import artistRoutes from "./src/routes/artist";
import userRoutes from "./src/routes/user";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from "./src/models/User";
 dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})
//creation de l'admin
User.find({ 'role': 'admin' }).then(user => {

  if (user.length <= 0) {
    bcrypt.hash("password", 12).then(passwordHashed => {
      const adminUser = new User({
        email: "admin@admin.com",
        password: passwordHashed,
        role: 'admin',
        pseudo: "adminitrateur",
      })
      return adminUser.save().then(result => {
        console.log("connectez vous avec l'admin => ", adminUser, "mot de passe =>password")
      }).catch(err => {
        throw err;
      });
    }).catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
    })
  }
}).catch(err => {
  throw err;
})


//routes
app.use('/auth', authRoutes);

app.use(adminRoutes);
app.use(userRoutes);

app.use(maquetteRoutes);
app.use(artistRoutes);

// Mongo.mongoConnected(() => {
//   console.log('inside');
//   app.listen(9000);

// })

mongoose.connect(
  `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@ac-w5qio3n-shard-00-00.dqsey2o.mongodb.net:27017,ac-w5qio3n-shard-00-01.dqsey2o.mongodb.net:27017,ac-w5qio3n-shard-00-02.dqsey2o.mongodb.net:27017/?ssl=true&replicaSet=atlas-11dggf-shard-0&authSource=admin&retryWrites=true&w=majority`
)
  .then(result => {
    console.log("connect with mongoose")
    app.listen(9000);
  })
  .catch(err => {
    console.log(err)
  })