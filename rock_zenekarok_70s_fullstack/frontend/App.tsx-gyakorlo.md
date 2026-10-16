# Gyakorlóanyag az `App.tsx` fájlhoz

## Cél

Ez az anyag a React-alkalmazás fő komponensét, az `App.tsx` fájlt magyarázza el. Az `App` a frontend központi összekötő eleme: eltárolja az aktuális nézetet, átadja a navigációs adatokat a gyermekkomponenseknek, és feltételesen megjeleníti a kezdőlapot, a zenekarlistát vagy az új zenekar űrlapját.

## Tanulási célok

- Értsd meg a szülő- és gyermekkomponensek kapcsolatát.
- Tudd követni a `currentView` állapot változását.
- Ismerd fel a JSX feltételes megjelenítését.
- Tudd elmagyarázni, mit csinál az `onSuccess` callback.

## Fontos szakkifejezések

| Szakkifejezés | Jelentés |
|---|---|
| **Fő komponens** | A felület olyan központi komponense, amely további komponenseket fog össze. |
| **Gyermekkomponens** | Egy másik komponensen belül megjelenített komponens. |
| **State / állapot** | A komponenshez tartozó változó adat, amely módosításkor újrarenderelést okozhat. |
| **Prop** | A szülőtől a gyermekkomponensnek átadott érték vagy függvény. |
| **Hook** | React-függvény, például a `useState`, amellyel függvénykomponensben React-állapotot használunk. |
| **JSX** | HTML-szerű szintaxis, amelyben leírjuk a React felületét. |
| **Feltételes renderelés** | Tartalom megjelenítése csak akkor, ha egy feltétel teljesül. |
| **Callback** | Egy másik függvénynek átadott függvény, amelyet később az adott függvény hív meg. |
| **Újrarenderelés** | A React ismét kiszámítja és frissíti a felületet az új state vagy prop alapján. |
| **CSS-import** | CSS-fájl betöltése JavaScript/TypeScript modulból, hogy stílusai elérhetők legyenek az alkalmazásban. |

## A fájl áttekintése

```tsx
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
```

## 1. Importálások

- A `useState` a React állapotkezelő hookja.
- A `Navbar`, `Home`, `BandsList` és `AddBand` a külön fájlokban megírt gyermekkomponensek.
- Az `App.css` a fő alkalmazás elrendezésének stílusait adja.

A komponensek külön fájlban tartása segíti az áttekinthetőséget: az `App` a nézetek közti kapcsolatért felel, míg a gyermekkomponensek a saját feladatukat végzik.

## 2. `App` komponens és állapota

```tsx
export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
```

- Az `App` egy függvénykomponens.
- A `React.FC` jelzi, hogy a változó React-függvénykomponenst tartalmaz.
- A `useState<string>('home')` szöveges állapotot hoz létre, kezdeti értéke `home`.
- A `currentView` az aktuális érték; a `setCurrentView` módosítja.

Az első megjelenéskor a kezdőoldal aktív. Ha meghívjuk a `setCurrentView('zenekarok')` függvényt, a React újrarendereli az `App`-et az új állapottal.

**Megjegyzés:** a `string` bármilyen szöveget megenged, tehát például egy elgépelés is lefordulhat, még ha nincs hozzá megjelenítendő nézet. Egy továbbfejlesztett változatban a nézetek szűkebb típusával lehetne védeni ezt.

## 3. Navigáció propokkal

```tsx
<Navbar currentView={currentView} setCurrentView={setCurrentView} />
```

Az `App` két **propot** ad át a navigációs sávnak:

- az aktuális nézet nevét, hogy a `Navbar` meg tudja jelölni az aktív menüpontot;
- az állapotmódosító függvényt, hogy kattintáskor a gyermek jelezhesse a nézetváltási szándékot.

Ez egy gyakori React-minta: az állapot a közös szülőben marad, és a szülő adja tovább az értéket meg a módosítást lehetővé tevő függvényt.

## 4. Feltételes nézetmegjelenítés

