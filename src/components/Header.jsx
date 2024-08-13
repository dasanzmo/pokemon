import React from 'react';
import ThemeToggle from './ThemeToggle';
import pokemonLogo from '../assets/pokemon-logo.png'; // Asegúrate de tener el logo en esta ruta

const Header = () => {
  return (
    <header className="header">
      <img src={pokemonLogo} alt="Pokémon Logo" className="logo" />
      <ThemeToggle />
    </header>
  );
};

export default Header;
