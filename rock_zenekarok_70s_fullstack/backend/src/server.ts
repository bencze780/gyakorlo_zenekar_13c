import express, { Request, Response } from 'express';
import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'rock_zenekarok_70s',
  port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 1. Összes zenekar lekérése a stílus nevével együtt
app.get('/api/zenekar', async (_req: Request, res: Response) => {
  try {
    const query = `
      SELECT z.*, s.stilus_neve 
      FROM zenekarok z
      LEFT JOIN stilusok s ON z.stilus_id = s.id
      ORDER BY z.id ASC
    `;
    const [rows] = await pool.query<RowDataPacket[]>(query);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Adatbázis hiba történt', details: err });
  }
});

// 2. Stílusok lekérése a legördülő menühöz
app.get('/api/stilus', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, stilus_neve FROM stilusok ORDER BY id ASC');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Nem sikerült lekérni a stílusokat', details: err });
  }
});

// Kompatibilitás /stilusok útvonallal
app.get('/stilusok', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM stilusok');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. Új zenekar hozzáadása
app.post('/api/ujzenekar', async (req: Request, res: Response) => {
  const { nev, stilus_id, orszag, varos, aktiv_evek, tagok, legsikeresebb_album, kep_url } = req.body;

  if (!nev || !stilus_id || !orszag || !varos || !aktiv_evek || !tagok || !legsikeresebb_album || !kep_url) {
    return res.status(400).send('Hiányos adatok.');
  }

  try {
    const query = `
      INSERT INTO zenekarok 
      (nev, stilus_id, orszag, varos, aktiv_evek, tagok, legsikeresebb_album, kep_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query<ResultSetHeader>(query, [
      nev,
      stilus_id,
      orszag,
      varos,
      aktiv_evek,
      tagok,
      legsikeresebb_album,
      kep_url,
    ]);

    return res.status(201).json({ id: result.insertId });
  } catch (err) {
    return res.status(500).json({ error: 'Beszúrási hiba', details: err });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend szerver fut a http://localhost:${PORT} címen`);
});