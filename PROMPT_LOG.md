# Prompt Előzmények & Fejlesztési Napló

> **Megjegyzés az értékelőknek / Note for reviewers:**
> Míg a hivatalos technikai dokumentáció (AsciiDoc), a Jira jegyek és a forráskód teljes egészében angol nyelven készülnek, ez a prompt napló és a belső gondolatmenet rögzítése magyar nyelven fut a gyorsabb iteráció és a transzparens döntéshozatal érdekében.

---

## 🗺️ 0. Mérföldkő: Technológiai Stack & Monorepo Inicializálás

### 🤖 Prompt #1

> Általam ismer technológiák react, nestjs, springboot, angular. A legtöbbet használt technológia az angular és a springboot de úgy érzem az overenginering lenne, mit ajánlasz stacknek a fentebb csatolt dokumentáció alapján?

### 🔍 AI Válasz Kiértékelése & Korrekció

- **Mi volt jó:** Az AI megerősítette a megérítésemet, hogy a Spring Boot túl nehézkes lenne egy ilyen gyors prototípushoz. Helyette a NestJS + Angular párost javasolta, kiemelve a közös TypeScript nyelvet és az analóg építőelemeket.
- **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:** (Ide írd le, ha a Gemini az első válaszában pl. túlkomplikálta az adatbázis választást, vagy ha javasolt valami olyat, amit te egyből elvetettél.)
- **Következő lépés:** A monorepo struktúra pontos meghatározása.

---

### 🤖 Prompt #2

> dolgozzuk ki egy angular, nestjs projekt felépítést, ahol monorepo lesz backend, frontend, docs almapákkal, feature-based struktúrát követve, tailwindcss-el, és github jegyeket mérföldkövenkénti bontással

### 🔍 AI Válasz Kiértékelése & Korrekció

- **Mi volt jó:** Logikus, átlátható könyvtárstruktúrát generált. Külön tetszett, hogy a feature-alapú felosztást követte mindkét oldalon (pl. alert konfiguráció, adminisztráció külön modulokban).
- **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:** (Pl. "Az AI egy nehézkes Nx Monorepo setupot akart behozni, de ezt elutasítottam az időkeret miatt. Maradtunk a manuális, egyszerűbb almappás monorepo felépítésnél.")
- **Következő lépés:** Az inicializáló parancsok (init) generálása és a fájlok létrehozása.

---

### 🤖 Prompt #3

> Kezdjük el a fent generált első projektet initjeit és struktárát is dolgozzk ki mind frontend és backend szinten, valamint a docs alatt hozzuk létre egy architecture-decision-log.md filet

### 🔍 AI Válasz Kiértékelése & Korrekció

- **Mi volt jó:** Megadta a pontos CLI parancsokat a NestJS és Angular projektek létrehozásához, és felvázolta az architecture-decision-log.md alapjait.
- **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:** (Pl. "Az Angular initnél kihagyta az SSR kikapcsolását, ezt manuálisan javítottam, mert felesleges a projekthez. A NestJS-nél ellenőriztem, hogy a felesleges spec fájlokat ne generálja le.")
- **Következő lépés:** A projektek tényleges legenerálása lokálisan, az első Git commit végrehajtása, és továbblépés az adatmodell (Milestone 1).

---

## 🗺️ 1. Mérföldkő: Core Alerting Engine & Flexible Channel Architecture

### 🤖 Prompt #4

> Design Domain Schema for Alert Rules and Events feladat kidolgozását kezdjük el

### 🔍 AI Válasz Kiértékelése & Korrekció

- **Mi volt jó:** Legenerálta az interfaceket és a service-t.
- **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:** Any-vel generálta le először az interface-k property-t, így javítattam vele azt.
- **Következő lépés:** Generált kód tesztelése átnézése commit előtt, aztán Implement Extensible Notification Strategy Pattern feladat elkezdése

---

### 🤖 Prompt #5

> Implement Extensible Notification Strategy kidolgozását kezdjük el

### 🔍 AI Válasz Kiértékelése & Korrekció

- **Mi volt jó:** Legenerálta a core engine-t és az interfaceket, moduleba bekötötte.
- **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:**
- **Következő lépés:** Generált kód tesztelése átnézése commit előtt, aztán Implement Email and Slack Providers feladat elkezdése

---

### 🤖 Prompt #6

> Implement Email and Slack Providers kidolgozását kezdjük el

### 🔍 AI Válasz Kiértékelése & Korrekció

- **Mi volt jó:** Legenerálta a strategy file-kat.
- **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:** Bekötöttem a moduleba a strategy-ket.
- **Következő lépés:** Generált kód tesztelése átnézése commit előtt, aztán Create Mock Event Ingestion Endpoint feladat elkezdése

---

### 🤖 Prompt #7

> Create Mock Event Ingestion Endpoint kidolgozását kezdjük el

### 🔍 AI Válasz Kiértékelése & Korrekció

- **Mi volt jó:** Legenerálta a dto és controller file-t.
- **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:** injectálni akarta a controllerben a repository-kat, ami angular-ban valid, de nestjs továbbra is constructor-t használ, így javítottam
- **Következő lépés:** Generált kód tesztelése átnézése commit előtt, aztán Mérföldkő 2 elkezdése

---

## 🗺️ 2. Mérföldkő: User View – Alert Management Dashboard

### 🤖 Prompt #7

> Create Angular Feature Module for Alert Configuration kidolgozását kezdjük el

### 🔍 AI Válasz Kiértékelése & Korrekció

- **Mi volt jó:** Interface, service és routing generálás.
- **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:** signalok használata behaviorSubject helyett, kódegyszerűsítés
- **Következő lépés:** Generált kód tesztelése átnézése commit előtt, aztán Develop Reactive Alert Builder Form
  feladat elkezdése

---

### 🤖 Prompt #8

> Develop Reactive Alert Builder Form & Workspace kidolgozását kezdjük el

### 🔍 AI Válasz Kiértékelése & Korrekció

- **Mi volt jó:** Form implementáció.
- **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:** sima css-el csinálta először aztán tailwindre átalakítattam vele
- **Következő lépés:** Generált kód tesztelése átnézése commit előtt, aztán routingolás megvalósítása

---

### 🤖 Prompt #9

> Lazy loading kialakítás, admin-platform-ra is felkészítés, app komponens átalakítás felkészítás a routingolásra

### 🔍 AI Válasz Kiértékelése & Korrekció

- **Mi volt jó:** Routing és frame kialakítás.
- **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:** routing kiegészítés, hiba elhárítások
- **Következő lépés:** Generált kód tesztelése átnézése commit előtt, aztán Implement User Alert List View elkezdése

---

### 🤖 Prompt #10

> Implement User Alert List View
> kidolgozását kezdjük el

### 🔍 AI Válasz Kiértékelése & Korrekció

- **Mi volt jó:** Listázó implementáció és workspace átalakítás.
- **Amit ELUTASÍTOTTAM / JAVÍTOTTAM:**
- **Következő lépés:** Generált kód tesztelése átnézése commit előtt, aztán 3-mas mérföldkő elkezdése

---
