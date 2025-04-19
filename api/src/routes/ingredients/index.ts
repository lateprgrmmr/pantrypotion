import express from "express";
import { Request, Response } from "express";
import { Ingredient } from "../../shared/types/ingredient";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const db = req.app.get("db");
  const search = req.query.search as string;
  console.log("search", search);
  const results: Ingredient[] = await db.ingredient.findAllForName({
    name: search,
  })
  console.log("results", results);
  if (!results) {
    return res.status(404).json({ error: "No ingredients found" });
  }
  return res.status(200).json(results);
});

router.post("/", async (req: Request, res: Response) => {
  const db = req.app.get("db");
  console.log("db", db);
  const { name, description } = req.body;
  // if (!name) {
  //   return res.status(400).json({ error: "Name is required" });
  // }
  const newIngredient: Ingredient = await db.ingredient.insert({
    name,
    description,
  });
  return res.status(201).json(newIngredient);
});

export default router;
