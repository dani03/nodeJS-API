// const mongodb = require('mongodb');
import mongodb from "mongodb";
import mongoose from "mongoose";
const mongoClient = mongodb.MongoClient;


let _db;

const mongoConnected = callback => {
  mongoClient.connect(

    // 'mongodb+srv://lesamessipa:RMS9Z8IMXbofrfSH@cluster0.dqsey2o.mongodb.net/test'
    'mongodb://lesamessipa:RMS9Z8IMXbofrfSH@ac-w5qio3n-shard-00-00.dqsey2o.mongodb.net:27017,ac-w5qio3n-shard-00-01.dqsey2o.mongodb.net:27017,ac-w5qio3n-shard-00-02.dqsey2o.mongodb.net:27017/?ssl=true&replicaSet=atlas-11dggf-shard-0&authSource=admin&retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log(" succefful connected........");

      _db = client.db();
      callback();
    }).catch(err => {
      console.log('ereur connected');
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "no database found";
}

// exports.mongoConnected = mongoConnected;
// exports.getDb = getDb;
export default { mongoConnected, getDb }