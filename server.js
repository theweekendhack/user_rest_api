const express = require("express");
const userController = require("./controllers/UserController.js");
const {NotFoundError} = require("./helpers/expressError.js");
const authController = require("./controllers/AuthController.js");
const { authenticateJWT } = require("./middleware/auth");
require("dotenv").config();

const app = express();

app.use(express.json());

//load authenticateJWT to make our global res.locals.user variable our single source of truth
//this is going to set my res.local.user to be either :1.undefined or 2. the payload that is within the token
app.use(authenticateJWT); 

//load controllers
app.use("/api/users",userController);
app.use("/api/auth",authController);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    throw new NotFoundError();
  });
  

/** Generic error handler; anything unhandled goes here. */

app.use(function (err, req, res, next) {

    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });
  
app.listen(process.env.PORT, ()=>{
    console.log(`API is up and running on port ${process.env.PORT}`);
})