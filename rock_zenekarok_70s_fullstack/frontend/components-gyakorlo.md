# Gyakorlóanyag a React-komponensekhez

## Cél és felhasználás

Ez a tananyag a frontend négy React-komponensét magyarázza el: `Navbar.tsx`, `Home.tsx`, `BandsList.tsx` és `AddBand.tsx`. Azt mutatja be, hogyan épül fel a felület, hogyan kapnak a komponensek adatot és függvényeket, hogyan kérnek adatot a backenden keresztül, valamint hogyan működik a zenekarfelvételi űrlap.

Javasolt sorrend:

1. Tanuld meg a szakkifejezéseket.
2. Nézd végig a komponensek feladatát és adatfolyamát.
3. Oldd meg a feladatokat a megoldások elolvasása előtt.
4. A saját válaszaidat ellenőrizd a dokumentum végén.

## Tanulási célok

A tananyag végére képes leszel:

- elmagyarázni, mi a **React-komponens**, a **prop** és a **state**;
- felismerni a JSX-ben használt kifejezéseket, eseménykezelőket és feltételes megjelenítést;
- leírni, hogyan kér le adatot a `BandsList` és hogyan küld adatot az `AddBand`;
- megérteni a vezérelt űrlapmezők és a `useEffect` működésének alapjait;
- követni, hogyan ad át függvényt a szülő komponens a gyermekkomponensnek;
- felismerni a listák `key` tulajdonságának szerepét.

## Fontos szakkifejezések

| Szakkifejezés | Jelentés |
|---|---|
| **React** | JavaScript-könyvtár, amellyel felhasználói felületeket építhetünk komponensekből. |
| **Komponens** | Újra felhasználható felületi egység, amely jellemzően függvényként JSX-et ad vissza. |
| **JSX** | JavaScriptbe ágyazott, HTML-szerű szintaxis, amellyel React-elemeket írunk le. |
| **Prop** (*property*) | A szülő komponens által a gyermekkomponensnek átadott adat vagy függvény. |
| **State** (állapot) | A komponens által kezelt, idővel változó adat. Módosítása újrarenderelést válthat ki. |
| **Hook** | React-függvény, amellyel függvénykomponensből React-képességeket használunk. Ilyen a `useState` és a `useEffect`. |
| **`useState`** | Hook az állapot létrehozásához és módosításához. Visszaadja az aktuális értéket és a módosító függvényt. |
| **`useEffect`** | Hook olyan műveletek végrehajtásához, amelyek a komponens megjelenítéséhez kapcsolódnak, például adatlekéréshez. |
| **Renderelés** (*rendering*) | A komponens által leírt felület megjelenítése vagy frissítése. |
| **Újrarenderelés** | A React a változó props vagy state alapján ismét kiszámítja, mit kell megjeleníteni. |
| **Eseménykezelő** (*event handler*) | Függvény, amely egy felhasználói műveletre, például kattintásra vagy űrlapbeküldésre reagál. |
| **Feltételes megjelenítés** | Annak eldöntése, hogy egy JSX-rész jelenjen-e meg egy feltétel alapján; például `error && <p>...</p>`. |
| **Lista kulcsa** (*key*) | A React által a listában szereplő elemek azonosítására használt érték, például `key={b.id}`. |
| **Promise** | Egy később elkészülő vagy hibával befejeződő aszinkron művelet eredményét képviselő objektum. |
| **Aszinkron művelet** | Olyan művelet, amelynek eredménye nem feltétlenül érkezik meg azonnal, például egy hálózati kérés. |
| **HTTP-kérés** | A böngésző és a backend közötti hálózati üzenet, például `GET` vagy `POST`. |
| **`fetch`** | A böngésző beépített függvénye HTTP-kérések indítására. Promise-t ad vissza. |
| **JSON** | Gyakori szöveges adatcsere-formátum API-kérésekhez és -válaszokhoz. |
| **Űrlap** (*form*) | Adatok bevitelére és beküldésére szolgáló felületi elem. |
| **Vezérelt mező** (*controlled input*) | Olyan űrlapmező, amelynek értékét React-state tárolja, és amely a változáskor frissíti ezt az állapotot. |
| **Validáció** | A felhasználói adatok ellenőrzése beküldés előtt vagy a szerveren. |

## A négy komponens kapcsolata

Az `App` a fő komponens, amely a navigáció alapján kiválasztja a megjelenítendő képernyőt. A `Navbar` és a `Home` a navigációs állapotot módosító függvényt kapja meg. A `BandsList` betölti és megjeleníti a zenekarokat. Az `AddBand` betölti a választható stílusokat, majd beküldéskor új zenekart küld a backendnek.

