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

    const handleNameChange = (event: React.FormEvent<HTMLInputElement>): void => {
        setName(event.currentTarget.value)
    };

    const handleDescriptionChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
        setDescription(event.currentTarget.value)
    };

    const saveRecipe = (event: React.FormEvent) => {
        event.preventDefault();
        if (name && description) {
            onSubmit({
                name,
                description,
                ingredients: [],
            });
        } else {
            setRenderError(true);
            setTimeout(() => { setRenderError(false) }, 5000)
        }
    };

    const renderErrorMessage = () => {
        if (renderError === true) {
            return (
                <ErrorMessage>Please fill in name and description fields, and add at least one ingredient.</ErrorMessage>
            )
        }
    };

    useEffect(() => {
        if (value) {
            setName(value.name)
            setDescription(value.description)
        }
    }, [value]);

    return (
        <Form>
            <Label>Name</Label>
            <Input type='text'
                placeholder='Recipe name, e.g. Doner Kebab'
                value={name}
                onChange={handleNameChange}
            />
            <Label>Description</Label>
            <TextArea
                placeholder='Recipe description, e.g. The tastiest Doner Kebab you have ever eaten'
                value={description}
                onChange={handleDescriptionChange}
                required
            />
            <Button submit={true} primary={true} color='green' onClick={saveRecipe}>Save Recipe</Button>
            {renderErrorMessage()}
        </Form>
    );
};

export default RecipeForm;
