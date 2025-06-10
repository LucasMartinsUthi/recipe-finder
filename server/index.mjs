import express from "express";
import cors from "cors";
import recipes from "./routes/recipes.mjs";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/recipes", recipes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
