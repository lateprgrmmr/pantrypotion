import { Ingredient } from "../../shared/types/ingredient";
import { PantryTable } from "../types";
import { Connection } from "../connection";

export class IngredientDAO {
    protected async getTable(db: Connection) {
        return new PantryTable<Ingredient>(db.ingredient, db.ingredient);
    }

    async findByName(db: Connection, name: string): Promise<Ingredient[]> {
        const table = await this.getTable(db);
        return await table.find({ name });
    }

    async findAllForName(db: Connection, name: string): Promise<Ingredient[]> {
        const ingredient = await this.getTable(db);
        const results = ingredient.script('findAllForName')({
            name,
        });
        return results;
    }
}