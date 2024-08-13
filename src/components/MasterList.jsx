// src/components/MasterList.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectPokemon, setPokemons } from '../redux/pokemonSlice';

const MasterList = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemon.list);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100'); // Aumentar el límite para obtener más Pokémon
        dispatch(setPokemons(data.results.map((pokemon, index) => ({ ...pokemon, id: index + 1 }))));
      } catch (error) {
        console.error('Error fetching Pokémon list:', error);
      }
    };

    fetchPokemons();
  }, [dispatch]);

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, pokemons]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = (pokemonId) => {
    dispatch(selectPokemon(pokemonId));
  };

  return (
    <div className="master-list">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredPokemons.map((pokemon) => (
        <div key={pokemon.id} onClick={() => handleClick(pokemon.id)}>
          <h3>{pokemon.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default MasterList;
