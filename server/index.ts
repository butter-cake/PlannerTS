import express from "express";
import { ObjectId } from "mongodb";
const { MongoClient, ServerApiVersion } = require("mongodb");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const CONNECTION_STRING: string = process.env.ATLAS_URI as string;
const PORT = 8080;
const cors = require("cors");
app.use(cors());
app.use(express.json());

const client = new MongoClient(CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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

app.post("/api/testPost", async (req, res) => {
  try {
    const { _id, description } = req.body;
    // console.log("From backend", _id);

    const database = client.db("Planner_Database");
    const collection = database.collection("Planner_Collection");

    const result = await collection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(_id) }, // Filter by the document's _id
      { $set: { description } }, // Set the new description
      { returnDocument: "after" } // Return the updated document
    );

    res.status(201).json({ message: "Description added successfully", result });
  } catch (error) {
    console.error("Error updating sticky note coordinates:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/updateCoords", async (req, res) => {
  try {
    const { _id, last_x_coord, last_y_coord } = req.body;
    const database = client.db("Planner_Database");
    const collection = database.collection("Planner_Collection");
    const stickyNote = await collection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(_id) },
      {
        $set: { last_x_coord, last_y_coord },
      },
      { returnDocument: "after" }
    );
    console.log(stickyNote);
    res.json({
      _id: stickyNote._id,
      last_x_coord: stickyNote.last_x_coord,
      last_y_coord: stickyNote.last_y_coord,
    });
  } catch (error) {
    console.error("Error updating sticky note coordinates:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});
