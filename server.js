const express = require("express");
const userController = require("./controllers/UserController.js");


const app = express();

app.use(express.json());


app.use("/api/users",userController);


const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`API is up and running on port ${PORT}`);
})