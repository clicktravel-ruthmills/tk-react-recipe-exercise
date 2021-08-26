export interface Ingredient {
    name: string,
}

export interface Recipe {
    id?: number,
    name: string,
    description: string,
    ingredients: Array<Ingredient>,
}

export interface RecipeList {
    recipes: Array<Recipe>,
}
