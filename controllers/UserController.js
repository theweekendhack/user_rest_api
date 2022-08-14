const express = require('express');
const router = express.Router();

const userModel = require("../models/UserModels.js");


router.get("/",async(req,res)=>{


    const listOfUsers = await userModel.getAllUsers()
    res.json({
        message : "A list of all the users",
        data : listOfUsers
    })

})


router.get("/:id",async(req,res)=>{


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
    res.json({
        message : `User with id ${id}`,
        data : user
    })
}




})


router.post("/",async(req,res)=>{

const userData = req.body;

const user = await userModel.createUsers(userData) // create
res.status(201).json({
    message: "A user was created!",
    data : user 
})


})


router.put("/:id", async (req,res)=>{


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

router.delete("/:id",async(req,res)=>{

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