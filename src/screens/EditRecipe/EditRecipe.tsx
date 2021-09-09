import React from 'react';
import RecipeForm from '../../components/RecipeForm';
import { updateRecipe } from '../../data/api';

type Props = {
};

const EditRecipe = ({
}: Props) => {

    return (
        <RecipeForm onSubmit={updateRecipe}/>
    );
};

export default EditRecipe;
