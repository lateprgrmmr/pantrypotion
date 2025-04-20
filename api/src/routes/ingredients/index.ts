import daos from "../../database"
import { Request, Response, Router } from "express";
import { Ingredient } from "../../shared/types/ingredient";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const db = req.app.get("db");
  const search = req.query.search as string;
  console.log("search", search);
  const results = await daos.ingredient.findAllForName(db, search)
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
  const newIngredient: Ingredient = await db.ingredient.insert({
    name,
    description,
  });
  return res.status(201).json(newIngredient);
});

export default router;
