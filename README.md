# 🍽️ Recipe Book API

A production-ready RESTful API for managing recipes, steps, and ingredients — built with **Node.js**, **Express**, **Knex.js**, and **SQLite3**. Designed around a normalized relational data model with a complex Many-to-Many relationship structure, delivering deeply nested JSON responses through multi-table SQL joins and JavaScript data transformation.

---

## 🚀 What This Project Does

Given a recipe ID, the API returns a fully nested recipe object containing:

- Recipe metadata (name, creation date)
- An ordered list of steps
- Each step's ingredients with exact quantities

```json
{
  "tarif_id": 2,
  "tarif_adi": "Lahmacun",
  "kayit_tarihi": "2026-06-11 10:52:50",
  "adimlar": [
    {
      "adim_id": 3,
      "adim_sirasi": 1,
      "adim_talimati": "300gr kıymayı soğan ve baharatla karıştırın",
      "icindekiler": [
        { "icindekiler_id": 1, "icindekiler_adi": "Kıyma", "miktar": 300 },
        { "icindekiler_id": 2, "icindekiler_adi": "Soğan", "miktar": 100 }
      ]
    }
  ]
}
```

---

## 🛠️ Tech Stack

| Technology   | Purpose                                 |
| ------------ | --------------------------------------- |
| Node.js      | Runtime environment                     |
| Express.js   | Web framework & routing                 |
| SQLite3      | Relational database                     |
| Knex.js      | Query builder, migrations & seeds       |
| knex-cleaner | Safe database cleanup between seed runs |
| dotenv       | Environment variable management         |
| Nodemon      | Development auto-reload                 |

---

## 🗄️ Database Design

### Why 4 Tables?

The core challenge of this project was designing a normalized schema that avoids data redundancy while supporting flexible ingredient reuse across different recipes and steps.

The key insight: **an ingredient's quantity is not a property of the ingredient itself — it's a property of the relationship between a step and an ingredient.** This led to the junction table `adim_icindekiler`, which holds the `miktar` (quantity) field.

### Schema

```
tarifler (recipes)
    │
    │ ONE-TO-MANY
    ▼
adimlar (steps)
    │
    │ MANY-TO-MANY (via junction table)
    ▼
adim_icindekiler ◄──── icindekiler (ingredients)
  (junction table)
```

### Tables

#### `tarifler` — Recipes

| Column       | Type         | Constraints                 |
| ------------ | ------------ | --------------------------- |
| id           | integer      | PRIMARY KEY, AUTO INCREMENT |
| tarif_adi    | varchar(128) | NOT NULL, UNIQUE            |
| kayit_tarihi | timestamp    | DEFAULT now()               |

#### `adimlar` — Steps

| Column        | Type         | Constraints                 |
| ------------- | ------------ | --------------------------- |
| id            | integer      | PRIMARY KEY, AUTO INCREMENT |
| adim_sirasi   | integer      | NOT NULL                    |
| adim_talimati | varchar(255) | NOT NULL                    |
| tarif_id      | integer      | NOT NULL, FK → tarifler.id  |

#### `icindekiler` — Ingredients

| Column          | Type         | Constraints                 |
| --------------- | ------------ | --------------------------- |
| id              | integer      | PRIMARY KEY, AUTO INCREMENT |
| icindekiler_adi | varchar(255) | NOT NULL                    |

#### `adim_icindekiler` — Step-Ingredient Junction

| Column         | Type    | Constraints                           |
| -------------- | ------- | ------------------------------------- |
| adim_id        | integer | NOT NULL, FK → adimlar.id             |
| icindekiler_id | integer | NOT NULL, FK → icindekiler.id         |
| miktar         | float   | NOT NULL                              |
| —              | —       | PRIMARY KEY (adim_id, icindekiler_id) |

> The junction table uses a **composite primary key** on `(adim_id, icindekiler_id)`, preventing the same ingredient from being added to the same step twice.

---

## 📡 API Endpoints

