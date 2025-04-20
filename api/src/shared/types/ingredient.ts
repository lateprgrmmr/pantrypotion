import * as t from 'io-ts';
export interface Ingredient {
  id: number;
  name: string;
  description: string;
  created_time: Date;
  updated_time: Date;
  deleted_time: Date;
}

const ingredientInsertType = {
  name: t.string,
  description: t.string,
}

export const ingredientInsertCodec = t.type(ingredientInsertType);
export type IngredientInsert = t.TypeOf<typeof ingredientInsertCodec>;