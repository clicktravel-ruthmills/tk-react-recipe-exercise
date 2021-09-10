import React from 'react';
import DataTable from 'react-data-table-component';
import { Recipe, Ingredient } from '../../data/types';
import Button from '../Button/Button';

type Props = {
    value: Array<Recipe>,
    editRecipe: (id: number) => Promise<void>,
    deleteRecipe: (id: number) => Promise<void>,
};

const RecipeList = ({
    value,
    editRecipe,
    deleteRecipe,
}: Props) => {

    const columns: Array<any> = [
        {
            name: 'Title',
            selector: (row: any) => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row: any) => row.description,
        },
        {
            name: 'Ingredients',
            selector: (row: any) => row.ingredients.map((r: Ingredient) => r.name).join(', '),
        },
        {
            selector: (row: any) => (
                <Button onClick={() => editRecipe(row.id)}>Edit</Button>
            ),
        },
        {
            selector: (row: any) => (
                <Button onClick={() => deleteRecipe(row.id)}>Delete</Button>
            ),
        }
    ];

    return (
        <DataTable
            columns={columns}
            data={value}
        />
    )
};

export default RecipeList;
