import React, { useEffect, useState } from 'react';
import { Band } from '../types';

export const BandsList: React.FC = () => {
  const [bands, setBands] = useState<Band[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/zenekar')
      .then((res) => {
        if (!res.ok) throw new Error('Hiba a zenekarok letöltésekor');
        return res.json();
      })
      .then((data: Band[]) => {
        setBands(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleShowActiveYears = (band: Band) => {
    const raw = band.aktiv_evek.trim();
    const parts = raw.split(/[-–]/).map((p) => p.trim());
    
    if (parts.length >= 2) {
      const startYear = parseInt(parts[0], 10);
      let endYear: number;

      if (parts[1].toLowerCase().includes('napjainkig')) {
        endYear = 2025;
      } else {
        endYear = parseInt(parts[1], 10);
      }

      if (!isNaN(startYear) && !isNaN(endYear)) {
        const diff = endYear - startYear;
        alert(`A ${band.nev} ${diff} évig játszott együtt`);
        return;
      }
    }
    alert(`Nem határozható meg az időtartam a megadott évekből: ${band.aktiv_evek}`);
  };

  if (loading) return <div className="text-center py-5">Zenekarok betöltése...</div>;
  if (error) return <div className="text-center text-danger py-5">Hiba: {error}</div>;

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">A Rock and Roll nagyjai</h2>

      <div className="row g-4">
        {bands.map((b) => (
          <div key={b.id} className="col-12 col-md-6">
            <div className="band-card h-100 d-flex flex-column">
              <div className="band-card-header">
                <span>{b.nev}</span>
                <span>{b.stilus_neve || 'Rock'}</span>
              </div>
              <div className="p-3 flex-grow-1" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                <p className="mb-1"><strong>Származási helye:</strong> {b.orszag}, {b.varos}</p>
                <p className="mb-1"><strong>Aktív évek:</strong> {b.aktiv_evek}</p>
                <p className="mb-1"><strong>Tagok:</strong> {b.tagok}</p>
                <p className="mb-2"><strong>Legsikeresebb album:</strong> {b.legsikeresebb_album}</p>
              </div>

              <div>
                <img src={b.kep_url} alt={b.nev} className="band-image" />
              </div>

              <div className="text-center p-3">
                <button
                  className="btn btn-light border px-3 py-1 btn-sm"
                  onClick={() => handleShowActiveYears(b)}
                >
                  Aktív évek száma
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};