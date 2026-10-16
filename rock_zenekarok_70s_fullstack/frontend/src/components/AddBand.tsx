import React, { useEffect, useState } from 'react';
import { Style } from '../types';

interface AddBandProps {
  onSuccess: () => void;
}

export const AddBand: React.FC<AddBandProps> = ({ onSuccess }) => {
  const [styles, setStyles] = useState<Style[]>([]);
  const [formData, setFormData] = useState({
    nev: '',
    stilus_id: '',
    orszag: '',
    varos: '',
    aktiv_evek: '',
    tagok: '',
    legsikeresebb_album: '',
    kep_url: '',
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/stilus')
      .then((res) => res.json())
      .then((data: Style[]) => {
        setStyles(data);
        if (data.length > 0) {
          setFormData((prev) => ({ ...prev, stilus_id: data[0].id.toString() }));
        }
      })
      .catch(() => setErrorMsg('Nem sikerült betölteni a stílusokat!'));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      const response = await fetch('http://localhost:3000/api/ujzenekar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          stilus_id: Number(formData.stilus_id),
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Hiba történt a mentéskor');
      }

      onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="container py-4">
      <div className="form-container">
        <h3 className="text-center mb-4">Egy új együttes rögzítése</h3>

        {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Az együttes neve:</label>
            <input
              type="text"
              name="nev"
              className="form-control form-control-sm"
              value={formData.nev}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">A zenekar stílusa:</label>
            <select
              name="stilus_id"
              className="form-select form-select-sm"
              value={formData.stilus_id}
              onChange={handleChange}
              required
            >
              {styles.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.stilus_neve}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Az együttes országa:</label>
            <input
              type="text"
              name="orszag"
              className="form-control form-control-sm"
              value={formData.orszag}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Az együttes városa:</label>
            <input
              type="text"
              name="varos"
              className="form-control form-control-sm"
              value={formData.varos}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Aktív évek:</label>
            <input
              type="text"
              name="aktiv_evek"
              placeholder="pl. 1965-napjainkig vagy 1970-1991"
              className="form-control form-control-sm"
              value={formData.aktiv_evek}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Tagok:</label>
            <input
              type="text"
              name="tagok"
              className="form-control form-control-sm"
              value={formData.tagok}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Legsikeresebb album:</label>
            <input
              type="text"
              name="legsikeresebb_album"
              className="form-control form-control-sm"
              value={formData.legsikeresebb_album}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Az együttesről készült fénykép linkje:</label>
            <input
              type="url"
              name="kep_url"
              className="form-control form-control-sm"
              value={formData.kep_url}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="btn btn-secondary px-4">
              Feltöltés
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};