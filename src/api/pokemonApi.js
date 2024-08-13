// api/pokemonApi.js
import axios from 'axios';

export const getPokemonDetails = async (pokemonName) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  return response.data;
};

export const getEvolutionChain = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
