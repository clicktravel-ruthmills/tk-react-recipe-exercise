type Ingredient = {
    name: string,
};

type Recipe = {
    id?: number,
    name: string,
    description: string,
    ingredients: Array<Ingredient>,
};
