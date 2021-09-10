import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RecipeForm from '../../components/RecipeForm';
import { getRecipe, updateRecipe } from '../../data/api';

type Props = {
};

type EditRecipeParams = {
    id: string,
};

const EditRecipe = ({
}: Props) => {
    const { id } = useParams<EditRecipeParams>();

    const [recipe, setRecipe] = useState<any>();

    const retrieveAndSetRecipe = async () => {
        try {
            const existingRecipe = await getRecipe(parseInt(id));
            setRecipe(existingRecipe);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        retrieveAndSetRecipe()
    }, []);

    return (
        <RecipeForm value={recipe} onSubmit={updateRecipe}/>
    );
};

export default EditRecipe;
