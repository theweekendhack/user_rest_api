const db = require("../config/db.js");
const bcrypt= require("bcryptjs");

class User 
{

    static async createUsers(user)
    {
    
       
        const salt = await bcrypt.genSalt(10); 
        const hashPassword = await bcrypt.hash(user.password,salt);
        const results= await db.query(`INSERT INTO users (first_name,last_name,username,password,location) VALUES('${user.first_name}','${user.last_name}','${user.username}', '${hashPassword}','${user.location}') RETURNING *`);
        return results.rows[0];
    }
    static async getAllUsers()
    {

        //ALWAYS RETURN 0 OR MANY!!
        const results= await db.query("SELECT id, first_name,last_name,location,username,password FROM users;");
  
        return results.rows; 
    }

    static async getUser(id)
    {

        //ALWAYS RETURN 0 or 1
        //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!! 
        const results=  await db.query(`SELECT id, first_name,last_name,location,username,password FROM users WHERE id = ${id}`);
        return results.rows[0];
         
    }

    static async deleteUser(id)
    {
        const results=  await db.query(`DELETE FROM users WHERE id = ${id} RETURNING *`);
        return results.rows[0];
    }

    static async updateUser(user_form_data,id)
    {

        const results= await db.query(`UPDATE users SET first_name ='${user_form_data.first_name}',
        last_name='${user_form_data.last_name}',
        location='${user_form_data.location}'
        WHERE id=${id} RETURNING *;`)
        
        return results.rows[0];
    }

  
}


module.exports = User;