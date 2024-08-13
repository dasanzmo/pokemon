// src/redux/pokemonSlice.js

import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    list: [],
    selectedPokemon: "bulbasaur",
  },
  reducers: {
    setPokemons: (state, action) => {
      state.list = action.payload;
    },
    selectPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
  },
});

export const { setPokemons, selectPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
