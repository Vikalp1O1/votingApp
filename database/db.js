const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    // wrap in try catch block
    try {
      const DataBaseConnection = await mongoose.connect(`${process.env.MONGODB_URL}`);
      console.log(`MongoDb Connected!! : ${DataBaseConnection.connection.host}`);
    } catch (error) {
      console.log(`Error: `, error);
      process.exit(1);
    }
  };
  
  // exporting the function so we can use in index.js file to register it
  module.exports= connectDB;