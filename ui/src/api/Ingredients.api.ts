import { getFromApi, postToApi } from ".";
import { Ingredient, IngredientInsert } from "../../../api/src/shared/types/ingredient";

export const fetchIngredients = async (
  searchInput: string
): Promise<Ingredient[]> => {
  const url = `/ingredients?search=${encodeURIComponent(searchInput)}`;
  const response = await getFromApi<Ingredient[]>(url);
  return response;
};

export const addNewIngredient = async (
  ingredientInsert: IngredientInsert
): Promise<Ingredient> => {
  console.log("Adding ingredient:", ingredientInsert);
  const url = `/ingredients`;
  const newIngredient = await postToApi<Ingredient>(url, ingredientInsert);
  console.log("Ingredient added:", newIngredient);
  if (!newIngredient) {
    throw new Error("Failed to add ingredient");
  }
  return newIngredient;
};
