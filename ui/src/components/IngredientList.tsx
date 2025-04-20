import { Ingredient } from "../shared/types/ingredient";

interface IngredientListProps {
    ingredients: Ingredient[];
    onIngredientDeleted: (ingredientId: number) => void;
}

const IngredientList = (props: IngredientListProps) => {
    const { ingredients, onIngredientDeleted } = props;

    return (
        <div>
            <h2>Ingredient List</h2>
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        <span>{ingredient.name}</span>
                        <button onClick={() => onIngredientDeleted(ingredient.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default IngredientList;