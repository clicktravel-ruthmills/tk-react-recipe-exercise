import { request } from '../utils/api';
import { Recipe } from './types';

export {};

export const listRecipes = (name: string): Promise<Array<Recipe>> =>
    request('GET', name).then(
        (response) => response.results || response
    );
