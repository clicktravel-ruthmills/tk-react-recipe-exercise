import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RecipeForm from '../../components/RecipeForm';
import { getRecipe, updateRecipe } from '../../data/api';
import { Recipe } from '../../data/types';

type Props = {
};

type EditRecipeParams = {
    id: string,
};

const EditRecipe = ({
}: Props) => {
    const { id } = useParams<EditRecipeParams>();
    const history = useHistory();

    const [recipe, setRecipe] = useState<any>();

    const retrieveAndSetRecipe = async () => {
        try {
            const existingRecipe = await getRecipe(parseInt(id));
            setRecipe(existingRecipe);
        } catch (err) {
            console.error(err);
        }
    };

    const updateExistingRecipe = async (recipe: Recipe) => {
        await updateRecipe(parseInt(id), recipe);
        history.push('/');
    };

    useEffect(() => {
        retrieveAndSetRecipe()
    }, []);

    return (
        <RecipeForm value={recipe} onSubmit={updateExistingRecipe}/>
    );
};

export default EditRecipe;
