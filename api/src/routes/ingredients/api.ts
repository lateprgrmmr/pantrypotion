
export const findIngredients = async (db: any, searchInput: string) => {
    console.log('Searching for ingredients with input:', searchInput);
    console.log('searchInput:', searchInput);
    const ingredients = await db.ingredient.find();
    // const ingredients = await db.ingredient.find({
    //     name: { ilike: `%${searchInput}%` }, // example with MassiveJS or raw SQL
    // });
    console.log('Ingredients found:', ingredients);
    return ingredients;
};