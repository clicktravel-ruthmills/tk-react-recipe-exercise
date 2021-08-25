import { Fabricator, sequence } from '@travelperksl/fabricator';
import faker from 'faker';

export const ingredient = Fabricator({
    name: () => faker.random.words(),
});

export const recipe = Fabricator({
    id: () => sequence('recipeId'),
    name: () => faker.random.words(),
    description: () => faker.random.words(),
    ingredients: () => ingredient.times({ min: 1, max: 5, }),
});

export const recipeWithNoId = recipe.extend({ id: undefined });

export default {
    ingredient,
    recipe,
    recipeWithNoId,
};
