import { Connection } from "../../database/connection";
import { Ingredient } from "../../shared/types/ingredient";

export const findIngredients = async (db: Connection, searchInput: string) => {
  console.log("Searching for ingredients with input:", searchInput);
  console.log("searchInput:", searchInput);
  const ingredients = await db.ingredient.find();
  // const ingredients = await db.ingredient.find({
  //     name: { ilike: `%${searchInput}%` }, // example with MassiveJS or raw SQL
  // });
  console.log("Ingredients found:", ingredients);
  return ingredients;
};

export const createIngredient = async (db: Connection, name: string, description: string) => {
  console.log("Creating ingredient with name:", name);
  const newIngredient: Ingredient = await db.ingredient.insert({
    name,
    description
  })
  console.log("Ingredient created:", newIngredient);
  return newIngredient;
};
