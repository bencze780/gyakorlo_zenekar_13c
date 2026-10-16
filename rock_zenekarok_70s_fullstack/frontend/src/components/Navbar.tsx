import React from 'react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  return (
    <nav className="custom-navbar py-2 border-bottom border-dark">
      <div className="container d-flex justify-content-center gap-4">
        <button
          className={`custom-nav-link ${currentView === 'home' ? 'active-link' : ''}`}
          onClick={() => setCurrentView('home')}
        >
          Kezdőoldal
        </button>
        <button
          className={`custom-nav-link ${currentView === 'zenekarok' ? 'active-link' : ''}`}
          onClick={() => setCurrentView('zenekarok')}
        >
          A rock zene nagy csapatai
        </button>
        <button
          className={`custom-nav-link ${currentView === 'hozzaadas' ? 'active-link' : ''}`}
          onClick={() => setCurrentView('hozzaadas')}
        >
          Együttes feltöltése
        </button>
      </div>
    </nav>
  );
};