import React, { useEffect } from 'react';
import MasterList from './components/MasterList';
import DetailView from './components/DetailView';
import Header from './components/Header';
import { useSelector } from 'react-redux';

const App = () => {
  const theme = useSelector((state) => state.theme.currentTheme);

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
  }, [theme]);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <MasterList />
        <DetailView />
      </main>
    </div>
  );
};

export default App;
