# Gyakorlóanyag a `types.ts` fájlhoz

## Cél

Ez a tananyag a frontend közös TypeScript-típusait, a `Band` és a `Style` interfészeket mutatja be. Ezek leírják, milyen mezőket vár a felület a zenekarok és a zenei stílusok adatainál.

## Tanulási célok

- Értsd meg, mire való a TypeScript-interfész.
- Tudd, mit jelentenek a típusjelölések, például `number` és `string`.
- Ismerd fel az opcionális tulajdonságot jelző `?` jelet.
- Értsd meg, hogyan használják az interfészeket a React-komponensek.

## Fontos szakkifejezések

| Szakkifejezés | Jelentés |
|---|---|
| **TypeScript** | A JavaScript olyan kiterjesztése, amely típusok segítségével fejlesztés közben ellenőrizhetőbbé teszi a kódot. |
| **Típus** | Leírja, hogy egy érték milyen fajta lehet, például `string`, `number` vagy egy objektum. |
| **Interfész** (*interface*) | Egy objektum alakját, azaz tulajdonságait és azok típusait leíró TypeScript-szerkezet. |
| **Tulajdonság** (*property*) | Egy objektumban névvel és értékkel rendelkező mező. |
| **Opcionális tulajdonság** | Olyan mező, amely hiányozhat. A nevéhez írt `?` jelzi. |
| **Tömbtípus** | Több azonos típusú értékből álló tömb jelölése, például `Band[]`. |
| **Típusellenőrzés** | A TypeScript által végzett fejlesztéskori ellenőrzés, amely hibás típusú értékekre figyelmeztet. |
| **Futásidő** (*runtime*) | Az az időszak, amikor a lefordított JavaScript ténylegesen fut a böngészőben vagy a szerveren. |
| **API-adat** | A frontend és backend között elküldött adat, gyakran JSON-formátumban. |

## A fájl tartalma

```ts
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
```

## 1. Mi az interfész?

Az `interface` leírja egy objektum várt alakját. A `Band` például megadja, hogy egy zenekar-adatnak milyen mezőket és típusokat kell tartalmaznia.

```ts
const band: Band = {
  id: 1,
  nev: 'Queen',
  stilus_id: 1,
  stilus_neve: 'Rock',
  orszag: 'Egyesült Királyság',
  varos: 'London',
  aktiv_evek: '1970–1991',
  tagok: 'Freddie Mercury, Brian May',
  legsikeresebb_album: 'A Night at the Opera',
  kep_url: 'https://pelda.hu/queen.jpg',
};
```

Ha egy `Band` típusú objektumból kötelező mező hiányzik vagy nem megfelelő a típusa, a TypeScript fejlesztéskor jelezheti a hibát.

## 2. Kötelező és opcionális mezők

A `?` nélküli mezők kötelezőek a `Band` típusú objektumban. A `stilus_neve?: string` viszont opcionális: lehet szöveg, de el is maradhat.

Ennek oka, hogy a backend zenekar-lekérdezése `LEFT JOIN`-t használ. Ha egy zenekarhoz nincs illeszkedő stílussor, a `stilus_neve` nem biztos, hogy kap értéket. A frontend a lista komponensben tartalék szöveggel kezeli a hiányt:

```tsx
{b.stilus_neve || 'Rock'}
```

A TypeScript opcionális mezője lehetséges hiányt jelez. A tényleges API-válasz helyességét ettől függetlenül futásidőben kell ellenőrizni, ha nem megbízható forrásból érkezik.

## 3. A mezők típusai

- `id: number` és `stilus_id: number`: számszerű azonosítók.
- A többi zenekarmegjelenítési adat `string`, azaz szöveg.
- A `Style` két kötelező mezőt tartalmaz: azonosítót és stílusnevet.

A `Style[]` egy `Style` objektumokból álló tömb. Például:

```ts
const styles: Style[] = [
  { id: 1, stilus_neve: 'Rock' },
  { id: 2, stilus_neve: 'Hard rock' },
];
```

## 4. Interfészek használata a komponensekben

A `BandsList.tsx` importálja a `Band` interfészt, és a zenekarlista állapotát `Band[]` típussal jelöli:

```ts
const [bands, setBands] = useState<Band[]>([]);
```

Az `AddBand.tsx` a `Style` típust használja a választható stílusok listájához:

```ts
const [styles, setStyles] = useState<Style[]>([]);
```

Így a komponensek ugyanazt a közös adatleírást használják, nem kell minden fájlban újra leírni a mezőket.

## 5. Fontos különbség: típusellenőrzés és adatvalidáció

A TypeScript interfész nem ellenőrzi automatikusan a szervertől érkező JSON-t futás közben. A következő annotáció:

```ts
.then((data: Band[]) => {
  setBands(data);
})
```

azt mondja a TypeScriptnek, hogy a programozó `Band[]` típusúnak tekinti a `data` értéket. Ez az annotáció önmagában nem vizsgálja meg a hálózaton érkezett adatot. Ha az API hibás vagy váratlan formátumú választ küld, a futó programban külön validációra lenne szükség.

## Gyakorlófeladatok

### 1. feladat – Típusok felismerése

Milyen típusúak az alábbi mezők?

1. `id`
2. `stilus_id`
3. `nev`
4. `kep_url`
5. `stilus_neve` a `Band` interfészben

### 2. feladat – Kötelező vagy opcionális?

Melyik mező opcionális a `Band` interfészben? Melyik karakter jelzi ezt?

### 3. feladat – Hiányzó mező keresése

Az alábbi objektum megfelel-e a `Style` interfésznek? Mi hiányzik, ha nem?

```ts
const style: Style = { id: 3 };
```

### 4. feladat – Tömbtípus

Mit jelent a `Band[]`? Adj meg egy példát, amely két `Band` típusnak megfelelő rekordot tartalmaz.

### 5. feladat – Típus és futásidő

Igaz vagy hamis: ha a `fetch` válaszát `Band[]` típussal annotáljuk, a böngésző automatikusan ellenőrzi az összes mezőt.

### 6. feladat – További mező tervezése

Tegyük fel, hogy a zenekarokról rövid leírást is szeretnél megjeleníteni. Milyen mezőt vennél fel a `Band` interfészbe, és milyen típusú lenne? Kötelezőnek vagy opcionálisnak állítanád be? Indokold meg.

## Megoldások

1. `id`: `number`; `stilus_id`: `number`; `nev`: `string`; `kep_url`: `string`; `stilus_neve`: opcionális `string`.
2. A `stilus_neve` opcionális. A mezőnév utáni `?` jel mutatja.
3. Nem. Hiányzik a kötelező `stilus_neve: string` mező.
4. `Band` elemekből álló tömböt. Bármely két, a `Band` interfész kötelező mezőit tartalmazó objektum lehet jó példa. A `stilus_neve` mező hiányozhat, mert opcionális.
5. Hamis. A típusannotáció fejlesztéskori információ, nem futásidejű JSON-validáció.
6. Például `leiras: string`. Opcionálisra (`leiras?: string`) állítható, ha a régi adatbázissorokban nincs leírás; kötelezőre akkor, ha minden rekord esetén biztosan rendelkezésre áll.

## Rövid összefoglaló

- Az interfész leírja az objektum tulajdonságait és azok típusait.
- A `Band` a zenekart, a `Style` a zenei stílust reprezentálja.
- A `?` opcionális mezőt jelent.
- A `Band[]` zenekarok tömbje.
- A TypeScript típusannotáció nem garantálja a hálózatról érkező adat futásidejű helyességét.
