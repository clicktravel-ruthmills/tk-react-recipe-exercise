import React from 'react';
import { render } from '@testing-library/react';
import { recipe as recipeFabricator } from '../../data/fabricators';
import RecipeRow from './RecipeRow';

describe('<RecipeRow />', () => {
    it('should render recipe row', () => {
        const recipe = recipeFabricator();
        const ingredients =
            recipe.ingredients.map(ingredient => ingredient.name).join(', ');
        const recipeRow = render (
            <RecipeRow value={recipe} />
        );
        expect(recipeRow.queryByText(recipe.name)).toBeInTheDocument();
        expect(recipeRow.queryByText(recipe.description)).toBeInTheDocument();
        expect(recipeRow.queryByText(ingredients)).toBeInTheDocument();
    });
});
