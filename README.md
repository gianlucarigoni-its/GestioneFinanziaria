# 💸 GestioneFinanziaria – README

Un’applicazione web full stack per la gestione avanzata delle spese personali: categorie, budget mensili, grafici e report CSV, con autenticazione e database gestiti tramite Supabase.

---

## ✨ Funzionalità principali

- 🔐 **Autenticazione utente**  
  - Registrazione e login con email e password.  
  - Ogni utente vede solo le proprie spese (Row Level Security su Supabase).

- 🧾 **Gestione spese**  
  - Aggiunta di spese con:
    - Categoria (es. Cibo, Trasporti, Svago…)  
    - Importo  
    - Data  
    - Descrizione  
  - Modifica ed eliminazione delle spese.  
  - Filtro per mese/anno (es. `2026-02`).

- 🧩 **Categorie**  
  - Tabelle categorie predefinite (Cibo, Trasporti, Svago, ecc.).  
  - Possibile estensione per categorie personalizzate per utente.

- 🎯 **Budget mensili**  
  - Impostazione di un budget per categoria e mese.  
  - Calcolo automatico di:
    - Totale speso per categoria.  
    - Differenza rispetto al budget.  
  - Evidenziazione in rosso quando il budget è superato.

- 📊 **Dashboard con grafici**  
  - Grafico a torta delle spese per categoria (Chart.js).  
  - Grafico a barre/linea per andamento mensile delle spese.  
  - Dashboard responsive, ottimizzata per mobile.

- 📎 **Report e export**  
  - Esportazione delle spese in CSV per un mese selezionato.  
  - Endpoint dedicato tipo `GET /report.csv?month=YYYY-MM`.

- ⚡ **Realtime (opzionale)**  
  - Aggiornamento in tempo reale delle spese tramite Supabase Realtime.

- 📲 **PWA (base) (opzionale)**  
  - Manifest + service worker per visualizzare le spese anche offline (sola lettura).

---

## 🏗️ Stack tecnologico

- **Frontend**
  - HTML5  
  - CSS3 (mobile-first, CSS Grid, variabili CSS per tema)  
  - JavaScript vanilla (Fetch API, `localStorage`)  
  - Chart.js via CDN

- **Backend**
  - Node.js  
  - Express  
  - TypeScript  
  - ts-node / compilazione in JS  
  - CORS, Helmet, middleware custom per auth

- **Database / Auth**
  - Supabase (PostgreSQL + Auth)

---

## 📁 Struttura del progetto

```text
GestioneFinanziaria/
  backend/
    src/
      routes/
      middlewares/
      config/
      index.ts
    .env
    tsconfig.json
    package.json

  frontend/
    src/
      index.html
      css/
      js/
    .gitignore
  README.md


