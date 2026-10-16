# Önálló tanulási és gyakorlóanyag a `server.ts` fájlhoz

**Célcsoport:** 13. évfolyamos, webfejlesztést tanuló diákok

**Téma:** Node.js, Express, REST API és MySQL

**Javasolt idő:** 60–90 perc

## Cél és felhasználás

Ez az anyag a `src/server.ts` működését magyarázza el lépésről lépésre. Akkor használd, ha önállóan szeretnéd megérteni, hogyan kapcsolódik össze egy **Node.js**-es szerver, egy **REST API** és egy **MySQL-adatbázis**. A példák a projekt 70-es évekbeli rockzenekarokat nyilvántartó alkalmazásából származnak.

### Amire szükséged lesz

- alapvető jártasság a JavaScriptben: változók, függvények, objektumok és tömbök;
- a HTTP-kérések és az SQL alapfogalmainak ismerete előny, de az anyag a fontosabb kifejezéseket is elmagyarázza;
- a projekt `backend/src/server.ts` fájlja, amelyet érdemes a tananyag mellett megnyitni.

### Önálló tanulási javaslat

1. Haladj sorrendben, és a kódrészleteket keresd meg a `server.ts` fájlban.
2. Minden új fogalomnál próbáld meg előbb saját szavaiddal megfogalmazni, mit csinál.
3. A gyakorlófeladatokat a megoldások megtekintése előtt oldd meg.
4. Jelöld meg azokat a részeket, amelyeket még nem tudsz elmagyarázni; a végén térj vissza ezekhez.
5. Ellenőrizd a válaszaidat a megoldókulccsal, és javítsd ki a jegyzeteidet.

## Tanulási célok

A tananyag végére képes leszel:

- elmagyarázni, mi a backend és mire való egy API;
- felismerni az **Express middleware**-eket és az **útvonalakat**;
- megérteni az **asynchronous** műveletek, az `async` és az `await` szerepét;
- leírni, hogyan kérdez le és módosít adatokat a szerver a MySQL-ben;
- értelmezni a `GET` és `POST` kéréseket, valamint a HTTP-válaszkódokat;
- felismerni, miért hasznosak az SQL-lekérdezésekben a paraméterhelyettesítők.

## Fontos szakkifejezések

| Szakkifejezés | Jelentés |
|---|---|
| **Backend** | A webalkalmazás szerveroldala. Fogadja a kéréseket, feldolgozza őket, és kapcsolatot tart például az adatbázissal. |
| **Szerver** | Olyan program, amely hálózaton érkező kérésekre válaszol. Ebben a projektben a szerver a 3000-es porton figyel. |
| **API** (*Application Programming Interface*) | Meghatározott szabályok és végpontok összessége, amelyen keresztül más programok adatot kérhetnek vagy küldhetnek. |
| **REST API** | HTTP-kéréseket és URL-útvonalakat használó API-stílus. A `GET` általában lekérdez, a `POST` pedig új adatot küld be. |
| **HTTP** | A böngésző, a frontend és a szerver közötti kommunikáció egyik szabályrendszere. |
| **Végpont / útvonal** (*endpoint / route*) | Egy HTTP-metódusból és útvonalból álló cím, amelyhez a szerver működést rendel, például `GET /api/zenekar`. |
| **Middleware** | Az Expressben a kérés és a végpont kezelése között lefutó köztes függvény. Például a JSON-feldolgozó middleware a kérés törzsét JavaScript-adattá alakítja. |
| **Kérés törzse** (*request body*) | A kliens által küldött adat, például egy új zenekar mezői egy `POST` kérésben. |
| **JSON** | Szöveges adatcsere-formátum, amely objektumokat és tömböket tud leírni. Gyakori API-kérések és -válaszok formátuma. |
| **Adatbázis-kapcsolat / connection pool** | A szerver és az adatbázis közötti kapcsolat. A **kapcsolatpool** több kapcsolat kezelését teszi lehetővé, és újra felhasználhatja őket. |
| **SQL** | Relációs adatbázisok lekérdezésére és módosítására szolgáló nyelv. |
| **Tábla** | Az adatbázis sorokba és oszlopokba rendezett adatszerkezete. Itt például `zenekarok` és `stilusok`. |
| **Elsődleges kulcs** (*primary key*) | Egy tábla sorát egyedileg azonosító mező, például az `id`. |
| **Idegen kulcs** (*foreign key*) | Egy másik tábla sorára hivatkozó mező. A `zenekarok.stilus_id` a `stilusok.id` mezőhöz kapcsolódik. |
| **JOIN** | SQL-művelet, amellyel összekapcsolható két tábla kapcsolódó adatok alapján. |
| **Paraméterhelyettesítő** (*placeholder*) | Az SQL-lekérdezés `?` jele, amelynek értékét a program külön adja át. Megfelelő használatával elkerülhető, hogy a felhasználói adat SQL-kódként értelmeződjön. |
| **Típus** | Meghatározza, milyen fajta értéket jelöl egy változó vagy adat, például szöveget, számot vagy adatbázis-sort. |
| **HTTP-válaszkód** | A szerver válaszának rövid, számmal jelzett eredménye. Például a `200` sikeres lekérdezést, a `404` nem található erőforrást, az `500` szerveroldali hibát jelez. |
| **Aszinkron művelet** (*asynchronous operation*) | Olyan művelet, amelynek eredményére várni kell, de a program ezt úgy kezeli, hogy ne kelljen szinkron módon megállítania a teljes működést. Adatbázis-lekérdezések gyakran ilyenek. |
| **Validáció** | A kapott adatok ellenőrzése, mielőtt a szerver feldolgozná vagy elmentené őket. |
| **CORS** | Böngészőbiztonsági szabályrendszer; a szerver beállításával szabályozható, hogy eltérő eredetű weboldalak kérhetik-e az API-t. |

