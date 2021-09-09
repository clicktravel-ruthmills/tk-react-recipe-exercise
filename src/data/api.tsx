import { request } from '../utils/api';
import { Recipe } from './types';

export const listRecipes = (name: string): Promise<Array<Recipe>> =>
    request('GET', name).then(
        (response) => response.results || response
    );

export const createRecipe = (recipe: Recipe): Promise<void> =>
    request('POST', JSON.stringify(recipe)).then(
        (response) => response.results || response
    );
