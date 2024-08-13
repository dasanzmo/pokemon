// api/pokemonTcgApi.js
import axios from 'axios';

export const getPokemonCards = async (pokemonName) => {
  const response = await axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${pokemonName}`);
  return response.data;
};
