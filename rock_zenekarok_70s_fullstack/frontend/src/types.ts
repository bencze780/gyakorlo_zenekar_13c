export interface Band {
  id: number;
  nev: string;
  stilus_id: number;
  stilus_neve?: string;
  orszag: string;
  varos: string;
  aktiv_evek: string;
  tagok: string;
  legsikeresebb_album: string;
  kep_url: string;
}

export interface Style {
  id: number;
  stilus_neve: string;
}