## A projekt és a fájl szerepe

A projekt felépítésében a `frontend/` tartalmazza a felhasználói felületet, a `backend/` pedig a szerveroldali API-t. A frontend HTTP-kéréseket küld a backendnek, a backend pedig a MySQL-adatbázisból olvas vagy oda ír.

A `server.ts` feladatai:

1. betölti a szükséges könyvtárakat;
2. létrehozza az Express alkalmazást;
3. beállítja a kérések előfeldolgozását;
4. létrehozza az adatbázis-kapcsolat poolt;
5. megadja a kezelendő API-útvonalakat;
6. elindítja a szervert a 3000-es porton.

Egyszerűsített adatfolyam:

```text
Frontend (böngésző)
        │ HTTP-kérés, például GET /api/zenekar
        ▼
Express szerver (server.ts)
        │ SQL-lekérdezés
        ▼
MySQL-adatbázis
        │ eredmény
        ▼
Express szerver ── JSON-válasz ──► Frontend
```

## 1. Könyvtárak importálása

```ts
import express, { Request, Response } from 'express';
import mysql, { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import cors from 'cors';
```

- Az **import** elérhetővé teszi egy másik könyvtár vagy modul elemeit.
- Az `express` az útvonalak és a HTTP-válaszok kezelését segíti.
- A `Request` és a `Response` TypeScript-típusok. Azt írják le, hogy néz ki egy Express-kérés, illetve -válasz.
- A `mysql2/promise` a MySQL-kapcsolathoz használható **Promise-alapú** felületet ad. A Promise egy később teljesülő vagy hibára futó művelet eredményét képviseli.
- A `RowDataPacket` a lekérdezés által visszaadott sorok típusának jelölésére szolgál.
- A `ResultSetHeader` módosító SQL-műveletek — például az `INSERT` — eredményét írja le.
- A `cors` az Express CORS-beállításához használt könyvtár.

**TypeScript-típusok** esetén fontos, hogy ezek elsősorban fejlesztés közben segítenek a helyes használat ellenőrzésében. Nem helyettesítik a futásidejű **validációt**: a böngészőből érkező adatot továbbra is ellenőrizni kell.

## 2. Express-alkalmazás és middleware-ek

```ts
const app = express();
app.use(cors());
app.use(express.json());
```

1. Az `express()` létrehozza az alkalmazást; az `app` változón keresztül állítjuk be.
2. Az `app.use(...)` egy middleware-t regisztrál.
3. A `cors()` engedélyezi a CORS-kérések kezelését az Express számára.
4. Az `express.json()` a megfelelő JSON-kéréstörzset feldolgozza, és az adatot elérhetővé teszi a `req.body` mezőben.

