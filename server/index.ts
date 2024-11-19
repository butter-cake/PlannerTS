import express from "express";
// import * as mongoDB from "mongodb";
// import mongoose, { connect } from "mongoose";
const { MongoClient, ServerApiVersion } = require("mongodb");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const CONNECTION_STRING: string = process.env.ATLAS_URI as string;
const PORT = 8080;
const cors = require("cors");
app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

const client = new MongoClient(CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(CONNECTION_STRING);
//     console.log("Connected to the db");
//   } catch (err) {
//     console.error("Failed to connect to the db", err);
//   }
// };

// connectToDatabase();

app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);

  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
});

app.get("/api/testGet", async (req, res) => {
  try {
    const database = client.db("Planner_Database");
    const collection = database.collection("Planner_Collection");
    const listCollection = await collection.find({}).toArray();
    res.json({ listCollection });
  } catch (error) {
    console.error("Error fetching list:", error);
    res.status(500).json({ error: "Failed to fetch list" });
  }
});

// app.listen(8080, () => {
//   console.log("Server is running on port 8080");
// });

// export default connectToDatabase;
