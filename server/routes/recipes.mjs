import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (_, res) => {
  let collection = await db.collection("recipes");
  let results = await collection.find({}).limit(50).toArray();

  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("recipes");
  let id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid ID format" });
  }

  let result = await collection.findOne({ _id: new ObjectId(id) });

  if (!result) {
    return res.status(404).send({ error: "Recipe not found" });
  }

  res.send(result).status(200);
});

export default router;