Ha a JSON-feldolgozó middleware hiányozna, a `POST` kérés elküldött törzse nem lenne a mostani formában elérhető a végpont kódjában.

## 3. MySQL-kapcsolatpool

```ts
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '...',
  database: 'rock_zenekarok_70s',
  port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
```

A `mysql.createPool(...)` létrehozza a MySQL-kapcsolatok kezelésére szolgáló poolt.

- `host`: az adatbázis-szerver címe; a `localhost` a saját gépet jelenti.
- `user`: az adatbázis-felhasználó neve.
- `password`: az adatbázis-felhasználó hitelesítési adata. A tényleges értéket ne tedd közzé, és ne másold tananyagba vagy nyilvános kódba.
- `database`: az adatbázis neve.
- `port`: az adatbázis-szerver portja. Ez a szerver portja, nem az Express API-é.
- `waitForConnections`: ha a poolban nincs éppen szabad kapcsolat, a várakozó kérés várhat egy felszabaduló kapcsolatra.
- `connectionLimit`: a poolban egyszerre használható kapcsolatok felső határa.
- `queueLimit`: a várakozó kapcsolatok sorának korlátja; a `0` beállítás ennél a könyvtárnál korlátlan sort jelent.

Az adatbázis `3307`-es, az API pedig `3000`-es portja két külön szolgáltatást jelöl. A frontend fejlesztői szervere ettől is külön címen futhat.

## 4. Az útvonalak felépítése

Egy útvonal általános alakja:

```ts
app.METÓD('/útvonal', async (req, res) => {
  // A kérés feldolgozása és a válasz elküldése
});
```

- Az `app.get(...)` egy `GET` kérésre reagál.
- Az `app.post(...)` egy `POST` kérésre reagál.
- A `req` (*request*) tartalmazza a beérkező kérést.
- A `res` (*response*) segítségével a szerver választ küld.
- Az `async` függvényben az `await` megvárhat egy Promise-alapú műveletet, például egy adatbázis-lekérdezést.
- A `res.status(...).json(...)` beállítja a HTTP-válaszkódot, majd JSON-választ küld.

### A fájl útvonalainak áttekintése

| HTTP-metódus | Útvonal | Mire való? | Sikeres válasz |
|---|---|---|---|
| `GET` | `/api/zenekar` | Zenekarok lekérése a stílus nevével együtt | `200` és JSON-tömb |
| `GET` | `/api/stilus` | Stílusok lekérése, például egy legördülő menühöz | `200` és JSON-tömb |
| `GET` | `/stilusok` | Régebbi vagy másik útvonalnévvel elérhető stíluslista | `200` és JSON-tömb |
| `POST` | `/api/ujzenekar` | Új zenekar beszúrása | `201` és az új sor azonosítója |

Egy `GET` kérés általában adatot kér le, és nem módosítja az adatbázist. A `POST` kérés ebben a fájlban új adatot küld be.

## 5. Zenekarok lekérdezése: `GET /api/zenekar`

```ts
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
```

### Soronkénti magyarázat

1. Az `app.get(...)` létrehozza a `GET /api/zenekar` útvonalat.
2. Az első paraméter `_req`-re keresztnevezett kérésobjektumot itt nem használja a kód. Az aláhúzás gyakori jelzés arra, hogy a paraméter szándékosan kihasználatlan.
3. A `try` blokkban a szerver megpróbálja lefuttatni az adatbázis-lekérdezést.
4. A `SELECT z.*, s.stilus_neve` kiválasztja a `zenekarok` tábla összes oszlopát (`z.*`) és a stílustábla `stilus_neve` oszlopát.
5. A `zenekarok z` és a `stilusok s` után álló betűk **táblaaliasok**. Ezek rövid nevek a lekérdezésen belül.
6. A `LEFT JOIN` összekapcsolja a két táblát a `z.stilus_id = s.id` feltétel szerint. A bal oldali tábla minden zenekarsora megmarad akkor is, ha nincs hozzá illeszkedő stílussor; ilyenkor a stílus mezője `NULL` lehet.
7. Az `ORDER BY z.id ASC` az `id` szerint növekvő sorrendbe rendezi az eredményt. Az `ASC` jelentése növekvő; a `DESC` csökkenő sorrendet jelentene.
8. A `pool.query<RowDataPacket[]>(query)` lefuttatja a lekérdezést. Az általános típusjelölés azt mondja a TypeScriptnek, hogy a sorok tömbként érkeznek.
9. Az `await` megvárja a lekérdezés befejeződését. A `mysql2/promise` lekérdezése két elemből álló eredményt ad; itt a `[rows]` a lekérdezés adatsorait emeli ki.
10. A `res.status(200).json(rows)` sikeres HTTP-választ küld a sorok JSON-formátumú tömbjével.
11. Ha a lekérdezés vagy a válasz előkészítése hibát okoz, a `catch` ág `500`-as választ küld.

