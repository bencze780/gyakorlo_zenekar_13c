import React from 'react';

interface HomeProps {
  onNavigate: (view: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-5 mb-4 fw-normal">A rock zene nagy csapatai</h1>
      
      <div className="hero-box my-4 p-2 shadow">
        <img
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80"
          alt="Rock and Roll"
          className="hero-img rounded"
        />
      </div>

      <div className="d-flex justify-content-center gap-4 mt-4 flex-wrap">
        <button
          className="btn btn-secondary px-4 py-2"
          onClick={() => onNavigate('zenekarok')}
        >
          Együttesek adatai
        </button>
        <button
          className="btn btn-secondary px-4 py-2"
          onClick={() => onNavigate('hozzaadas')}
        >
          Együttesek adatainak feltöltése
        </button>
      </div>
    </div>
  );
};