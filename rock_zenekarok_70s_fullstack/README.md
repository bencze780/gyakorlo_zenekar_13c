# Rockzenekarok 70s - Fullstack React + TypeScript + Node.js projekt

## Tartalom
- `backend/`: Node.js Express + TypeScript backend (REST API, MySQL kapcsolat)
- `frontend/`: React + Vite + TypeScript frontend (Bootstrap 5, reszponzív felület)
- `database/`: `rock_zenekarok_70s.sql` séma és mintaadatok

## Beüzemelés

### 1. Adatbázis importálása
Hozd létre az adatbázist és importáld a `database/rock_zenekarok_70s.sql` fájlt (pl. phpMyAdmin, MySQL Workbench vagy CLI segítségével):
```bash
mysql -u root -p < database/rock_zenekarok_70s.sql
```

### 2. Backend indítása
```bash
cd backend
npm install
npm run dev
```
A szerver a `http://localhost:3000` címen fog futni.

### 3. Frontend indítása
```bash
cd frontend
npm install
npm run dev
```
A frontend fejlesztői szerver a terminálban kiírt címen (alapértelmezetten `http://localhost:5173`) érhető el.