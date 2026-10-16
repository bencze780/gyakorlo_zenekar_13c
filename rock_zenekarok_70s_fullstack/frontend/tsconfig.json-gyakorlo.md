# Gyakorlóanyag a `tsconfig.json` fájlhoz

## Cél

Ez az anyag a frontend TypeScript-beállításait magyarázza el. A `tsconfig.json` határozza meg, hogyan ellenőrizze és értelmezze a TypeScript a `frontend/src` fájljait. A projekt `build` parancsa először lefuttatja a TypeScript-ellenőrzést, majd elkészíti a Vite buildet.

## Tanulási célok

- Értsd meg, mire szolgál a `tsconfig.json`.
- Tudd, mit jelentenek a projekt legfontosabb fordítási és ellenőrzési beállításai.
- Ismerd fel, miért van szükség DOM- és JSX-támogatásra.
- Tudd, hogy a TypeScript beállítása nem azonos a futó szerver konfigurációjával.

## Fontos szakkifejezések

| Szakkifejezés | Jelentés |
|---|---|
| **Konfigurációs fájl** | A program vagy fejlesztőeszköz működését leíró beállításfájl. |
| **`tsconfig.json`** | A TypeScript fordító és ellenőrző eszköz projektbeállításait tartalmazó JSON-fájl. |
| **Fordítás / transzpilálás** | A forráskód átalakítása a böngésző által futtatható formára; a TypeScript-típusok futáskor nem maradnak meg. |
| **Fordítási cél** (*target*) | Meghatározza, milyen JavaScript-verzióra fordítson a TypeScript. |
| **Modul** (*module*) | A kód fájlok közötti import/export szervezésének rendszere. |
| **Modulfeloldás** (*module resolution*) | Az importált modulok és fájlok megtalálásának szabályrendszere. |
| **DOM-típusok** | A böngésző objektumaihoz, például a `document` és az `HTMLInputElement` értékekhez tartozó típusleírások. |
| **JSX** | A React-elemek leírására használt HTML-szerű szintaxis. |
| **Szigorú típusellenőrzés** (*strict checking*) | A TypeScript szigorúbb ellenőrzéseinek csoportja, amely több lehetséges hibára figyelmeztet. |
| **`noEmit`** | Beállítás, amely megtiltja, hogy a TypeScript fájlokat írjon ki fordítási eredményként. |
| **Vite** | Frontend fejlesztői szerver és buildeszköz, amely gyorsan szolgálja ki, illetve csomagolja az alkalmazást. |
| **Könyvtár / library** | Előre elkészített kódgyűjtemény; a `lib` beállítás megadja, milyen beépített API-k típusait ismerje a TypeScript. |

## A projekt `tsconfig.json` fájlja

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

## A fő beállítások

### `target: "ES2020"`

A TypeScript kimeneti JavaScript-verzióját határozza meg. Az **ES2020** egy JavaScript-szabványkiadás. Mivel a projekt `noEmit` beállítású és Vite-ot használ, a végső böngészős csomagolást jellemzően a Vite végzi.

### `useDefineForClassFields: true`

A TypeScript-osztályok mezőinek JavaScriptben való értelmezését az újabb szabványos viselkedéshez igazítja. A frontend komponensei függvénykomponensek, de ez egy általános TypeScript-beállítás.

### `lib: ["ES2020", "DOM", "DOM.Iterable"]`

Megadja, hogy a TypeScript milyen beépített környezetek típusleírásait ismerje:

- `ES2020`: a megfelelő JavaScript-szabvány API-jai;
- `DOM`: böngészős objektumok, például `document`, `fetch` és HTML-elemek;
- `DOM.Iterable`: a DOM olyan objektumainak iterálható típusai, amelyeken például ciklus vagy iteráció használható.

### `module: "ESNext"` és `moduleResolution: "bundler"`

- A `module: "ESNext"` az ES modulok modern `import` és `export` rendszerét használja.
- A `moduleResolution: "bundler"` a csomagolókhoz, például a Vite-hoz illő importfeloldási szabályokat választja.

### `skipLibCheck: true`

Kihagyja a külső deklarációs fájlok teljes típusellenőrzését. Ez gyorsíthatja az ellenőrzést; nem jelenti azt, hogy a projekt saját TypeScript-fájljai ellenőrzés nélkül maradnak.

### `allowImportingTsExtensions: true`

Lehetővé teszi, hogy importokban TypeScript-fájl kiterjesztése szerepeljen. A projekt forráskódjában a relatív importok jellemzően kiterjesztés nélküliek.

### `resolveJsonModule: true`

Lehetővé teszi JSON-fájlok importálását modulként, a TypeScript megfelelő következtetéseivel.

