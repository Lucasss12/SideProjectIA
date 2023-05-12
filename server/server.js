import express from 'express';
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import cors from 'cors';
dotenv.config();

const app = express();
const url = process.env.DB_URL
const port = process.env.PORT
const client = new MongoClient(url);
const collection = client.db("auth").collection("user");

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
    const emailExist = await collection.findOne({ email: req.body.email});
    if (emailExist) {
      return res.status(409).json({ message: "email exist"});
    }

    const result = await collection.insertOne(req.body);
    res.status(200).json({ message: "Registration successful"});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post('/login', async (req, res) => {
  const {email, password} = req.body;
  try
  {
    const emailUserMatch = await collection.findOne({email});
    if (!emailUserMatch) {
      return res.status(401).json({message: 'mail or password does not match'});
    }
    
    const passworduserMatch = await bcrypt.compare(password, emailUserMatch.password)
    if (!passworduserMatch) {
      return res.status(401).json({message: 'mail or password does not match'});
    }

    return res.status(200).json({message: 'login successful'});
  } catch (err) {
    console.error(err);
    return res.status(500).json({message: 'login failed'});
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});