```text
App
├── Navbar       ── menüpont-kattintás ──► App nézetet vált
└── <main>
    ├── Home     ── gombkattintás ───────► App nézetet vált
    ├── BandsList ── GET /api/zenekar ───► backend
    └── AddBand  ── GET /api/stilus ─────► backend
                 └─ POST /api/ujzenekar ─► backend
```

## 1. `Navbar.tsx` – navigációs sáv

A `Navbar` a képernyő tetején lévő navigációs gombokat jeleníti meg. A propjai:

```ts
interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}
```

- A `currentView` megmondja, melyik nézet az aktív.
- A `setCurrentView` egy függvény, amellyel a gyermek az `App`-ben tárolt nézetállapotot módosíthatja.
- A propok az `App`-ből érkeznek; a `Navbar` nem tárol külön, saját nézetállapotot.

Példa a komponens használatára:

```tsx
<Navbar currentView={currentView} setCurrentView={setCurrentView} />
```

A menüpontok `onClick` eseményei a megfelelő nézetnevet adják át a `setCurrentView` függvénynek. A `className` feltételesen tartalmazza az `active-link` osztályt:

```tsx
className={`custom-nav-link ${currentView === 'home' ? 'active-link' : ''}`}
```

Ez a **template string** és a **ternary operator** (feltételes `? :` kifejezés). Ha a `currentView` értéke `home`, az aktív osztály is bekerül.

## 2. `Home.tsx` – kezdőoldal

A `Home` megjeleníti a kezdőoldali címet, egy képet és két navigációs gombot. A prop típusa:

```ts
interface HomeProps {
  onNavigate: (view: string) => void;
}
```

Az `onNavigate` függvényt az `App` adja át. Gombkattintáskor a kezdőoldal meghívja a függvényt:

```tsx
onClick={() => onNavigate('zenekarok')}
```

A `Home` így jelzi a szülőnek, hogy melyik nézetre szeretne váltani; a tényleges állapot az `App`-ben változik meg. Ezt a megközelítést **adatáramlásnak** is nevezik: a megjelenítéshez szükséges érték lefelé, a felhasználói szándék pedig egy callback függvény meghívásával felfelé jut el.

Az `alt` attribútum a kép szöveges leírása. Képernyőolvasók és olyan helyzetek számára hasznos, amikor a kép nem tölthető be.

## 3. `BandsList.tsx` – zenekarlista

### Állapotok

```tsx
const [bands, setBands] = useState<Band[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
```

- `bands`: a betöltött zenekarok tömbje.
- `loading`: jelzi, hogy a lista betöltése folyamatban van-e.
- `error`: hiba esetén tárolja a hibaüzenetet; kezdetben nincs hiba, ezért az értéke `null`.

A `useState<Band[]>([])` azt mondja a TypeScriptnek, hogy a `bands` állapot `Band` értékek tömbje.

### Adatlekérés `useEffect` segítségével

A komponens a megjelenése után `fetch('http://localhost:3000/api/zenekar')` kérést küld. A `.then(...)` lépések egymás után dolgozzák fel a választ:

1. Ellenőrzi a `res.ok` értékét. Sikertelen HTTP-válasznál hibát dob.
2. Siker esetén a `res.json()` a JSON-választ JavaScript-adattá alakítja.
3. A `setBands(data)` eltárolja a zenekarokat, a `setLoading(false)` pedig befejezettnek jelöli a betöltést.
4. Hiba esetén a `.catch(...)` beállítja az üzenetet, és a betöltést is lezárja.

A `useEffect` második argumentuma az üres tömb (`[]`). Ez azt jelzi, hogy a hatás a komponens életciklusának elején fusson le; a React 18 **Strict Mode** fejlesztői környezetben bizonyos hatásokat ellenőrzés céljából ismét lefuttathat, ezért fejlesztés közben több hálózati kérés is látható lehet.

### Betöltés és hiba megjelenítése

```tsx
if (loading) return <div>Zenekarok betöltése...</div>;
if (error) return <div>Hiba: {error}</div>;
```

Ezek **korai visszatérések**. Ha a betöltés folyamatban van, a komponens a töltési üzenetet adja vissza. Ha hiba történt, a hibaüzenetet adja vissza. Csak akkor jelenik meg a lista, ha egyik állapot sem áll fenn.

### Lista megjelenítése

```tsx
{bands.map((b) => (
  <div key={b.id}>...</div>
))}
```

A `map` minden zenekarhoz létrehoz egy kártyát. A `key={b.id}` egyedi azonosítóként segíti a Reactet a listaelemek változásainak követésében. A kártyán a kód megjeleníti a zenekar nevét, stílusát, származási helyét, aktív éveit, tagjait, albumát és képét.

Ha a `stilus_neve` nincs megadva, a `b.stilus_neve || 'Rock'` kifejezés a `'Rock'` értéket használja. Ez **fallback**, azaz tartalék megjelenítési érték.

