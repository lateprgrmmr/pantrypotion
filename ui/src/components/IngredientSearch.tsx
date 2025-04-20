import { Box, Button, Card, CardContent, CircularProgress, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Ingredient } from "../shared/types/ingredient";
import { useEffect, useState } from "react";
// import { useDebounce } from "../hooks/useDebounce";
import { addNewIngredient, fetchIngredients } from "../api/Ingredients.api";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import NewIngredientDialog from "./NewIngredientDialog";
import { IngredientInsert } from "../../../api/src/shared/types/ingredient";
import { filterArray } from "../shared/utils";


interface IngredientSearchProps {
  selectedIngredients: Ingredient[];
  onIngredientSelected: (ingredient: Ingredient) => void;
}

const IngredientSearch = (props: IngredientSearchProps) => {
  const { onIngredientSelected, selectedIngredients } = props;
  const [search, setSearch] = useState<string>("");
  const [newIngredientDialogOpen, setNewIngredientDialogOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      return;
    }

    const fetchOptions = async () => {
      setLoading(true);
      try {
        const ingredients = await fetchIngredients(search);
        setSearchResults(ingredients);
        console.log("searchResults", filterArray(ingredients, selectedIngredients, "id"));
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [search, selectedIngredients]);


  const handleCreateNewIngredient = async (name: string, description: string) => {
    if (!name) {
      console.error("Name is required");
      return;
    }
    const newIngredient: IngredientInsert = {
      name,
      description,
    };
    await addNewIngredient(newIngredient);
    setSearch("");
    setNewIngredientDialogOpen(false);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={3}
    >
      <Card elevation={2}>
        <CardContent sx={{ pt: 3, pb: 3 }}>
          <Box>
            <TextField
              fullWidth
              placeholder="Search for ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        {loading ? <CircularProgress /> : <CloseIcon fontSize="small" onClick={() => setSearch("")} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
              variant="outlined"
              size="medium"
            />
          </Box>
        </CardContent>
      </Card>

      {searchResults.map((ingredient) => (
        <Card
          key={ingredient.id}
          sx={{ mb: 2, cursor: "pointer" }}
          onClick={() => onIngredientSelected(ingredient)}
        >
          <Typography sx={{ p: 2 }}>
            {ingredient.name}: {ingredient.description}
          </Typography>
        </Card>
      ))}

      {search && !loading && (
        <Card elevation={2}>
          <CardContent sx={{ py: 3 }}>

            <Typography>Add new ingredient - "{search}"</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setNewIngredientDialogOpen(true)}
              sx={{ mt: 2 }}
            >
              Add New
            </Button>
          </CardContent>
        </Card>
      )}

      <NewIngredientDialog
        isOpen={newIngredientDialogOpen}
        onClose={() => setNewIngredientDialogOpen(false)}
        onSave={(name, description) => handleCreateNewIngredient(name, description)}
      />

    </Box >
  );
}
export default IngredientSearch;