### `isolatedModules: true`

Olyan ellenőrzéseket kapcsol be, amelyek segítenek biztosítani, hogy a fájlok külön-külön is átalakíthatók legyenek. Ez hasznos a Vite-hoz hasonló, TypeScriptet fájlonként transzpiláló eszközöknél.

### `noEmit: true`

A TypeScript ellenőrzi a kódot, de nem ír ki saját JavaScript-fájlokat. A projekt `build` parancsa `tsc && vite build` alakú: a `tsc` ellenőrzi a típusokat, a Vite pedig elkészíti a frontend buildet.

### `jsx: "react-jsx"`

Megadja, hogyan értelmezze a TypeScript a React JSX-szintaxisát. A React 17 utáni automatikus JSX-futásidejű módot használja.

### `strict: true`

Bekapcsolja a TypeScript szigorú típusellenőrzési módját. Ez több lehetséges hibát jelez fordítás/ellenőrzés közben, mielőtt az alkalmazás a böngészőben futna.

### Nem használt értékek és `switch`

- `noUnusedLocals: true`: hibának jelöli azokat a helyi változókat, amelyek deklarálva vannak, de nincsenek használva.
- `noUnusedParameters: true`: figyelmeztet a nem használt függvényparaméterekre.
- `noFallthroughCasesInSwitch: true`: jelzi, ha egy `switch` ág váratlanul átfolyik a következő ágba `break`, `return` vagy más lezárás nélkül.

### `include: ["src"]`

Azt jelzi, hogy a projekt melyik mappában található forrásfájljait vegye figyelembe a TypeScript. Ebben a frontend konfigurációban a `src` szerepel.

## Mit nem csinál ez a konfiguráció?

- Nem indítja el a Vite fejlesztői szervert.
- Nem állítja be az Express backend útvonalait.
- Nem ellenőrzi futás közben automatikusan a szervertől érkező JSON minden mezőjét.
- Nem telepíti a szükséges csomagokat.

A fejlesztői szerver indítását a `package.json` `dev` parancsa végzi; a TypeScript-beállítás a kód ellenőrzésének módját szabályozza.

## Gyakorlófeladatok

### 1. feladat – Fájl szerepe

Milyen kérdésekre ad választ a frontend `tsconfig.json`? Nevezz meg legalább kettőt.

### 2. feladat – Böngészős típusok

Melyik `lib` beállítás teszi elérhetővé a böngésző DOM-típusait? Mondj egy példát ilyen objektumra.

### 3. feladat – JSX

Melyik beállítás adja meg a React JSX értelmezési módját?

### 4. feladat – `noEmit`

Mit jelent a `noEmit: true`? Melyik eszköz készíti el a projekt frontend buildjét a `package.json` alapján?

### 5. feladat – Szigorú ellenőrzés

Milyen előnyt ad a `strict: true`? A típusellenőrzés garantálja-e, hogy a külső API hibás adatot soha nem küld?

### 6. feladat – Forrásmappa

Mit jelent az `include: ["src"]`?

### 7. feladat – Konfigurációs gondolkodás

Miért lehet hasznos a `noUnusedLocals` és a `noUnusedParameters` bekapcsolása egy tanulói projektben?

## Megoldások

1. Például meghatározza a JavaScript-célverziót, az importok feloldásának módját, a JSX-beállítást, az ellenőrzési szigorúságot és a feldolgozandó forráskönyvtárat.
2. A `DOM`; ilyen például a `document` vagy egy HTML `input` elem.
3. A `jsx: "react-jsx"`.
4. A TypeScript nem ír ki saját fordítási kimeneti fájlokat. A `package.json` buildparancsa a `vite build` lépést használja a frontend csomagolásához.
5. Több típushibára figyelmeztet fejlesztés közben. Nem; a TypeScript típusellenőrzése nem futásidejű API-validáció.
6. A `src` könyvtárban található fájlokat vonja be a projekt típusellenőrzésébe.
7. Segítenek kiszűrni a felesleges változókat és a szükségtelen függvényparamétereket, amelyek elírásra vagy félbehagyott fejlesztésre utalhatnak.

## Rövid összefoglaló

- A `tsconfig.json` a TypeScript projekt- és ellenőrzési szabályait írja le.
- A `DOM` könyvtár biztosítja a böngészőobjektumok típusait.
- A `jsx: "react-jsx"` a React JSX-hez kapcsolódik.
- A `strict` és a `noUnused...` beállítások hibák korai felismerését segítik.
- A `noEmit` mellett a TypeScript ellenőriz, a buildet a Vite készíti.
- Az `include` határozza meg, melyik forrásmappát vizsgálja a projekt.
