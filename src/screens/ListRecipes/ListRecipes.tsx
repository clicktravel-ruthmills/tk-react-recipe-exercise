import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import RecipeList from '../../components/RecipeList/RecipeList';
import { listRecipes, deleteRecipe } from '../../data/api';
import { Recipe } from '../../data/types';

type Props = {
};

const ListRecipes = ({
}: Props) => {
    const [name, setName] = useState('');
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const history = useHistory();

    const handleNameChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setName(event.currentTarget.value);
    };

    const retrieveAndSetRecipes = async () => {
        try {
            const newRecipes = await listRecipes(name);
            setRecipes(newRecipes);
        } catch (err) {
            console.error(err);
        }
    };

    const search = (event: React.FormEvent) => {
        event.preventDefault();
        retrieveAndSetRecipes();
    };

    const editSelectedRecipe = async (id: number) => {
        history.push('/edit/' + id);
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
            <Form>
                <Label>Name</Label>
                <Input type='text'
                       data-testid='recipe-search-name'
                       placeholder='Recipe name to search for, e.g. Pizza'
                       value={name}
                       onChange={handleNameChange}
                />
                <Button submit={true} primary={true} color='green' onClick={search}>Search</Button>
            </Form>
            <RecipeList
                value={recipes}
                editRecipe={editSelectedRecipe}
                deleteRecipe={deleteSelectedRecipe}
            />
        </div>
    );
};

export default ListRecipes;