**Figyeld meg:** az útvonalban a `try/catch` az adatbázis-hibák kezelésére szolgál. A `500` válaszkód szerveroldali hibát jelent. A jelenlegi példakód az adatbázis-hiba részleteit is visszaküldi; éles, nyilvános rendszernél a belső technikai részleteket általában nem célszerű a kliensnek megmutatni.

## 6. Stílusok lekérdezése: `GET /api/stilus`

```ts
app.get('/api/stilus', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, stilus_neve FROM stilusok ORDER BY id ASC'
    );
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({
      error: 'Nem sikerült lekérni a stílusokat',
      details: err,
    });
  }
});
```

Ez a végpont csak az `id` és a `stilus_neve` oszlopot kéri le. Ez elegendő lehet egy **legördülő menühöz**: a felhasználó a stílus nevét látja, az alkalmazás pedig az azonosítót küldheti vissza.

A lekérdezés eredménye például ilyen szerkezetű lehet:

```json
[
  { "id": 1, "stilus_neve": "Rock" },
  { "id": 2, "stilus_neve": "Hard rock" }
]
```

A konkrét sorokat az adatbázis tartalma határozza meg.

## 7. Kompatibilitási útvonal: `GET /stilusok`

```ts
app.get('/stilusok', async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM stilusok');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});
```

Ez az útvonal szintén a stílusokat olvassa ki, de más URL-en érhető el, és `SELECT *`-ot használ. A mellette lévő megjegyzés szerint a célja a **kompatibilitás** a `/stilusok` útvonallal.

Az explicit oszloplista — például `SELECT id, stilus_neve` — általában áttekinthetőbb, mert pontosan megmutatja, milyen adatokra van szükség.

## 8. Új zenekar hozzáadása: `POST /api/ujzenekar`

### A kérés adatainak kiolvasása

```ts
const {
  nev,
  stilus_id,
  orszag,
  varos,
  aktiv_evek,
  tagok,
  legsikeresebb_album,
  kep_url,
} = req.body;
```

Az **objektum-destructuring** nevű JavaScript-szintaxis az objektum tulajdonságait külön változókba emeli. A kód tehát a `req.body` nyolc mezőjét olvassa ki.

A frontendnek például ilyen JSON-törzset kell küldenie:

```json
{
  "nev": "Példa zenekar",
  "stilus_id": 1,
  "orszag": "Magyarország",
  "varos": "Budapest",
  "aktiv_evek": "1972–1985",
  "tagok": "Példa Elek, Minta Anna",
  "legsikeresebb_album": "Első lemez",
  "kep_url": "https://pelda.hu/zenekar.jpg"
}
```

### Alapvető ellenőrzés

```ts
if (
  !nev ||
  !stilus_id ||
  !orszag ||
  !varos ||
  !aktiv_evek ||
  !tagok ||
  !legsikeresebb_album ||
  !kep_url
) {
  return res.status(400).send('Hiányos adatok.');
}
```

Az `if` feltétel azt vizsgálja, hogy a nyolc mező közül bármelyik hiányzik-e vagy **falsy** értékű-e. Ilyen például az üres szöveg, a `null`, az `undefined` és a `0`. Ha a feltétel igaz, a szerver `400`-as hibakódot küld, amely hibás klienskérést jelent.

Ez **alapvető jelenlétvizsgálat**, nem teljes adatellenőrzés. Nem ellenőrzi például, hogy:

- a `stilus_id` valóban létező stílushoz tartozik-e;
- a `kep_url` érvényes URL-e;
- a szövegek nem csak szóközökből állnak-e;
- az értékek megfelelnek-e a megengedett hosszúságnak vagy típusnak.

### Adat beszúrása