### Aktív évek kiszámítása

A „Aktív évek száma” gomb meghívja a `handleShowActiveYears(band)` függvényt. Az függvény:

1. levágja a szöveg elejéről és végéről a felesleges szóközöket;
2. kötőjel vagy nagykötőjel mentén kettébontja az aktív évek szövegét;
3. a kezdő- és záróévet számmá alakítja;
4. ha a végződés `napjainkig`, jelenleg fixen `2025`-öt használ záróévként;
5. siker esetén `alert` ablakban mutatja a két év különbségét, hibás formátumnál pedig jelzi, hogy nem tudta meghatározni az időtartamot.

**Megfigyelés:** a `2025` rögzített érték, ezért később elavulhat. Ez jó önálló továbbfejlesztési feladat: gondold végig, hogyan lehetne mindig az aktuális évet használni.

## 4. `AddBand.tsx` – új zenekar felvétele

### Komponensprop

```ts
interface AddBandProps {
  onSuccess: () => void;
}
```

Az `onSuccess` olyan függvény, amely nem vár argumentumot. Sikeres mentés után a komponens meghívja. Az `App` ezt arra használja, hogy visszaváltson a zenekarlista nézetére.

### Űrlapállapot és stíluslista

A komponens két fontos állapotot kezel:

- `styles`: a backendről lekért stílusok, `Style[]` típussal;
- `formData`: az űrlap mezőinek aktuális értékei;
- `errorMsg`: hiba esetén megjelenített üzenet, `string | null` típussal.

A szöveges űrlapértékek kezdetben üres szövegek. A `useEffect` a komponens betöltésekor lekéri a `GET /api/stilus` adatokat. Ha érkezik legalább egy stílus, az első stílus azonosítója lesz az alapértelmezett választás.

### Vezérelt mezők

A mezők a `formData` megfelelő tulajdonságát használják `value` értékként. Az `onChange={handleChange}` eseménykezelő minden módosításkor frissíti a state-et:

```tsx
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};
```

- A `React.ChangeEvent<...>` leírja a mező változási eseményének típusát.
- Az `e.target.name` az érintett mező nevét adja, például `orszag`.
- Az `e.target.value` a mező új értéke.
- A `{ ...formData, ... }` **spread syntax** segítségével először bemásolja a korábbi mezőket, majd felülírja a módosított mezőt.
- A `[e.target.name]` **számított tulajdonságnév**, vagyis a tulajdonság neve futás közben, a mező `name` attribútumából származik.

Minden `input` és `select` `name` értékének egyeznie kell a `formData` kulcsával. Ellenkező esetben a frissítés nem a várt mezőt módosítja.

