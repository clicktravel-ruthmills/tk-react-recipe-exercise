import { act, render, fireEvent, screen } from '@testing-library/react';
import { recipeWithNoId as recipeWithNoIdFabricator } from '../../data/fabricators';
import RecipeForm from './RecipeForm';


describe('<RecipeForm />', () => {

    const mockOnSubmit = jest.fn();

    const fillOutFields = () => {
        const component = render(<RecipeForm onSubmit={mockOnSubmit} />);
        const nameField = screen.getByTestId('recipe-name');
        const descriptionField = screen.getByTestId('recipe-description');
        const ingredientsField = screen.getByTestId('recipe-ingredients');
        fireEvent.change(nameField, {target: {value: 'Doner Kebab'}});
        fireEvent.change(
            descriptionField, {target: {
                value: 'Phone up Yummy Plaza and order it',
            }});
        fireEvent.change(
            ingredientsField, {target: {
                value: 'mystery meat, naan bread, salad, mayonnaise',
            }});
        return component
    };

    it('leaves the fields blank if no recipe is passed in via props', () => {
        render(<RecipeForm onSubmit={mockOnSubmit} />);
        expect(screen.getByTestId('recipe-name')).toHaveValue('');
        expect(screen.getByTestId('recipe-description')).toHaveValue('');
        expect(screen.getByTestId('recipe-ingredients')).toHaveValue('');
    });

    it('displays error message if "name", "description" and "ingredients" fields are blank', () => {
        render(<RecipeForm onSubmit={mockOnSubmit} />);
        expect(screen.getByTestId('recipe-name')).toHaveValue('');
        expect(screen.getByTestId('recipe-description')).toHaveValue('');
        expect(screen.getByTestId('recipe-ingredients')).toHaveValue('');
        fireEvent.click(screen.getByText('Save Recipe'));
        expect(mockOnSubmit).toHaveBeenCalledTimes(0);
        expect(screen.getByTestId('error-message')).not.toBeNull();
    });

    it('populates the fields with recipe passed in via props', async () => {
        const recipe = recipeWithNoIdFabricator();
        render(<RecipeForm
            onSubmit={mockOnSubmit}
            value={recipe}
        />);
        expect(screen.getByTestId('recipe-name')).toHaveValue(recipe.name);
        expect(screen.getByTestId('recipe-description')).toHaveValue(recipe.description);
        expect(screen.getByTestId('recipe-ingredients')).toHaveValue(recipe.ingredients.map(
            ingredient => ingredient.name,
        ).join(', '));
    });

    it('fires callback on submit', async () => {
        fillOutFields();
        fireEvent.click(screen.getByText('Save Recipe'));
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
            name: 'Doner Kebab',
            description: 'Phone up Yummy Plaza and order it',
            ingredients: [
                { name: 'mystery meat' },
                { name: 'naan bread' },
                { name: 'salad' },
                { name: 'mayonnaise'},
            ],
        });
    });

    it('allows the user to change ingredients', () => {
        fillOutFields();
        const ingredientsField = screen.getByTestId('recipe-ingredients');
        fireEvent.change(
            ingredientsField, {target: {
                value: 'chicken doner meat, pitta bread, stupidly hot chilli sauce',
            }});
        fireEvent.click(screen.getByText('Save Recipe'));
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
            name: 'Doner Kebab',
            description: 'Phone up Yummy Plaza and order it',
            ingredients: [
                { name: 'chicken doner meat' },
                { name: 'pitta bread' },
                { name: 'stupidly hot chilli sauce' },
            ],
        });
    });
});
