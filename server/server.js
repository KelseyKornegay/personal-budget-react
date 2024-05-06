import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import budgetModel from '../src/Model/budget_schema.js';
import compression from 'compression'; //gzip//
// import axios from 'axios';
import jwt from 'jsonwebtoken'; 


const app = express();
const url = 'mongodb://127.0.0.1:27017/personal_budget_mongodb';


app.use(cors());
app.use(express.json());
app.use(compression());


app.use('/', express.static('src/index.js')); 

// Define the user model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    budget: [{    //just added this line today//
      title: String,
      value: Number,
      color: String
  }]
});

  
  const userModel = mongoose.model('User', userSchema);

  app.get('/', (req, res) => {
    res.status(200).send('Server is running');
  });
  
  // Add the signup route handler
  app.post('/api/signup', async (req, res) => {
    try {
      await mongoose.connect(url);
      const newUser = new userModel(req.body);
      const result = await newUser.save();
      res.status(201).send({ message: 'User created', user: result });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      // await mongoose.connection.close();
    }
  });

 const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

  export { authenticateToken };

  app.get('/api/protected', authenticateToken, (req, res) => {
    // This route is now protected. Only requests with a valid token can access it.
    // User can access the user's information with req.user
    res.send('Protected data');
  });


const ACCESS_TOKEN_SECRET = 'shadowcapone328823'; // Secret key for JWT token
 

 app.post("/api/login", async (req, res) => {
    try {
      await mongoose.connect(url);
      const user = await userModel.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials', message: 'The username does not exist' });
      }
      if (user.password !== req.body.password) {
        return res.status(400).json({ error: 'Invalid credentials', message: 'Wrong password' });
      }
  
      // Generate a token for the user
      const token = jwt.sign({ username: user.username }, ACCESS_TOKEN_SECRET);
  
      res.send({ message: 'Logged in successfully', user: user, token: token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    } finally {
      // await mongoose.connection.close();
    }
  });


// app.use('/', express.static('src/index.js')); 

//There is no app.get ? //

app.post("/budget", async (req, res) => {
  try {
    await mongoose.connect(url);
    const data = await budgetModel.find({ userID: req.body.userID});
    console.log("Fetched data:", data);
    res.send(data);

    //await mongoose.connection.close();
    //console.log("Connection closed");
} catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).send("Internal Server Error");
}
});



app.post("/addNewBudget", async (req, res) => {
  console.log('Request body:', req.body);
      try {
      await mongoose.connect(url);
  }   catch (error) {
      console.error("Error connecting to the database:", error);
      return res.status(500).send("Error connecting to the database");
  }
      try {
      let newData = new budgetModel(req.body);
      console.log('New data:', newData);
      await newData.save();
  }   catch (error) {
      console.error("Error inserting data:", error);
      console.error('Error message:', error.message);
      return res.status(500).send("Error inserting data");
  }
    res.send("Data Entered Successfully");
      try {
      // await mongoose.connection.close();
  }   catch (error) {
      console.error("Error closing the connection:", error);
      return res.status(500).send("Error closing the connection");
  }
});


app.delete("/deleteBudget/:id", async (req, res) => {
  console.log('Request to delete budget item with id:', req.params.id);
  try {
      await mongoose.connect(url);
  } catch (error) {
      console.error("Error connecting to the database:", error);
      return res.status(500).send("Error connecting to the database");
  }

  try {
      await budgetModel.findByIdAndDelete(req.params.id);
  } catch (error) {
      console.error("Error deleting data:", error);
      console.error('Error message:', error.message);
      return res.status(500).send("Error deleting data");
  }

  res.send("Data Deleted Successfully");

  try {
      // await mongoose.connection.close();
  } catch (error) {
      console.error("Error closing the connection:", error);
      return res.status(500).send("Error closing the connection");
  }
});



app.listen(3001, () => {
    console.log('Server is running on port 3001');
});


export default app; // Export the app object for testing