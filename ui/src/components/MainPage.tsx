import { useState } from "react";
import IngredientSearch from "./IngredientSearch";
import { Ingredient } from "../shared/types/ingredient";
import IngredientList from "./IngredientList";


const MainPage = () => {
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
    return (
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 16px" }}>
            <h1 style={{ fontSize: "1.875rem", fontWeight: 700, marginBottom: "1.5rem" }}>Ingredient Database</h1>
            <IngredientList
                ingredients={ingredientList}
                onIngredientDeleted={(ingredientId) => {
                    setIngredientList((prev) => prev.filter((ingredient) => ingredient.id !== ingredientId));
                }}
            />
            <IngredientSearch
                selectedIngredients={ingredientList}
                onIngredientSelected={(ingredient) => {
                    setIngredientList((prev) => [...prev, ingredient]);
                }
                }
            />
        </main>
    )
}
export default MainPage;