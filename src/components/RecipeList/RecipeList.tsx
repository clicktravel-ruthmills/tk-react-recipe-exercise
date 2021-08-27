import React from 'react';
import 'styled-components/macro';
import { Recipe } from '../../data/types';
import RecipeRow from '../RecipeRow/RecipeRow';

type Props = {
    value: Array<Recipe>,
};

const RecipeList = ({
    value,
}: Props) => {

    return (
        <div className="recipeList">
            {
                value.map(recipe => {
                    return (
                        <RecipeRow value={recipe} />
                    )
                })
            }
        </div>
    )
};

export default RecipeList;
