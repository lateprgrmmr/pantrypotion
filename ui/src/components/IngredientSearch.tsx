// src/components/IngredientSearch.tsx
import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  TextField,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchIngredients } from '../api/Ingredients.api';

export interface Ingredient {
  id: number;
  name: string;
}

export const IngredientSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue.trim() === '') return;

    const loadIngredients = async () => {
      setLoading(true);
      try {
        const data = await fetchIngredients(inputValue);
        console.log('Fetched ingredients:', data);
        
        setOptions(data); // Assuming `data` is an array of Ingredient
      } catch (err) {
        console.error('Failed to fetch ingredients:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(loadIngredients, 300); // debounce fetch
    return () => clearTimeout(debounce);
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
      loading={loading}
      onInputChange={(_, value) => setInputValue(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search ingredients"
          InputProps={{
            ...params.InputProps,
            startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
