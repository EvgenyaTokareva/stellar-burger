import { TIngredient } from '@utils-types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../actions';

export interface ingredientState {
  ingredients: TIngredient[];
  isLoading: boolean;
}

const initialState: ingredientState = {
  ingredients: [],
  isLoading: false
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload;
        }
      );
  }
});

export default ingredientsSlice.reducer;
