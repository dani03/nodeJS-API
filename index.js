
import express from "express";
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import maquetteRoutes from "./routes/maquette.js";
import artistRoutes from "./routes/artist.js";
import userRoutes from "./routes/user.js";
import mongoose from "mongoose";
import config from "dotenv";


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
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
  'mongodb://lesamessipa:RMS9Z8IMXbofrfSH@ac-w5qio3n-shard-00-00.dqsey2o.mongodb.net:27017,ac-w5qio3n-shard-00-01.dqsey2o.mongodb.net:27017,ac-w5qio3n-shard-00-02.dqsey2o.mongodb.net:27017/?ssl=true&replicaSet=atlas-11dggf-shard-0&authSource=admin&retryWrites=true&w=majority'
)
  .then(result => {
    console.log("connect with mongoose")
    app.listen(9000);
  })
  .catch(err => {
    console.log(err)
  })