/**
 * Stałe sloty tygodniowe (dzień tygodnia 0=nedziela, 2=wtorek, 6=sobota)
 * Format: [dzień, godzina, minuty, długość w minutach]
 */
const WEEKLY_SLOTS: [number, number, number, number][] = [
  [2, 17, 0, 60], // wtorek 17:00, 60 min
  [6, 10, 0, 60], // sobota 10:00, 60 min
];

/**
 * Zwraca dostępne daty dla kolejnych N tygodni
 */
export function getAvailableSlotDates(weeksAhead = 4): Date[] {
  const dates: Date[] = [];
  const now = new Date();

  for (let w = 0; w < weeksAhead; w++) {
    for (const [weekday, hour, minute, durationMinutes] of WEEKLY_SLOTS) {
      const d = new Date(now);
      d.setDate(d.getDate() + w * 7);
      const currentWeekday = d.getDay();
      const daysToAdd = (weekday - currentWeekday + 7) % 7;
      d.setDate(d.getDate() + daysToAdd);
      d.setHours(hour, minute, 0, 0);

      if (d > now) {
        dates.push(d);
      }
    }
  }

  return dates.sort((a, b) => a.getTime() - b.getTime());
}

export function getSlotEnd(start: Date, durationMinutes: number): Date {
  const end = new Date(start);
  end.setMinutes(end.getMinutes() + durationMinutes);
  return end;
}

export const SLOT_DURATION = 60;
