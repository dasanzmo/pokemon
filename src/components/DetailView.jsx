// src/components/DetailView.jsx

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel


const DetailView = () => {
  const selectedPokemonId = useSelector((state) => state.pokemon.selectedPokemon);
  const [pokemon, setPokemon] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [tcgCards, setTcgCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!selectedPokemonId) return;
      setLoading(true);
      setError(null);
      try {
        // Fetch Pokémon details
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonId}`);
        const pokemonData = pokemonResponse.data;
        setPokemon(pokemonData);

        // Fetch Pokémon species
        const speciesResponse = await axios.get(pokemonData.species.url);
        const speciesData = speciesResponse.data;
        const evolutionChainUrl = speciesData.evolution_chain.url;

        // Fetch evolution chain
        const chainResponse = await axios.get(evolutionChainUrl);
        const chainData = chainResponse.data;
        let highestEvol = chainData.chain;
        while (highestEvol.evolves_to.length > 0) {
          highestEvol = highestEvol.evolves_to[0];
        }
        setEvolution(highestEvol.species.name);

        // Fetch TCG cards
        const cardsResponse = await axios.get(`https://api.pokemontcg.io/v2/cards?q=evolvesFrom:${highestEvol.species.name}`);
        setTcgCards(cardsResponse.data.data);
      } catch (err) {
        setError('Error fetching details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [selectedPokemonId]);

  if (loading) {
    return <div className="message"><img src="../assets/gif-pokemon.gif" alt="Loading..." /></div>;
  }

  if (error) {
    return <div className="message">{error}</div>;
  }

  if (!pokemon) {
    return <div className="message">Select a Pokémon to see details</div>;
  }

  const groupedCards = [];
  for (let i = 0; i < tcgCards.length; i += 6) {
    groupedCards.push(tcgCards.slice(i, i + 6));
  }

  return (
    <div className="detail-view">
      <div class="info">
        <h2>{pokemon.name}</h2>
        <p><strong>Type:</strong> {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        <p><strong>Abilities:</strong> {pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
      </div>
      <div class="imagen">
        <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
      </div>


      {evolution && (
        <div className="evolution-info">
          <h3>Advanced Evolution: {evolution}</h3>
          
          <div className="tcg-cards">
            {tcgCards.length > 0 ? (
              <Carousel 
                showThumbs={false}
                showStatus={false}
                infiniteLoop={false}
                emulateTouch={true}
                showArrows={true}
                swipeable={true}
                dynamicHeight={false}
                selectedItem={0}
                centerMode={false}
                showIndicators={true}
              >
                {groupedCards.map((group, index) => (
                  <div key={index} className="tcg-card-group">
                    {group.map((card) => (
                      <div key={card.id} className="tcg-card">
                        <h4>{card.name}</h4>
                        <img src={card.images.large} alt={card.name} />
                        <p><strong>Type:</strong> {card.types.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </Carousel>
            ) : (
              <p>No TCG cards found for this evolution.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailView;