| Method | Endpoint                  | Description                                        |
| ------ | ------------------------- | -------------------------------------------------- |
| GET    | `/api/tarifler/:tarif_id` | Get a full recipe by ID with steps and ingredients |

### Response Example

`GET /api/tarifler/1`

```json
{
  "tarif_id": 1,
  "tarif_adi": "Adana Kebap",
  "kayit_tarihi": "2026-06-11 10:52:50",
  "adimlar": [
    {
      "adim_id": 1,
      "adim_sirasi": 1,
      "adim_talimati": "500gr kıymayı yoğurun",
      "icindekiler": [
        { "icindekiler_id": 1, "icindekiler_adi": "Kıyma", "miktar": 500 },
        { "icindekiler_id": 7, "icindekiler_adi": "Baharat", "miktar": 10 }
      ]
    },
    {
      "adim_id": 2,
      "adim_sirasi": 2,
      "adim_talimati": "Şişe geçirip ızgaraya koyun",
      "icindekiler": []
    }
  ]
}
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js v18+
- npm

### Steps

**1. Clone the repository**

```bash
git clone https://github.com/mertkaya20/fsweb-s14g4-node-db-project-4.git
cd fsweb-s14g4-node-db-project-4
```

**2. Install dependencies**

```bash
npm install
```

**3. Create environment file**

```bash
# Create a .env file in the root directory
PORT=5000
NODE_ENV=development
```

**4. Run database migrations**

```bash
knex migrate:latest
```

**5. Seed the database**

```bash
knex seed:run
```

**6. Start the development server**

```bash
npm run dev
```

The API will be running at `http://localhost:5000`

---

## 🏗️ Architecture & Key Decisions

### Feature-based Folder Structure

All files related to a resource (router, model, middleware) live in the same folder under `api/`. This makes the codebase easy to navigate and scale.

### Single Query, JavaScript Transformation

Rather than making multiple database round-trips, the `idyeGoreTarifGetir` function performs a **single 4-table JOIN** query and transforms the flat result set into a nested object using `forEach` and `Array.find()`. This is both performant and readable.

### LEFT JOIN for Optional Ingredients

Steps without ingredients are still returned — with an empty `icindekiler: []` array. This is achieved by using `LEFT JOIN` on the junction table, ensuring no data is silently dropped.

### SQLite Foreign Key Enforcement

SQLite does not enforce foreign key constraints by default. The `knexfile.js` uses the `pool.afterCreate` hook to run `PRAGMA foreign_keys = ON` on every connection, ensuring `ON DELETE CASCADE` works correctly.

### Composite Primary Key on Junction Table

The `adim_icindekiler` table uses a composite primary key `(adim_id, icindekiler_id)` instead of a surrogate `id` column — a deliberate design choice since the table has no independent identity beyond its relationship between two entities.

---

## 📁 Project Structure

```
fsweb-s14g4-node-db-project-4/
├── api/
│   ├── tarifler/
│   │   ├── tarifler-router.js      # Express router
│   │   ├── tarifler-model.js       # Database queries & data transformation
│   │   └── tarifler-middleware.js  # Request validation
│   └── server.js                   # Express app configuration
├── data/
│   ├── migrations/                 # Database schema
│   ├── seeds/                      # Test data
│   └── db-config.js                # Knex connection
├── .env                            # Environment variables (not committed)
├── .gitignore
├── index.js                        # Server entry point
├── knexfile.js                     # Knex configuration
└── package.json
```

---

## 🌱 Environment Variables

| Variable   | Description                          | Default       |
| ---------- | ------------------------------------ | ------------- |
| `PORT`     | Port the server listens on           | `5000`        |
| `NODE_ENV` | Environment (development/production) | `development` |

---

## 📬 Contact

**Mert Kaya**

[![GitHub](https://img.shields.io/badge/GitHub-mertkaya20-181717?style=flat&logo=github)](https://github.com/mertkaya20)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-merttkaya20-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/merttkaya20/)

---

_Built as part of a Full Stack Bootcamp — Workintech_
