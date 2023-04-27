import express from 'express';
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();

const url = process.env.DB_URL
const client = new MongoClient(url);
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
}
run().catch(console.dir);

app.use(express.json());
app.use(cors());


app.post('/registration', async (req, res) => {
  try {
    const collection = client.db("auth").collection("user");
    const result = await collection.insertOne(req.body);
    // res.status(200).json({ message: "Registration successful"});
  } catch (err) {
    console.log(err);
    // res.status(500).json({ message: "Error registering user" });
  }
});

  
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