```tsx
{currentView === 'home' && <Home onNavigate={(view) => setCurrentView(view)} />}
{currentView === 'zenekarok' && <BandsList />}
{currentView === 'hozzaadas' && (
  <AddBand onSuccess={() => setCurrentView('zenekarok')} />
)}
```

A `feltétel && JSX` alak csak akkor jeleníti meg a JSX-et, ha a feltétel igaz.

- `home`: megjelenik a `Home`; a `Home` egy `onNavigate` függvényt kap.
- `zenekarok`: megjelenik a `BandsList`.
- `hozzaadas`: megjelenik az `AddBand`; sikeres mentéskor az `onSuccess` a zenekarlistára vált.

A `Home` callbackje általános nézetértéket fogad. Az `AddBand` callbackje viszont közvetlenül a `zenekarok` nézetre vált. A `main` HTML-elem itt a fő tartalmi részt jelöli.

## 5. Alapértelmezett és név szerinti export

```tsx
export const App = ...
export default App;
```

A fájl név szerint is exportálja az `App` komponenst, és **default exportot** is megad. A jelenlegi `main.tsx` a default exportot importálja (`import App from './App'`).

## 6. Adatfolyam-példa: kezdőoldaltól a listáig

1. Az `App` kezdetben `currentView = 'home'` értékkel jelenik meg.
2. Az `App` átadja a `Home`-nak az `onNavigate` függvényt.
3. A felhasználó a zenekarok gombjára kattint.
4. A `Home` meghívja az `onNavigate('zenekarok')` callbacket.
5. A callback meghívja a `setCurrentView('zenekarok')` állapotmódosítót.
6. Az `App` újrarenderelődik, és megjelenik a `BandsList`.

## Gyakorlófeladatok

### 1. feladat – Kezdeti állapot

Melyik nézet jelenik meg először, és melyik kódrészlet dönti ezt el?

### 2. feladat – Propok

Milyen két értéket kap a `Navbar` az `App`-től? Miért van szüksége mindkettőre?

### 3. feladat – Navigációs folyamat

Írd le 3–5 mondatban, mi történik a `Home` „Együttesek adatai” gombjára kattintáskor.

### 4. feladat – Feltételes JSX

Mit jelent ez a kifejezés?

```tsx
{currentView === 'zenekarok' && <BandsList />}
```

### 5. feladat – Sikeres mentés

Melyik nézet jelenik meg az `AddBand` sikeres mentése után? Melyik callback és állapotváltozó vesz részt benne?

### 6. feladat – Típusbiztonsági gondolat

Miért lehet veszélyes, hogy a `currentView` típusa általános `string`? Milyen lehetséges értékekre szűkítenéd?

## Megoldások

1. A kezdőoldal jelenik meg. A `useState<string>('home')` beállítja a kezdeti nézetet.
2. A `currentView` és a `setCurrentView`. Az első jelzi az aktív menüpontot, a második lehetővé teszi a nézetváltást.
3. A gomb eseménykezelője meghívja az `onNavigate('zenekarok')` callbacket. Ez a függvény az `App` által átadott `setCurrentView`-t hívja meg. A `currentView` `zenekarok` lesz, az `App` újrarenderelődik, és feltételesen megjeleníti a `BandsList` komponenst.
4. Ha az aktuális nézet `zenekarok`, a `BandsList` komponens megjelenik; más értéknél ez a JSX-rész nem jelenik meg.
5. A `zenekarok` nézet. Az `AddBand` meghívja az `onSuccess` callbacket, amely a `setCurrentView('zenekarok')` függvényt használja.
6. Egy elgépelés, például `zenekarok` helyett `zenekar`, továbbra is érvényes szöveg, de egyik feltételes nézet sem illeszkedik rá. Szűkített típus lehet például `'home' | 'zenekarok' | 'hozzaadas'`.

## Rövid összefoglaló

- Az `App` a frontend fő komponense, és itt található a nézetválasztó state.
- A gyermekkomponensek propként kapják az aktuális értékeket és az eseményekre meghívható függvényeket.
- Az `&&` szintaxis feltételesen jelenít meg JSX-et.
- A state módosítása újrarenderelést vált ki.
- A különálló komponensek feladat szerint választják szét a navigációt, a listát és az űrlapot.
