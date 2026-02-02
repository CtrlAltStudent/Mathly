# Mathly

Platforma korepetycji matematycznych dla uczniów klas 6–8 podstawówki oraz maturzystów.

## Tech stack

- **React** (Next.js 16)
- **TypeScript**
- **PostgreSQL** + Prisma ORM
- **NextAuth.js** (panel logowania)
- **Tailwind CSS**

## Wymagania

- Node.js 20+
- PostgreSQL (lokalnie lub na Hostingerze)

## Konfiguracja

1. Sklonuj repozytorium i zainstaluj zależności:

   ```bash
   npm install
   ```

2. Skopiuj plik zmiennych środowiskowych:

   ```bash
   cp .env.example .env
   ```

3. Uzupełnij `.env`:

   - `DATABASE_URL` – connection string do PostgreSQL (np. od Hostingera)
   - `AUTH_SECRET` – wygeneruj: `npx auth secret`
   - `AUTH_URL` – np. `https://mathly.pl` (produkcja) lub `http://localhost:3000` (dev)

4. Utwórz tabele w bazie i uruchom seed:

   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. Uruchom aplikację:

   ```bash
   npm run dev
   ```

## Skrypty

| Skrypt        | Opis                        |
|---------------|-----------------------------|
| `npm run dev` | Serwer deweloperski         |
| `npm run build` | Build produkcyjny         |
| `npm run start` | Start produkcyjny          |
| `npm run db:push` | Synchronizacja schematu z DB |
| `npm run db:seed` | Seed (admin@mathly.pl / Admin123!) |
| `npm run db:studio` | Prisma Studio (GUI bazy) |

