import { connectDb } from "./connection"
import { IngredientDAO } from "./dao/IngredientDAO";



export async function databaseConnectionFunction() {
    return connectDb();
}

export default {
    ingredient: new IngredientDAO()
}