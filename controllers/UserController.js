const express = require('express');
const jsonschema = require("jsonschema");//jsonschema LIB
const userRegisterSchema = require("../schemas/userRegister.json"); // this is the schema that you created with the rules
const userModel = require("../models/UserModels.js");
const {ensureLoggedIn, ensureAdmin,ensureCorrectUserOrAdmin} = require("../middleware/auth.js");
const {BadRequestError,NotFoundError} = require("../helpers/expressError.js");

const router = express.Router();

router.get("/",ensureAdmin,async(req,res)=>{


    const listOfUsers = await userModel.getAllUsers()
    res.json({
        message : "A list of all the users",
        data : listOfUsers
    })

})


router.get("/:id",ensureCorrectUserOrAdmin,async(req,res)=>{

const id = parseInt(req.params.id);

const user = await userModel.getUser(id);


if(!user)
{

    throw new NotFoundError(`User with id :${id} cannot be found`);
}
else 
{
    res.json({
        message : `User with id ${id}`,
        data : user
    })
}


})


router.post("/",async(req,res)=>{

    const userData = req.body;

    const validator = jsonschema.validate(req.body, userRegisterSchema);

    if (!validator.valid) {

    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
    }

    
    //Check to see if the username already exists
    const foundUser = await userModel.getUserByUsername(req.body.username);

    if(foundUser)
    {
    
       throw new BadRequestError(`Sorry the username ${req.body.username} already exists`);
    }


    const user = await userModel.createUsers(userData) // create
    res.status(201).json({
        message: "A user was created!",
        data : user 
    })


})


router.put("/:id", ensureCorrectUserOrAdmin,async (req,res)=>{


    const id  = parseInt(req.params.id);
    let fetchedUser = await userModel.getUser(id);


    if(!fetchedUser)
    {

        res.status(404).json({
            message : `User with id :${id} cannot be found`
        })
    }
    else
    { 
        /*
            This allows your the client application to pass only the fields that the want to update
        */
        const userData = {
            first_name : req.body.first_name ? req.body.first_name : fetchedUser.first_name,
            last_name : req.body.last_name ? req.body.last_name: fetchedUser.last_name, 
            location : req.body.location ? req.body.location : fetchedUser.location, 
        }
        
        const user = await userModel.updateUser(userData,id);


        res.json({
            message : `User with id ${user.id} was updated`,
            data : user
        })

    }
})

router.delete("/:id",ensureCorrectUserOrAdmin,async(req,res)=>{

    const id = parseInt(req.params.id);

    const user = await userModel.getUser(id);
    
    if(!user)
    {
        res.status(404).json({
            message : `User with id :${id} cannot be found`
        })
    }
    
    else 
    {
        await userModel.deleteUser(id)
        res.json({
            message : `User with id ${id} was deleted`
            
        })
    }
    


})

module.exports=router;