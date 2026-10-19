# Prompt Előzmények & Fejlesztési Napló

> **Megjegyzés az értékelőknek / Note for reviewers:** 
> Míg a hivatalos technikai dokumentáció (AsciiDoc), a Jira jegyek és a forráskód teljes egészében angol nyelven készülnek, ez a prompt napló és a belső gondolatmenet rögzítése magyar nyelven fut a gyorsabb iteráció és a transzparens döntéshozatal érdekében.

---

## 🗺️ 0. Mérföldkő: Technológiai Stack & Monorepo Inicializálás

### 🤖 Prompt #1
> Általam ismer technológiák react, nestjs, springboot, angular. A legtöbbet használt technológia az angular és a springboot de úgy érzem az overenginering lenne, mit ajánlasz stacknek a fentebb csatolt dokumentáció alapján?

### 🔍 AI Válasz Kiértékelése & Korrekció
* **Mi volt jó:** Az AI megerősítette a megérítésemet, hogy a Spring Boot túl nehézkes lenne egy ilyen gyors prototípushoz. Helyette a NestJS + Angular párost javasolta, kiemelve a közös TypeScript nyelvet és az analóg építőelemeket.
* **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:** (Ide írd le, ha a Gemini az első válaszában pl. túlkomplikálta az adatbázis választást, vagy ha javasolt valami olyat, amit te egyből elvetettél.)
* **Következő lépés:** A monorepo struktúra pontos meghatározása.

---

### 🤖 Prompt #2
> dolgozzuk ki egy angular, nestjs projekt felépítést, ahol monorepo lesz backend, frontend, docs almapákkal, feature-based struktúrát követve, tailwindcss-el, és github jegyeket mérföldkövenkénti bontással

### 🔍 AI Válasz Kiértékelése & Korrekció
* **Mi volt jó:** Logikus, átlátható könyvtárstruktúrát generált. Külön tetszett, hogy a feature-alapú felosztást követte mindkét oldalon (pl. alert konfiguráció, adminisztráció külön modulokban).
* **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:** (Pl. "Az AI egy nehézkes Nx Monorepo setupot akart behozni, de ezt elutasítottam az időkeret miatt. Maradtunk a manuális, egyszerűbb almappás monorepo felépítésnél.")
* **Következő lépés:** Az inicializáló parancsok (init) generálása és a fájlok létrehozása.

---

### 🤖 Prompt #3
> Kezdjük el a fent generált első projektet initjeit és struktárát is dolgozzk ki mind frontend és backend szinten, valamint a docs alatt hozzuk létre egy architecture-decision-log.md filet

### 🔍 AI Válasz Kiértékelése & Korrekció
* **Mi volt jó:** Megadta a pontos CLI parancsokat a NestJS és Angular projektek létrehozásához, és felvázolta az architecture-decision-log.md alapjait.
* **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:** (Pl. "Az Angular initnél kihagyta az SSR kikapcsolását, ezt manuálisan javítottam, mert felesleges a projekthez. A NestJS-nél ellenőriztem, hogy a felesleges spec fájlokat ne generálja le.")
* **Következő lépés:** A projektek tényleges legenerálása lokálisan, az első Git commit végrehajtása, és továbblépés az adatmodell tervezésére (Milestone 1).
