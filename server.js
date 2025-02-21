const express = require('express');
const dotenv = require('dotenv');
const app=express();
require('dotenv').config();


const connectDB = require('./database/db.js');


connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB connection Failure... Try Again`, err);
  });


  app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// import routes 
const userRoutes = require('./routes/user.routes.js');
const candidateRoutes=require("./routes/candidate.routes.js");

// use routes
app.use('/api/user',userRoutes)
app.use('/api/candidate',candidateRoutes)