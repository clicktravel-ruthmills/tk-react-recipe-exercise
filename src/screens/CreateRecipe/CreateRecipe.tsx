import React from 'react';
import RecipeForm from '../../components/RecipeForm';
import { createRecipe } from '../../data/api';

type Props = {
};

const CreateRecipe = ({
}: Props) => {

    return (
        <RecipeForm onSubmit={createRecipe}/>
    );
};

export default CreateRecipe;
