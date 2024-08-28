import express from 'express'
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.get('/api/customers', async (req, res)=>{
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const customers = await collection.find({}).toArray();
        res.json(customers);
        console.log(customers);

    } catch(error) {
        console.log("Error: ", error);
        res.status(500).send("Something went wrong.... :(");
    }
})

app.post('/api/customers', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        // Insert a new customer
        const result = await collection.insertOne(req.body);
        
        res.status(201).json(result.ops[0]);
        console.log("New customer added:", result.ops[0]);

    } catch(error) {
        console.log("Error: ", error);
        res.status(500).send("Something went wrong.... :(");
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});