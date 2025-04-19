import { useEffect, useState } from "react";
import { addNewIngredient, fetchIngredients } from "../api/Ingredients.api";
import { Ingredient } from "../../../api/src/shared/types/ingredient";
import IngredientSelector from "./IngredientSelector";
import { useDebounce } from "../hooks/useDebounce";

const RecipeForm = () => {
  const [inggredientOptions, setIngredientOptions] = useState<Ingredient[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedInputValue = useDebounce(inputValue, 300);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [loadingIngredients, setLoadingIngredients] = useState<boolean>(false);

  useEffect(() => {
    if (!inputValue) {
      setIngredientOptions([]);
      return;
    }

    const fetch = async () => {
      setLoadingIngredients(true);
      const data = await fetchIngredients(debouncedInputValue);
      setIngredientOptions(data || []);
      setLoadingIngredients(false);
    };

    fetch();
  }, [inputValue]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const hendleIngredientSelect = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) => [...prev, ingredient]);
  };

  const handleIngredientCreate = async (value: string) => {
    const newIngredient = {
      name: value,
      description: "",
    };
    const createdIngredient = await addNewIngredient(newIngredient);
    setSelectedIngredients((prev) => [...prev, createdIngredient]);
    return createdIngredient;
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", paddingTop: "2rem" }}>
      <h1>Recipe Form</h1>
      <IngredientSelector
        options={inggredientOptions}
        inputValue={inputValue}
        loading={loadingIngredients}
        onInputChange={handleInputChange}
        onSelect={hendleIngredientSelect}
        onCreate={handleIngredientCreate}
      />
      <div>
        {selectedIngredients.map((ing, index) => (
          <div key={index} style={{ margin: "0.5rem 0" }}>
            <span>{ing.name}</span>
            <button
              style={{ marginLeft: "1rem" }}
              onClick={() => {
                setSelectedIngredients((prev) =>
                  prev.filter((_, i) => i !== index)
                );
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeForm;
