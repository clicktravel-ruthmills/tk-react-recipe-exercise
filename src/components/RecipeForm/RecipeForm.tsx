import React, { useState, useEffect } from 'react';
import 'styled-components/macro';
import { Recipe } from '../../data/types';
import Button from '../Button/Button';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Label from '../Label/Label';
import TextArea from '../TextArea/TextArea';

type Props = {
    value?: Recipe,
    onSubmit: (value: Recipe) => Promise<void>
};

const RecipeForm = ({
    value,
    onSubmit,
}: Props) => {
    const [renderError, setRenderError] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');

    const handleNameChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setName(event.currentTarget.value)
    };

    const handleDescriptionChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
        setDescription(event.currentTarget.value)
    };

    const handleIngredientsChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
        setIngredients(event.currentTarget.value);
    };

    const saveRecipe = (event: React.FormEvent) => {
        event.preventDefault();
        const ingredientsArray = ingredients.split(',')
            .map(ingredient => ingredient.trim())
            .filter(ingredient => ingredient.length > 0)
            .map(ingredient => ({
                name: ingredient,
            }));
        if (name && description && ingredientsArray.length > 0) {
            onSubmit({
                name,
                description,
                ingredients: ingredientsArray,
            });
        } else {
            setRenderError(true);
            setTimeout(() => { setRenderError(false) }, 5000)
        }
    };

    const renderErrorMessage = () => {
        if (renderError === true) {
            return (
                <ErrorMessage data-testid='error-message'>Please fill in name and description fields, and add at least one ingredient.</ErrorMessage>
            )
        }
    };

    useEffect(() => {
        if (value) {
            setName(value.name);
            setDescription(value.description);
            setIngredients(value.ingredients.map(
                ingredient => ingredient.name
            ).join(', '));
        }
    }, [value]);

    return (
        <Form>
            <Label>Name</Label>
            <Input type='text'
                data-testid='recipe-name'
                placeholder='Recipe name, e.g. Doner Kebab'
                value={name}
                onChange={handleNameChange}
            />
            <Label>Description</Label>
            <TextArea
                data-testid='recipe-description'
                placeholder='Recipe description, e.g. The tastiest Doner Kebab you have ever eaten'
                value={description}
                onChange={handleDescriptionChange}
                required
            />
            <Label>Ingredients</Label>
            <TextArea
                data-testid='recipe-ingredients'
                placeholder='Comma-separated list of ingredients, e.g. mystery meat, pitta bread, salad, chilli sauce'
                value={ingredients}
                onChange={handleIngredientsChange}
                required
            />
            <Button submit={true} primary={true} color='green' onClick={saveRecipe}>Save Recipe</Button>
            {renderErrorMessage()}
        </Form>
    );
};

export default RecipeForm;
