import express from 'express'
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;


//GET all customers
app.get('/api/customers', async (req, res)=>{
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const customers = await collection.find({}).toArray();
        res.json(customers);

    } catch(error) {
        console.log("Error: ", error);
        res.status(500).send("Something went wrong.... :(");
    }
})

//TODO: POST all customers
app.post('/api/customers', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        // Insert a new customer
        console.log(req.body);
        const result = await collection.insertOne(req.body);
        
        res.sendStatus(201);
        console.log("New customer added!");

    } catch(error) {
        console.log("Error: ", error);
        res.status(500).send("Something went wrong.... :(");
    } 
});

//TODO: PUT all customers

//TODO: DELETE all customers


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});