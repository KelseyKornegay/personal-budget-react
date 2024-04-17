
//All of this was taken from an old assignment, will probably need to be tweaked. Unsure If putting crud_mongoose.js in the src folder under it's own folder is correct//

import { connect, connection } from 'mongoose';
import { find } from './model/budget_schema';


let url = 'mongodb://127.0.0.1:27017/personal_budget_mongodb';

async function connectToDatabase() {
    try {
        await connect(url);
        console.log("Connected to database");

        // Fetch
        const data = await find({});
        console.log(data);

        // Close connection
        await connection.close();
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

connectToDatabase();