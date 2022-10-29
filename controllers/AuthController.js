const express = require('express');
const jsonschema = require("jsonschema");//jsonschema LIB
const jwt  = require("jsonwebtoken");

const userRegisterSchema = require("../schemas/userRegister.json"); // this is the schema that you created with the rules
const userModel = require("../models/UserModels.js");
const {BadRequestError} = require("../helpers/expressError.js");
const userAuthSchema = require("../schemas/userAuth.json");

const router = express.Router();

router.post("/login",async(req,res)=>{

    const validator = jsonschema.validate(req.body, userAuthSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
  
    const {username, password } = req.body;
    const user = await userModel.authenticate(username, password);
    

    //creates my payload
    let payload = {
        id: user.id,
        username: user.username,
        first_name : user.first_name,
        last_name : user.last_name,
        isadmin : user.isadmin
      };
    

  

      //creates  token
    const token= jwt.sign(payload,process.env.SECRET_KEY);
  
    //return token
    return res.json({ token });

})

module.exports=router;