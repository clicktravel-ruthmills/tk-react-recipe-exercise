import { request } from '../utils/api';
import { Recipe } from './types';

export const listRecipes = (name: string): Promise<Array<Recipe>> =>
    request('GET', '', name).then(
        (response) => response.results || response
    );

export const createRecipe = (recipe: Recipe): Promise<void> =>
    request('POST', '', '').then(
        (response) => response.results || response
    );

export const updateRecipe = (recipe: Recipe): Promise<void> =>
    request('PATCH', recipe.id, '').then(
        (response) => response.results || response
    );

export const deleteRecipe = (id: number): Promise<void> =>
    request('DELETE', id, '').then(
        (response) => response
    );
