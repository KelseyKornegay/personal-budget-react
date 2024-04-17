import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import budgetModel from '../src/Model/budget_schema.js';

const app = express();
const url = 'mongodb://127.0.0.1:27017/personal_budget_mongodb';

app.use(cors());
app.use(express.json());

app.use('/', express.static('public'));

app.get('/budget', async (req, res) => {
    try {
        await mongoose.connect(url);
        console.log("Connected to the database");

        const data = await budgetModel.find({});
        console.log("Fetched data:", data);
        res.send(data);

        await mongoose.connection.close();
        console.log("Connection closed");
    } catch (error) {
        console.error("Error handling the request:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/addNewBudget", async (req, res) => {
    console.log(req.body);
    try {
        await mongoose.connect(url);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        return res.status(500).send("Error connecting to the database");
    }

    try {
        let newData = new budgetModel(req.body);
        await newData.save();
    } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).send("Error inserting data");
    }

    res.send("Data Entered Successfully");

    try {
        await mongoose.connection.close();
    } catch (error) {
        console.error("Error closing the connection:", error);
        return res.status(500).send("Error closing the connection");
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});








// app.get('/budget', (req, res) => {  
//    try {
//     // eslint-disable-next-line no-undef
//     const data = fs.readFileSync('budget.json', 'utf-8');
//     const budgetData = JSON.parse(data);
//     res.json(budgetData);
//    } catch (err) {
//         console.log(err.message)
//    }
// }); 

// app.listen(3001, () => {
//     console.log('Server is running on port 3001');
// });