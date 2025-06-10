import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");

const conn = await client.connect().catch((e) => {
  console.error("Failed to connect to MongoDB:", e);
  process.exit(1);
});

const db = conn.db("defense-db");

export default db;
