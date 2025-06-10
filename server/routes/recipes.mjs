import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (_, res) => {
  let collection = await db.collection("recipes");
  let results = await collection.find({}).limit(50).toArray();

  res.send(results).status(200);
});

export default router;
