import React from 'react';
import RecipeList from '../../components/RecipeList/RecipeList';
import { listRecipes } from '../../data/api';
import { Recipe } from '../../data/types';

type Props = {
};

const ListRecipes = ({
}: Props) => {

    const recipes: Array<Recipe> = [];

    return (
        <div>
            <RecipeList value={recipes}/>
        </div>
    );
};

export default ListRecipes;
