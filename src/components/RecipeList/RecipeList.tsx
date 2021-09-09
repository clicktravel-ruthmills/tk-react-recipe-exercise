import React from 'react';
import DataTable from 'react-data-table-component';
import { Recipe } from '../../data/types';

type Props = {
    value: Array<Recipe>,
};

const RecipeList = ({
    value,
}: Props) => {

    const columns: Array<any> = [
        {
            name: 'Title',
            selector: (row: any) => row.title,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row: any) => row.description,
        },
        {
            name: 'Ingredients',
            selector: (row: any) => row.ingredients,
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
