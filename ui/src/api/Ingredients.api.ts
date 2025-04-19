import { getFromApi, postToApi } from ".";
import { Ingredient } from "../../../api/src/shared/types/ingredient";

export const fetchIngredients = async (
  searchInput: string
): Promise<Ingredient[]> => {
  console.log("Fetching ingredients with input:", searchInput);
  const url = `/ingredients?search=${encodeURIComponent(searchInput)}`;
  console.log("Constructed URL:", url);
  const response = await getFromApi<Ingredient[]>(url);
  console.log("Ingredients fetched:", response);
  return response;
};

export const addNewIngredient = async (
  ingredientInsert: Ingredient
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
