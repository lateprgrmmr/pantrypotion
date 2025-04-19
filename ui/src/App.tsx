// import IngredientInput from "./components/IngredientInput";
import RecipeForm from "./components/RecipeForm";

function App() {
  return (
    <div style={{ maxWidth: 600, margin: "auto", paddingTop: "2rem" }}>
      <div>Enter Ingredient</div>
      <div>
        <RecipeForm />
      </div>
    </div>
  );
}

export default App;
