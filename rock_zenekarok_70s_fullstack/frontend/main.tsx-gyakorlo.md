# Gyakorlóanyag a `main.tsx` fájlhoz

## Cél

Ez a tananyag bemutatja, hogyan indul el a React-frontend a `main.tsx` fájlból. A fájl létrehozza a React gyökérelemet, betölti a Bootstrap alapstílusait, majd az `App` komponenst a HTML-dokumentum `root` elemébe rendereli.

## Tanulási célok

- Értsd meg a React belépési pontjának szerepét.
- Tudd, mi a DOM és a React root.
- Ismerd fel a `StrictMode` és a CSS-import feladatát.
- Kövesd végig, hogyan jelenik meg az `App`.

## Fontos szakkifejezések

| Szakkifejezés | Jelentés |
|---|---|
| **Belépési pont** (*entry point*) | Az a fájl, ahonnan az alkalmazás indul. |
| **DOM** (*Document Object Model*) | A böngésző által felépített objektummodell, amely a HTML-dokumentum elemeit reprezentálja. |
| **React root** | Az a DOM-elemhez kötött React-gyökér, amelybe a React-komponensek renderelődnek. |
| **Renderelés** | React-komponens megjelenítése a böngésző felületén. |
| **`StrictMode`** | React fejlesztői segédeszköz, amely bizonyos problémák felismerésére további ellenőrzéseket végez. |
| **CSS-import** | Stíluslap betöltése a JavaScript/TypeScript modulrendszeren keresztül. |
| **`!` non-null assertion** | TypeScript-jelölés: a fejlesztő biztosnak mondja, hogy az érték nem `null` és nem `undefined`. |

## A fájl teljes tartalma

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 1. Importálások

- `React` és `ReactDOM` biztosítja a React komponensek és a böngészős renderelés funkcióit.
- A Bootstrap CSS-importja globálisan betölti a Bootstrap alapstílusait az alkalmazáshoz.
- Az `App` importálása elérhetővé teszi a fő React-komponenst.

Az `App` komponensen belül egy másik CSS-fájl, az `App.css` is importálódik. A Bootstrap és az alkalmazás saját CSS-e eltérő forrásból származó stílusokat biztosít.

## 2. DOM-elem megkeresése

```tsx
document.getElementById('root')
```

A `document` a böngésző aktuális HTML-dokumentumát jelöli. A `getElementById('root')` megkeresi a dokumentumban azt az elemet, amelynek `id` attribútuma `root`.

Ezt a helyet általában a Vite projekt `index.html` fájlja tartalmazza:

```html
<div id="root"></div>
```

Ha a `root` elem hiányzik az oldal HTML-jéből, a React nem tudná, hová renderelje az alkalmazást.

## 3. React root és renderelés

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(...)
```

1. A `createRoot(...)` létrehozza a React gyökeret a megtalált HTML-elemhez.
2. A `.render(...)` megadja, melyik komponenst jelenítse meg ebben a gyökérben.
3. A kezdő komponens az `<App />`.

Az `!` jel a `getElementById` eredménye után TypeScript **non-null assertion**. A `getElementById` típusa szerint adhat `null` értéket is, de a `!` azt állítja a TypeScriptnek, hogy ebben a projektben a `root` biztosan létezik. Ez a jel önmagában nem hozza létre és futás közben nem ellenőrzi az elemet.

## 4. `React.StrictMode`

```tsx
<React.StrictMode>
  <App />
</React.StrictMode>
```

A `StrictMode` React fejlesztői ellenőrzéseket kapcsol be. Nem jelenít meg külön látható HTML-elemet a felületen. Bizonyos műveleteket — például effecteket — fejlesztői módban ismét lefuttathat azért, hogy segítsen a nem biztonságosan ismételhető logika felismerésében. Ezért előfordulhat, hogy egy adatlekérés fejlesztéskor egynél többször látszik a Network panelen. Ez nem azt jelenti, hogy a produkciós build feltétlenül ugyanígy működik.

## 5. Az alkalmazás indulásának sorrendje

1. A böngésző betölti a Vite által szolgáltatott HTML-t.
2. A frontend betölti és végrehajtja a `main.tsx` modult.
3. A modul megkeresi a `root` DOM-elemet.
4. Létrehozza a React rootot.
5. Az `App` komponens renderelődik.
6. Az `App` megjeleníti a navigációt és az aktuális nézetet.

## Gyakorlófeladatok

### 1. feladat – Belépési pont

Miért nevezzük a `main.tsx`-et a frontend egyik belépési pontjának?

### 2. feladat – A `root` elem

Milyen HTML-elemet keres a `document.getElementById('root')`? Mi történne, ha ez az elem hiányozna?

### 3. feladat – Renderelési cél

Melyik React-komponenst jeleníti meg a `main.tsx`, és melyik metódus végzi a megjelenítést?

### 4. feladat – Stílus

Melyik CSS-t tölti be közvetlenül a `main.tsx`? Hol töltődik be az alkalmazás saját CSS-e?

### 5. feladat – Non-null assertion

Mit állít a `!` a `getElementById('root')!` kifejezésben? Ellenőrzi-e futásidőben, hogy az elem létezik?

### 6. feladat – Strict Mode

Miért láthatunk fejlesztés közben ismétlődő effectet vagy hálózati kérést? Jelenti-e ez automatikusan azt, hogy az éles alkalmazás is pontosan kétszer kér adatot?

## Megoldások

1. Ez a fájl kapcsolja össze a böngésző DOM-ját a React-alkalmazással, és innen renderelődik a fő `App`.
2. Az `id="root"` attribútumú HTML-elemet. Ha hiányzik, a `createRoot` nem kap megfelelő DOM-elemet; a `!` ezt a hiányt nem javítja ki.
3. Az `App` komponenst; a megjelenítést a `createRoot` által létrehozott root `.render(...)` metódusa végzi.
4. Közvetlenül a Bootstrap CSS-t importálja. Az alkalmazás saját CSS-fájlja az `App.tsx`-ben importálódik.
5. Azt állítja a TypeScriptnek, hogy az érték nem `null`. Nem végez futásidejű ellenőrzést.
6. A `StrictMode` egyes műveleteket fejlesztői ellenőrzésként megismételhet. Ebből nem következik, hogy a produkciós alkalmazásban is ugyanígy ismétlődnek.

## Rövid összefoglaló

- A `main.tsx` indítja el a React-felületet.
- A React a `root` DOM-elemhez kapcsolódik.
- A React root `.render(...)` metódusa megjeleníti az `App`-et.
- A Bootstrap CSS globálisan betöltődik.
- A `StrictMode` fejlesztéskor segít lehetséges problémák feltárásában.
- A `!` TypeScript-jelzés, nem futásidejű ellenőrzés.
