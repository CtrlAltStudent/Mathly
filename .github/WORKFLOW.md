# Praca z gałęziami (branching)

Projekt używa flow opartego na gałęziach funkcjonalnych:

- **main** – stabilna wersja, gotowa do wdrożenia
- **feature/nazwa** – nowe funkcjonalności (np. `feature/dashboard`, `feature/materialy`)

## Etapy pracy

1. Przełącz się na gałąź dla danej funkcji:
   ```bash
   git checkout -b feature/nazwa-funkcji
   ```

2. Wprowadź zmiany, commituj etapami:
   ```bash
   git add .
   git commit -m "feat: opis zmiany"
   ```

3. Po zakończeniu pracy zlej z main:
   ```bash
   git checkout main
   git merge feature/nazwa-funkcji
   ```

4. Usuń gałąź (opcjonalnie):
   ```bash
   git branch -d feature/nazwa-funkcji
   ```

## Przykładowe gałęzie

- `feature/dashboard` – panel użytkownika po zalogowaniu
- `feature/materialy` – sekcja materiałów edukacyjnych
- `feature/zadania` – zadania z rozwiązaniami
- `feature/lekcje` – rezerwacja lekcji
- `feature/tablica` – tablica typu Miro
