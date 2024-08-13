import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    theme: themeReducer,
  },
});
