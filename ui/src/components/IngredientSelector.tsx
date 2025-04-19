import { useEffect, useState } from "react";
import { Ingredient } from "../../../api/src/shared/types/ingredient";
import { fetchIngredients } from "../api/Ingredients.api";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";

interface IngredientSelectorProps {
  options: Ingredient[];
  inputValue: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onSelect: (ingredient: string) => void;
  onCreate: (ingredient: Ingredient) => Ingredient;
}

const IngredientSelector = (props: IngredientSelectorProps) => {
  const { options, inputValue, loading, onInputChange, onSelect, onCreate } =
    props;

    const handleCreate = async (value: string): Promise<Ingredient> => {
        const newIngredient = {
            name: value,
            description: "",
        };
        const createdIngredient = onCreate(newIngredient);
        return createdIngredient;
    };
  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.name
      }
      filterOptions={(x) => x}
      onInputChange={(_, value) => onInputChange(value)}
      onChange={async (_, value) => {
        if (!value) return;

        const selected =
          typeof value === "string" ? await handleCreate(value) : value;

        onSelect(selected.name);
      }}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ingredient"
          placeholder="Type to search..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default IngredientSelector;
