import { Fabricator, sequence } from '@travelperksl/fabricator';
import faker from 'faker';

export const ingredientFabricator = Fabricator({
    name: () => faker.random.words(),
});

export const recipeFabricator = Fabricator({
    id: () => sequence('recipeId'),
    name: () => faker.random.words(),
    description: () => faker.random.words(),
    ingredients: () => ingredientFabricator.times({ min: 1, max: 5, }),
});

export const recipeFabricatorWithNoId = recipeFabricator.extend({ id: undefined });

export default {
    ingredientFabricator,
    recipeFabricator,
    recipeFabricatorWithNoId,
};
