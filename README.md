## Steps to Run 

1. Clone project onto your machine by running the **git clone git_url .**
1. Create a database called `user_api`
1. Seed the database by running the `user_api.sql` file in the `seed folder`.
    1. To do this, navgiate to the `seed` folder in your terminal and run the following command :     `psql -f user_api.sql user_api `
1. Create a `.env` file
1. Ensure your `.env` file have the below environment variables :
    1. `SECRET_KEY`  - You can assign it value
    1. `PORT` - You can assign it any value you want. Just remember your server will be listening on the PORT number you specify here!
1. Run npm install 
1. Start Your Server.
1. Test your end points in Insomnia
