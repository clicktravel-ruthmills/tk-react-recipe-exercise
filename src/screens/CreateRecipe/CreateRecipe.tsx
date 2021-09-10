import React from 'react';
import { useHistory } from 'react-router-dom';
import RecipeForm from '../../components/RecipeForm';
import { createRecipe } from '../../data/api';
import { Recipe } from '../../data/types';

type Props = {
};

const CreateRecipe = ({
}: Props) => {
    const history = useHistory();

    const createNewRecipe = async (recipe: Recipe) => {
        await createRecipe(recipe);
        history.push('/');
    };

    return (
        <RecipeForm onSubmit={createNewRecipe}/>
    );
};

export default CreateRecipe;
