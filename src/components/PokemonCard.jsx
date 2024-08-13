// components/PokemonCard.jsx
import React from 'react';

const PokemonCard = ({ card }) => {
  return (
    <div className="pokemon-card">
      <h3>{card.name}</h3>
      <img src={card.images.small} alt={card.name} />
      <p>Type: {card.types.join(', ')}</p>
    </div>
  );
};

export default PokemonCard;
