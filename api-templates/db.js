//NPM packages
const {connect,set} = require("mongoose");//Database package for mongoDB

// ENV
const { MONGODB_URI } = process.env;//environment variable


set('useFindAndModify', false);//removing deprecation warning

// Database Conncetion
(async () => {
  try {
    await connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error)
  }
})();//IIFE methodology