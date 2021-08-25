import { Fabricator } from '@travelperksl/fabricator';
import faker from 'faker';

export const ingredientFabricator = Fabricator({
    name: () => faker.random.words(),
});

export const recipeFabricator = Fabricator({
    name: () => faker.random.words(),
    description: () => faker.random.words(),
    ingredients: () => ingredientFabricator.times(faker.datatype.number({
        'min': 1,
        'max': 5,
    })),
});
