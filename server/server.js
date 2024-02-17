import express from 'express';
import cors from 'cors';
import funStuff from 'fs';

//const fs = require('fs');
const fs = funStuff;
const app = express();

app.use(cors());

app.get('/hello', (req, res) => {
    res.send('Hello!');
});


app.get('/budget', (req, res) => {  
   try {
    // eslint-disable-next-line no-undef
    const data = fs.readFileSync('budget.json', 'utf-8');
    const budgetData = JSON.parse(data);
    res.json(budgetData);
   } catch (err) {
        console.log(err.message)
   }
}); 

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});