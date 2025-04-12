import { getFromApi } from ".";
import { Ingredient } from "../components/IngredientSearch";

export const fetchIngredients = async (searchInput: string): Promise<Ingredient[]> => {
    console.log('Fetching ingredients with input:', searchInput);
    const url = `/ingredients?search=${encodeURIComponent(searchInput)}`;
    const response = await getFromApi<Ingredient[]>(url);
    console.log('Ingredients fetched:', response);
    return response;
}