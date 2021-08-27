import React from 'react';
import 'styled-components/macro';
import { Recipe } from '../../data/types';

type Props = {
    value: Recipe,
};

const RecipeRow = ({
    value,
}: Props) => {

    const { name, description, ingredients } = value;
    const ingredientsText = ingredients.map(ingredient => ingredient.name).join(', ');

    return (
        <div className="recipeRow">
            <div className="name">{name}</div>
            <div className="description">{description}</div>
            <div className="ingredients">{ingredientsText}</div>
        </div>
    );
};

export default RecipeRow;