```ts
const query = `
  INSERT INTO zenekarok
  (nev, stilus_id, orszag, varos, aktiv_evek, tagok, legsikeresebb_album, kep_url)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;
```

Az `INSERT INTO` új sort szúr be a `zenekarok` táblába. Az oszlopnevek után álló nyolc `?` jel **paraméterhelyettesítő**. Az adatértékeket a kód külön adja át:

```ts
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
```

A tömb sorrendjének meg kell egyeznie a `VALUES` részben szereplő `?` jelek sorrendjével. Így a `nev` az első `?`-hez, a `stilus_id` a másodikhoz kerül, és így tovább.

Az értékek ilyen átadása biztonságosabb és megbízhatóbb, mint az SQL-utasításba szövegként összefűzni a felhasználói adatokat. A `ResultSetHeader` típusú eredményből a kód kiolvassa a beszúrt sor azonosítóját:

```ts
return res.status(201).json({ id: result.insertId });
```

A `201` jelentése: a kérés sikeres volt, és új erőforrás jött létre. A válasz például:

```json
{ "id": 7 }
```

Az `id` tényleges értékét az adatbázis adja; a példa csak a válasz formáját mutatja.

### Hibakezelés

```ts
} catch (err) {
  return res.status(500).json({
    error: 'Beszúrási hiba',
    details: err,
  });
}
```

Ha a beszúrás során hiba történik, a szerver `500`-as választ ad. A `return` után az adott végrehajtási ág befejeződik; ez megakadályozza, hogy a hibaválasz elküldése után a függvény a sikeres választ is megpróbálja elküldeni.

## 9. A szerver elindítása

```ts
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend szerver fut a http://localhost:${PORT} címen`);
});
```

- A `PORT` konstansban szereplő `3000` a backend HTTP-portja.
- Az `app.listen(...)` elindítja a szervert, és ezen a porton várja a kéréseket.
- A függvény megadott művelete akkor fut le, amikor a szerver elkezd figyelni a porton.
- A **template string** a backtickek közötti szöveg; a `${PORT}` részt a JavaScript behelyettesíti a változó értékével.

Ez az útvonal nem az adatbázis portja: a MySQL-kapcsolat külön beállított porton működik.

## 10. Kérés–válasz példák

### Zenekarok lekérése

```http
GET http://localhost:3000/api/zenekar
```

Siker esetén a válasz HTTP-státusza `200`, a válasz törzse pedig egy JSON-tömb. Egy sor tartalmazza a zenekar mezőit és a lekérdezésből származó `stilus_neve` értéket.

### Új zenekar küldése

```http
POST http://localhost:3000/api/ujzenekar
Content-Type: application/json
```

A kérés JSON-törzsének mind a nyolc, a végpont által kiolvasott mezőt tartalmaznia kell. Hiányzó adat esetén a kód `400`-as választ ad; sikeres beszúrás esetén `201`-et és az új rekord azonosítóját.

## 11. Gyakorlófeladatok

Először próbáld meg önállóan megoldani a feladatokat. A 3–5. feladatnál a megoldásokat akár külön jegyzetben vagy egy helyi másolatban is kidolgozhatod.

### 1. feladat – Fájl részeinek felismerése

Rendeld az alábbi kódrészletekhez a feladatot:

1. `app.use(express.json())`
2. `mysql.createPool(...)`
3. `app.get('/api/stilus', ...)`
4. `res.status(201).json(...)`
5. `app.listen(PORT, ...)`

Lehetséges válaszok:

- a szerver elindítása;
- JSON-kéréstörzs feldolgozása;
- adatbázis-kapcsolatok kezelése;
- stílusokat lekérő végpont létrehozása;
- sikeres új rekord létrejöttének jelzése.

### 2. feladat – HTTP-válaszkódok

Írd le, melyik kódot használja a `POST /api/ujzenekar` az alábbi esetekben, és mit jelent:

1. Hiányzik a zenekar neve.
2. Az új zenekar beszúrása sikerült.
3. Hiba történt az adatbázisba írás közben.

### 3. feladat – SQL-lekérdezés értelmezése

Magyarázd el saját szavaiddal a következő kifejezéseket a `GET /api/zenekar` lekérdezéséből:

```sql
SELECT z.*, s.stilus_neve
FROM zenekarok z
LEFT JOIN stilusok s ON z.stilus_id = s.id
ORDER BY z.id ASC
```

Válaszolj ezekre:

1. Mit jelent a `z.*`?
2. Mire szolgál a `LEFT JOIN`?
3. Milyen kapcsolatot fejez ki az `ON` feltétel?
4. Milyen sorrendet jelent az `ASC`?

### 4. feladat – Az új rekord útja

Számozd meg a műveleteket a helyes sorrendben:

- A szerver egyetlen válaszban elküldi a `201`-es státuszt és az új rekord `id` értékét.
- A `express.json()` feldolgozza a JSON-kéréstörzset.
- A frontend `POST` kérést küld.
- A szerver ellenőrzi, hogy a kötelező mezők megvannak-e.
- A szerver paraméterezett `INSERT` lekérdezést hajt végre.
- A szerver siker esetén `201`-es HTTP-választ küld.

### 5. feladat – Biztonságos adatátadás

Az alábbi két megoldás közül melyiket használja a fájl a zenekar hozzáadásához?

**A változat**

```ts
const query = 'INSERT INTO zenekarok (nev) VALUES (?)';
await pool.query(query, [nev]);
```

**B változat**

```ts
const query = `INSERT INTO zenekarok (nev) VALUES ('${nev}')`;
await pool.query(query);
```

Írd le, miért előnyös a választott megoldás.

### 6. feladat – Validáció továbbgondolása

A jelenlegi kód ellenőrzi, hogy a `kep_url` értéke meg van-e adva. Tervezz meg két további ellenőrzést, amely hasznos lehet a képcím vagy más mezők esetén. Minden ellenőrzésnél írd le, milyen hibás adatot próbál kiszűrni.

### 7. feladat – Új lekérdezési útvonal tervezése

Tervezz meg egy új `GET` végpontot, amely csak az adott országban található zenekarokat adja vissza. Írd le:

- az útvonal nevét;
- hogy a kéréstörzs helyett melyik kérésrészen kapja meg a szerver a szűrőértéket;
- milyen SQL-feltétellel szűrnél;
- miért használnál paraméterhelyettesítőt a szűrőértékhez.

Nem szükséges az egész szerverfájlt átírnod; először csak a megoldás tervét fogalmazd meg.

### 8. feladat – Hibakeresési gondolkodás

Tegyük fel, hogy az új zenekar nem jelenik meg az adatbázisban. Sorolj fel legalább négy ellenőrzési pontot! Gondolj a kérés URL-jére és metódusára, a JSON-adatokra, a szerver futására és az adatbázisra is.

## 12. Ellenőrző kérdések és megoldások

### Rövid önellenőrzés

Próbálj válaszolni a megoldások elolvasása előtt:

1. Melyik porton fogad HTTP-kéréseket a backend?
2. Melyik middleware teszi elérhetővé a JSON-adatokat a `req.body` mezőben?
3. Mi a `LEFT JOIN` előnye ennél a lekérdezésnél?
4. Miért szerepel nyolc `?` jel az `INSERT` lekérdezésben?
5. Mit jelent a `400`, a `201` és az `500` válaszkód?
6. Mit jelent az `await` a `pool.query(...)` előtt?
7. Mi a különbség az API és az adatbázis portja között?

### Megoldások

**1. feladat**

1. JSON-kéréstörzs feldolgozása.
2. Adatbázis-kapcsolatok kezelése.
3. Stílusokat lekérő végpont létrehozása.
4. Sikeres új rekord létrejöttének jelzése.
5. A szerver elindítása.

**2. feladat**

1. `400` – a kliens hibás vagy hiányos kérést küldött.
2. `201` – új rekord jött létre.
3. `500` – szerveroldali hiba történt.

**3. feladat**

1. A `z.*` a `zenekarok` tábla összes oszlopát választja ki.
2. A `LEFT JOIN` összekapcsolja a zenekarokat a stílusokkal, de a bal oldali `zenekarok` tábla sorait akkor is megtartja, ha nincs illeszkedő stílus.
3. Azt mondja meg, hogy a zenekar `stilus_id` mezője melyik stílus `id` mezőjéhez kapcsolódik.
4. Növekvő sorrendet.

**4. feladat**

1. A frontend `POST` kérést küld.
2. A `express.json()` feldolgozza a JSON-kéréstörzset.
3. A szerver ellenőrzi, hogy a kötelező mezők megvannak-e.
4. A szerver paraméterezett `INSERT` lekérdezést hajt végre.
5. A szerver egyetlen válaszban elküldi a `201`-es státuszt és az új rekord `id` értékét.

**5. feladat**

A fájl az **A változathoz** hasonló, paraméterezett lekérdezést alkalmazza. Az érték külön paraméterként kerül átadásra, nem az SQL-szöveg összefűzésével. Ez segít megelőzni, hogy a felhasználótól kapott adat SQL-utasításként legyen értelmezve.

**6. feladat**

Több helyes megoldás lehetséges. Például:

- a `kep_url` legyen érvényes URL-formátumú;
- a mező ne csak szóközöket tartalmazzon;
- a szöveges mezők hossza maradjon a megfelelő adatbázismező korlátain belül;
- a `stilus_id` legyen pozitív szám, és tartozzon meglévő stílushoz.

A feladat célja, hogy a jelenlegi „meg van-e adva?” vizsgálaton túl a kapott érték helyességére is gondolj.

**7. feladat**

Egy lehetséges terv:

- útvonal: `GET /api/zenekar?orszag=...`;
- a szűrőérték a kérés **query paraméterei** között érkezik, Expressben a `req.query` segítségével érhető el;
- SQL-feltétel: `WHERE orszag = ?`;
- a kérésből érkező értéket paraméterként adjuk át, nem az SQL-szövegbe fűzzük.

Ez a feladat tervkészítést kér, nem az új végpont automatikus hozzáadását.

**8. feladat**

Lehetséges ellenőrzési pontok:

- A backend fut-e a `3000`-es porton?
- A kérés `POST` metódusú, és a `/api/ujzenekar` útvonalra érkezik-e?
- A kérés fejléce jelzi-e a JSON-formátumot (`Content-Type: application/json`)?
- Mind a nyolc kötelező mező szerepel-e a JSON-törzsben, megfelelő nevekkel?
- A `express.json()` middleware lefut-e?
- Elérhető-e a MySQL-adatbázis, megfelelő adatbázisnévvel és porttal?
- Létezik-e a hivatkozott stílus a `stilusok` táblában?
- Mit ír ki a backend terminálja, és milyen HTTP-válasz érkezik?

**Önellenőrző kérdések**

1. A backend HTTP-portja `3000`.
2. Az `express.json()` middleware.
3. Megtartja a bal oldali `zenekarok` tábla sorait illeszkedő stílus hiányában is.
4. Minden beszúrt értékhez egy paraméter tartozik; az oszlopok és értékek sorrendjének meg kell egyeznie.
5. `400`: hibás/hiányos kérés; `201`: új erőforrás létrejött; `500`: szerveroldali hiba.
6. Megvárja az aszinkron adatbázis-lekérdezés eredményét.
7. Az API portján a frontenddel kommunikáló HTTP-szerver fut, az adatbázis portján pedig a MySQL-szerver érhető el.

## 13. Rövid összefoglaló

- Az Express alkalmazás HTTP-kéréseket fogad és útvonalak szerint kezeli őket.
- A middleware-ek a kérések feldolgozását segítik.
- A `mysql2/promise` és a `pool` teszi lehetővé az adatbázis aszinkron elérését.
- A `GET` útvonalak itt adatokat olvasnak ki; a `POST` útvonal új zenekart rögzít.
- A `LEFT JOIN` a zenekarokat a stílusok adataival kapcsolja össze.
- A `try/catch` kezeli a művelet közben fellépő hibákat.
- A paraméterhelyettesítők az adatbázisnak átadott értékeket külön kezelik az SQL-utasítástól.
- A jelenlegi mezőellenőrzés alapvető; komolyabb alkalmazásban részletesebb szerveroldali **validációra** is szükség van.

## További tanulási lépés

Nyisd meg a projekt gyökérkönyvtárában található `README.md` fájlt, majd keresd meg a frontendben, hol hívja meg az alkalmazás a `/api/zenekar`, `/api/stilus` és `/api/ujzenekar` útvonalakat. Hasonlítsd össze az ott küldött vagy fogadott adatokat a jelen tananyagban leírtakkal.
