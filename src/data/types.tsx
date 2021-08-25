interface Ingredient {
    name: string,
};

interface Recipe {
    id?: number,
    name: string,
    description: string,
    ingredients: Array<Ingredient>,
};
