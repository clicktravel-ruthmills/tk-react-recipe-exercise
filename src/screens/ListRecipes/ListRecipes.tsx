import React, { useState, useEffect } from 'react';
import RecipeList from '../../components/RecipeList/RecipeList';
import { listRecipes, deleteRecipe } from '../../data/api';
import { Recipe } from '../../data/types';

type Props = {
};

const ListRecipes = ({
}: Props) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const retrieveAndSetRecipes = async () => {
        try {
            const newRecipes = await listRecipes('');
            setRecipes(newRecipes)
        } catch (err) {
            console.error(err);
        }
    };

    const deleteSelectedRecipe = async (id: number) => {
        try {
            await deleteRecipe(id);
            await retrieveAndSetRecipes();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        retrieveAndSetRecipes()
    }, []);

    return (
        <div>
            <RecipeList value={recipes} deleteRecipe={deleteSelectedRecipe}/>
        </div>
    );
};

export default ListRecipes;
