const app = require("./app") //importing app module 

const PORT = process.env.PORT || 8080 //heroku port or local 8080 port 

app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`)) // server listening 