💸 GestioneFinanziaria – README
Un’applicazione web full stack per la gestione avanzata delle spese personali: categorie, budget mensili, grafici e report CSV, con autenticazione e database gestiti tramite Supabase.

✨ Funzionalità principali
🔐 Autenticazione utente

Registrazione e login con email e password.

Ogni utente vede solo le proprie spese (RLS su Supabase).

🧾 Gestione spese

Aggiunta di spese con:

Categoria (es. Cibo, Trasporti, Svago…)

Importo

Data

Descrizione

Modifica ed eliminazione delle spese.

Filtro per mese/anno (es. 2026-02).
​
​

🧩 Categorie

Tabelle categorie predefinite (Cibo, Trasporti, Svago, ecc.).

Possibile estensione per categorie personalizzate per utente.
​
​

🎯 Budget mensili

Impostazione di un budget per categoria e mese.

Calcolo automatico di:

Totale speso per categoria.

Differenza rispetto al budget.

Evidenziazione in rosso quando il budget è superato.
​
​

📊 Dashboard con grafici

Grafico a torta delle spese per categoria (Chart.js).

Grafico a barre/linea per andamento mensile delle spese.

Dashboard responsive, ottimizzata per mobile.
​
​

📎 Report e export

Esportazione delle spese in CSV per un mese selezionato.

Endpoint dedicato tipo GET /report.csv?month=YYYY-MM.
​
​

⚡ Realtime (opzionale)

Aggiornamento in tempo reale delle spese tramite Supabase Realtime.
​
​

📲 PWA (base) (opzionale)

Manifest + service worker per visualizzare le spese anche offline (sola lettura).
​

🏗️ Stack tecnologico
Frontend

HTML5

CSS3 (mobile-first, CSS Grid, variabili CSS per tema)

JavaScript vanilla (Fetch API, localStorage)

Chart.js via CDN
​
​

Backend

Node.js

Express

TypeScript

ts-node / compilazione in JS

CORS, Helmet, middleware custom per auth
​
​

Database / Auth

Supabase (PostgreSQL + Auth)

Tabelle: categories, expenses, budgets

Row Level Security (RLS) attivata sulle tabelle utente-dipendenti
​
​

📁 Struttura del progetto
text
GestioneFinanziaria/
  backend/
    src/
      routes/
        auth.ts
        expenses.ts
        stats.ts
        budgets.ts
      middlewares/
        auth.ts
      services/
        expensesService.ts
        budgetsService.ts
        statsService.ts
      config/
        supabase.ts
        env.ts
      index.ts
    .env
    tsconfig.json
    package.json

  frontend/
    src/
      index.html
      css/
        styles.css
      js/
        app.js
        auth.js
        expenses.js
        charts.js
        budget.js
    package.json (opzionale)

  .gitignore
  README.md
🧩 Prerequisiti
Node.js LTS installato (es. 18+)

NPM o Yarn

Account Supabase attivo

Git + repository GitHub

(Per frontend) qualsiasi server statico oppure estensione Live Server di VS Code
​
​

🗄️ Configurazione Supabase
Vai su supabase.com e crea un nuovo progetto (es. gestione-finanziaria).
​
​

Dal Dashboard:

Recupera SUPABASE_URL e SUPABASE_ANON_KEY.
​
​

Crea le tabelle nel SQL Editor:

sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  category_id INTEGER REFERENCES categories(id) NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  description TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE budgets (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  category_id INTEGER REFERENCES categories(id) NOT NULL,
  month TEXT NOT NULL, -- formattato come 'YYYY-MM'
  amount NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
​
​

Inserisci categorie seed:

sql
INSERT INTO categories (name)
VALUES ('Cibo'), ('Trasporti'), ('Svago');
​

Abilita RLS su expenses e budgets:

sql
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_expenses ON expenses
FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY user_budgets ON budgets
FOR ALL
USING (auth.uid() = user_id);
​
​

🔧 Setup backend (GestioneFinanziaria)
Da root del progetto:

bash
cd backend
npm install
Se la package.json non è inizializzata:

bash
npm init -y
npm install express @supabase/supabase-js dotenv cors helmet
npm install -D typescript ts-node @types/node @types/express
npx tsc --init
🔐 Variabili di ambiente
Crea backend/.env:

text
SUPABASE_URL=LA_TUA_SUPABASE_URL
SUPABASE_ANON_KEY=LA_TUA_ANON_KEY
PORT=3001
▶️ Avvio in sviluppo
bash
cd backend
npm run dev
Backend disponibile su:
http://localhost:3001
​

🎨 Setup frontend (GestioneFinanziaria)
Da root:

bash
cd frontend
Puoi:

Usare Live Server aprendo src/index.html, oppure

Usare un server statico:

bash
npx serve src -l 3000
Frontend disponibile su:
http://localhost:3000
​
​

Assicurati che il backend permetta CORS da http://localhost:3000.
​

🔐 Flusso di utilizzo dell’app
1️⃣ Registrazione
Apri http://localhost:3000.

Vai alla sezione Register di GestioneFinanziaria.

Inserisci email e password.

Il frontend chiama POST /auth/register → il backend usa Supabase Auth per creare l’utente.
​
​

2️⃣ Login
Vai alla sezione Login.

Inserisci credenziali.

Il backend risponde con un token di sessione (es. access token Supabase o JWT).

Il token viene salvato in localStorage e usato nelle richieste successive (header Authorization: Bearer <token>).
​
​

3️⃣ Aggiungere una spesa
Nella dashboard di GestioneFinanziaria compila:

Categoria

Importo

Data

Descrizione

Clicca Aggiungi.

Il frontend invia POST /expenses.

Il backend valida il token e inserisce la riga nella tabella expenses su Supabase.
​
​

4️⃣ Modificare/eliminare una spesa
Ogni riga ha:

✏️ Modifica → PUT /expenses/:id

🗑️ Elimina → DELETE /expenses/:id

L’interfaccia aggiorna tabella e grafici dopo l’operazione.
​
​

5️⃣ Impostare i budget
Sezione Budget.

Scegli categoria, mese (YYYY-MM) e importo massimo.

Invio → POST /budgets.

Dashboard mostra budget, speso e differenza, con stato rosso se superi il limite.
​
​

6️⃣ Visualizzare grafici
Pie chart spese per categoria (dati da /stats).

Bar/line chart per andamento mensile.

Implementati con Chart.js e aggiornati quando cambiano spese/budget.
​
​

📤 Esportazione CSV
Endpoint: GET /report.csv?month=YYYY-MM.

Il CSV contiene data, categoria, importo, descrizione.

Il frontend fa il download del file per analisi in Excel/Google Sheets.
​
​

🔄 Realtime (opzionale)
Attiva Supabase Realtime sulla tabella expenses.

Il frontend sottoscrive gli eventi e aggiorna la lista spese e i grafici in tempo reale.
​
​

🌐 PWA (opzionale)
Aggiungi manifest.json e service-worker.js nel frontend.

Possibilità di aggiungere GestioneFinanziaria alla home e consultare alcune viste offline.
​

🌱 Script utili (esempio)
Backend package.json
json
{
  "name": "gestione-finanziaria-backend",
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
Frontend package.json (se usato)
json
{
  "name": "gestione-finanziaria-frontend",
  "scripts": {
    "dev": "serve src -l 3000"
  }
}
🌿 Git e branching
Branch principale: main per GestioneFinanziaria.

Per ogni funzionalità:

git checkout -b feature/nome-feature

Sviluppo + test

git commit con messaggi chiari

git push -u origin feature/nome-feature

Pull Request verso main su GitHub
​

Esempi:

feature/auth

feature/expenses-crud

feature/budget-tracking

feature/charts-dashboard

✅ Stato atteso per un MVP GestioneFinanziaria
Per considerare GestioneFinanziaria MVP pronto:

Login / Register funzionanti.

CRUD spese per utente con RLS.

Almeno 3 categorie base.

Budget per categoria/mese.

Grafico spese per categoria.

Export CSV per mese.

README aggiornato con nome GestioneFinanziaria.

Deploy (es. backend su Vercel/Netlify, frontend su Netlify, Supabase come DB).
​
