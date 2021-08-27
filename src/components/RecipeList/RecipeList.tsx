import React from 'react';
import 'styled-components/macro';
import { Recipes } from '../../data/types';
import RecipeRow from '../RecipeRow/RecipeRow';

type Props = {
    value: Recipes,
};

const RecipeList = ({
    value,
}: Props) => {

    const { recipes } = value;

    return (
        <div className="recipeList">
            {
                recipes.map(recipe => {
                    return (
                        <RecipeRow value={recipe} />
                    )
                })
            }
        </div>
    )
};

export default RecipeList;
