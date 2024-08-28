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
app.put('/api/customers/:id', async (req, res) => {
    try {
        //read parameters
        const { id } = req.params;
        console.log(req.body)
        console.log(req.body.name)
        //connect to client
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        //update customer
        const result = await collection.updateOne({_id: new ObjectId(id)},{$set:{name: req.body.name, email: req.body.email, password: req.body.password}});

        res.sendStatus(201);
        console.log('Updating user:', id);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Something went wrong.... :(");
    }
});


//TODO: DELETE all customers
app.delete('/api/customers/:id', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        // Insert a new customer
        console.log(req.params.id);
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        
        res.sendStatus(201);
        console.log("New customer added!");

    } catch(error) {
        console.log("Error: ", error);
        res.status(500).send("Something went wrong.... :(");
    } 
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});