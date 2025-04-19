interface IngredientInputProps {
  onIngredientChange: (ingredient: string) => void;
  onSubmit: (ingredient: string) => void;
}

const IngredientInput = (props: IngredientInputProps) => {
  const { onIngredientChange, onSubmit } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const ingredient = formData.get("ingredient") as string;
    onSubmit(ingredient);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onIngredientChange(value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Ingredient Input</h2>
        <label htmlFor="ingredient">Ingredient:</label>
        <input
          type="text"
          id="ingredient"
          name="ingredient"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
export default IngredientInput;
