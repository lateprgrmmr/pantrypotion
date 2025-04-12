import { Router, Request, Response } from "express";
import { findIngredients } from "./api";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const db = req.app.get('db');
  console.log('Received request to search ingredients with query:', req);
  const searchInput = req.query.search?.toString().toLowerCase() || "";

  const ingredients = await findIngredients(db, searchInput);
  res.json(ingredients);
});

export default router;