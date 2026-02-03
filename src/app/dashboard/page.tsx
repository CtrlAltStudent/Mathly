import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  const displayName = session?.user?.name || session?.user?.email || "Użytkownik";

  const cards = [
    {
      title: "Materiały",
      description: "Teoria i przykłady dopasowane do Twojej klasy",
      href: "/dashboard/materialy",
      comingSoon: false,
    },
    {
      title: "Zadania",
      description: "Ćwicz z zadaniami z rozwiązaniami krok po kroku",
      href: "/dashboard/zadania",
      comingSoon: false,
    },
    {
      title: "Umów lekcję",
      description: "Zarezerwuj indywidualną lekcję online",
      href: "/dashboard/lekcje",
      comingSoon: false,
    },
    {
      title: "Tablica",
      description: "Rysuj i rozwiązuj zadania na tablicy",
      href: "/dashboard/tablica",
      comingSoon: false,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">
        Cześć, {displayName}! 👋
      </h1>
      <p className="mt-1 text-slate-600">
        Wybierz, co chcesz zrobić dziś
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.comingSoon ? "#" : card.href}
            className={`block rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
              card.comingSoon
                ? "cursor-not-allowed opacity-75"
                : "border-slate-200 hover:border-mathly-200"
            }`}
          >
            <h2 className="font-semibold text-slate-800">{card.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{card.description}</p>
            {card.comingSoon && (
              <span className="mt-3 inline-block text-xs font-medium text-amber-600">
                Wkrótce
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-mathly-100 bg-mathly-50 p-6">
        <h3 className="font-semibold text-mathly-900">Wskazówka</h3>
        <p className="mt-1 text-sm text-mathly-700">
          Materiały i zadania będą dopasowane do Twojej klasy (6–8 SP lub
          matura). Wybierz swoją klasę w ustawieniach profilu, gdy funkcja będzie
          dostępna.
        </p>
      </div>
    </div>
  );
}