### Űrlap beküldése

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setErrorMsg(null);
  // POST kérés a backendhez
};
```

Az `e.preventDefault()` megakadályozza a böngésző alapértelmezett űrlapbeküldését, ami rendszerint újratöltené az oldalt. Ezután az `async` függvény `fetch` segítségével `POST` kérést küld a backendnek.

A kérés:

- `method: 'POST'` metódussal új adatot küld;
- `Content-Type: application/json` fejlécet állít be;
- a `JSON.stringify(...)` segítségével JSON-szöveggé alakítja a kérés törzsét;
- a `stilus_id` értéket `Number(...)` segítségével számmá alakítja, mert az űrlapmezőkből az érték szövegként érkezik.

Ha a válasz nem sikeres (`!response.ok`), a kód kiolvassa a válasz szövegét, majd hibát dob. A `catch` beállítja az `errorMsg` értékét. A JSX-ben az `errorMsg && ...` kifejezés csak akkor jelenít meg hibaüzenetet, ha van ilyen üzenet.

Sikeres válasznál a komponens meghívja az `onSuccess()` függvényt. A `form` elem `onSubmit` eseménye a `handleSubmit`-et használja; a beküldő gomb `type="submit"` beállítása miatt a gomb megnyomása ezt az eseményt váltja ki.

### Böngészőoldali mezőellenőrzés

Az űrlapmezők `required` attribútuma a böngésző beépített ellenőrzését kéri. A `kep_url` mező `type="url"` értéke URL-formátumot vár. Ez hasznos, de **nem helyettesíti a szerveroldali validációt**: a backendnek magának is ellenőriznie kell a kapott adatokat.

## 5. Gyakorlófeladatok

### 1. feladat – Komponensek és feladatuk

Párosítsd a komponenst a feladatával:

- `Navbar`
- `Home`
- `BandsList`
- `AddBand`

Feladatok:

1. A zenekarok lekérése és kártyák megjelenítése.
2. A fő navigációs gombok megjelenítése.
3. Az új zenekar adatainak bekérése és beküldése.
4. Kezdőoldali cím, kép és navigációs gombok megjelenítése.

### 2. feladat – Prop vagy state?

Döntsd el mindegyiknél, hogy prop vagy state:

1. A `BandsList` által eltárolt `bands`.
2. Az `App` által a `Navbar`-nak átadott `currentView`.
3. Az `AddBand` által tárolt `errorMsg`.
4. A `Home`-nak átadott `onNavigate`.

### 3. feladat – Adatlekérés menete

Írd le sorrendben, mi történik a `BandsList` megjelenése után az adat megjelenéséig. Használd a következő szavakat: `useEffect`, `fetch`, `res.json()`, `setBands`, `loading`.

### 4. feladat – Vezérelt mező

Az `AddBand` egyik mezője:

```tsx
<input name="varos" value={formData.varos} onChange={handleChange} />
```

Válaszolj:

1. Honnan veszi az input a megjelenített értékét?
2. Melyik függvény fut le gépeléskor?
3. Melyik mező frissül a `formData` objektumban, ha a `name` értéke `varos`?

### 5. feladat – Navigáció adatfolyama

Írd le, hogyan jut el a kezdőoldal „Együttesek adatai” gombjának kattintása odáig, hogy a zenekarlista jelenjen meg. Nevezd meg a `Home`, `onNavigate`, `App` és `currentView` elemeket.

### 6. feladat – Lista és `key`

Miért kap minden zenekarkártya `key={b.id}` értéket? Miért jobb ez egy listaelemnél, mint a tömbbeli sorszám használata, ha az elemek később rendezhetők vagy változhatnak?

### 7. feladat – Fejlesztési ötlet

A `BandsList` a `napjainkig` végű időszaknál fixen `2025`-öt használ. Fogalmazz meg egy JavaScript-kifejezést, amely az aktuális év számát adja vissza. Magyarázd el, miért előnyösebb egy évszámot nem állandóan beégetni.

### 8. feladat – Hibakeresés

Az űrlap elküldése után a felület nem lép vissza a listára. Sorolj fel legalább négy lehetséges ellenőrzési pontot! Gondolj a hálózati kérésre, a backend válaszára, az `onSuccess` függvényre és a navigációs állapotra.

## 6. Megoldások

**1. feladat:** `Navbar` – 2; `Home` – 4; `BandsList` – 1; `AddBand` – 3.

**2. feladat:**

1. State.
2. Prop.
3. State.
4. Prop.

**3. feladat:** A komponens megjelenésekor a `useEffect` elindítja a `fetch` kérést. A válasz törzsét a `res.json()` alakítja JavaScript-adattá. A `setBands` eltárolja a kapott listát; ezután a `loading` állapot hamisra vált, és a komponens megjeleníti a zenekarkártyákat.

**4. feladat:**

1. A `formData.varos` state-ből.
2. A `handleChange` függvény.
3. A `varos` tulajdonság.

**5. feladat:** A gomb kattintáskezelője meghívja a `Home` propjaként kapott `onNavigate('zenekarok')` függvényt. Az `App` ezt a `currentView` state beállítására használja. Az `App` újrarenderelődik, és a `currentView === 'zenekarok'` feltétel miatt megjelenik a `BandsList`.

**6. feladat:** A `key` stabilan azonosítja az egyes elemeket a React számára. Az adatbázisból származó `id` az adott zenekarhoz kötődik; a sorszám viszont változhat, ha elemeket szúrunk be, törlünk vagy rendezünk.

**7. feladat:** Például `new Date().getFullYear()`. Ez a program futásakor az aktuális év számát adja, ezért későbbi években sem kell kézzel átírni a fix évszámot.

**8. feladat:** Lehetséges ellenőrzések:

- A kérés a megfelelő backend URL-re és `POST` metódussal ment-e?
- A böngésző fejlesztői eszközének Network lapján milyen HTTP-státusz és válasz látható?
- A válasz sikeres (`response.ok`) volt-e?
- Meghívódik-e az `onSuccess` a sikeres válasz után?
- Az `App` valóban `zenekarok` értékre állítja-e a `currentView`-t?
- Fut-e a backend, és minden kötelező mező megérkezik-e?

## Rövid összefoglaló

- A React-felület kis komponensekből áll.
- A **prop** szülőtől érkezik; a **state** a komponens által kezelt, változó adat.
- A `useState` állapotot hoz létre, az állapotmódosító pedig újrarenderelést eredményezhet.
- A `useEffect` például adatlekérés indítására használható.
- A `fetch` HTTP-kérést küld; a Promise-lánc vagy az `async`/`await` kezeli a később érkező választ.
- A JSX-ben JavaScript-kifejezésekkel lehet feltételesen tartalmat megjeleníteni.
- A `key` segíti a Reactet a listaelemek követésében.
- A kliensoldali űrlapellenőrzés kényelmi segítség, nem helyettesíti a backend validációját.
