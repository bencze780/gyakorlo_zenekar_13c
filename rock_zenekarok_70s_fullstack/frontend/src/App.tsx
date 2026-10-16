import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { BandsList } from './components/BandsList';
import { AddBand } from './components/AddBand';
import './App.css';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');

  return (
    <div className="app-wrapper">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      <main>
        {currentView === 'home' && <Home onNavigate={(view) => setCurrentView(view)} />}
        {currentView === 'zenekarok' && <BandsList />}
        {currentView === 'hozzaadas' && (
          <AddBand onSuccess={() => setCurrentView('zenekarok')} />
        )}
      </main>
    </div>
  );
};

export default App;