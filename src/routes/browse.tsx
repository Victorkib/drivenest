import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  Filter,
  MapPin,
  Menu,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { CATEGORIES, formatKes, VEHICLES, type Category, type Vehicle } from "@/lib/fleet";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse cars | DriveNest" },
      {
        name: "description",
        content:
          "Compare verified self-drive and chauffeured car hire in Nairobi and across Kenya.",
      },
    ],
  }),
  component: Browse,
});

type Sort = "recommended" | "price-low" | "price-high";

function Browse() {
  const [mode, setMode] = useState<"self" | "chauffeured">("self");
  const [categories, setCategories] = useState<Category[]>(["Medium car"]);
  const [seats, setSeats] = useState<"any" | "2+" | "5+" | "7+">("any");
  const [sort, setSort] = useState<Sort>("recommended");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [showFilters, setShowFilters] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const filteredVehicles = useMemo(() => {
    const result = VEHICLES.filter((vehicle) => {
      const categoryMatch = categories.length === 0 || categories.includes(vehicle.category);
      const seatsMatch = seats === "any" || vehicle.seats >= Number(seats.replace("+", ""));
      return categoryMatch && seatsMatch && vehicle.price <= maxPrice;
    });
    return [...result].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return a.price - b.price;
    });
  }, [categories, maxPrice, seats, sort]);

  const clearFilters = () => {
    setCategories([]);
    setSeats("any");
    setMaxPrice(50000);
    setSort("recommended");
  };

  const toggleCategory = (category: Category) => {
    setCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  return (
    <div className="min-h-screen bg-muted/30 text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="font-display text-2xl font-extrabold tracking-tight text-foreground"
          >
            drivenest
          </Link>
          <div className="hidden flex-1 justify-center lg:flex">
            <div className="flex items-center rounded-full border border-border bg-card p-1 text-xs shadow-soft">
              <button
                type="button"
                onClick={() => setMode("self")}
                className={`rounded-full px-4 py-2 font-semibold ${mode === "self" ? "bg-foreground text-background" : "text-muted-foreground"}`}
              >
                Self drive
              </button>
              <button
                type="button"
                onClick={() => setMode("chauffeured")}
                className={`rounded-full px-4 py-2 font-semibold ${mode === "chauffeured" ? "bg-foreground text-background" : "text-muted-foreground"}`}
              >
                Chauffeured
              </button>
              <span className="mx-1 h-5 w-px bg-border" />
              <span className="flex items-center gap-2 px-4 text-muted-foreground">
                <MapPin className="size-3.5 text-primary" /> Nairobi
              </span>
              <span className="mx-1 h-5 w-px bg-border" />
              <span className="flex items-center gap-2 px-4 text-muted-foreground">
                <CalendarDays className="size-3.5 text-primary" /> Any dates
              </span>
              <button
                type="button"
                aria-label="Search"
                className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Search className="size-4" />
              </button>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a
              href="#support"
              className="hidden text-xs font-semibold text-muted-foreground hover:text-foreground sm:block"
            >
              Become an Operator
            </a>
            <span className="flex size-9 items-center justify-center rounded-full border border-border text-[11px] font-semibold">
              KSh
            </span>
            <button
              type="button"
              aria-label="Open menu"
              className="flex size-9 items-center justify-center rounded-full border border-border"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden sm:px-6">
          <button
            type="button"
            onClick={() => setMode("self")}
            className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold ${mode === "self" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}
          >
            Self drive
          </button>
          <button
            type="button"
            onClick={() => setMode("chauffeured")}
            className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold ${mode === "chauffeured" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}
          >
            Chauffeured
          </button>
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
            <MapPin className="size-3 text-primary" /> Nairobi
          </span>
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
            <CalendarDays className="size-3 text-primary" /> Any dates
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
        <div className="mb-5 flex items-center justify-between lg:hidden">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredVehicles.length} cars</span>{" "}
            available in Nairobi
          </p>
          <button
            type="button"
            onClick={() => setShowFilters((open) => !open)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold"
          >
            <SlidersHorizontal className="size-3.5" /> Filters
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-6">
          <aside
            className={`${showFilters ? "block" : "hidden"} rounded-2xl border border-border bg-card p-4 shadow-soft lg:sticky lg:top-28 lg:block lg:h-fit`}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold">Filters</h2>
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-primary"
              >
                Clear
              </button>
            </div>
            <div className="mt-6 border-b border-border pb-5">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <span>Max price / day</span>
                <span className="normal-case tracking-normal text-foreground">
                  {formatKes(maxPrice)}
                </span>
              </div>
              <input
                aria-label="Maximum price per day"
                type="range"
                min="3000"
                max="50000"
                step="1000"
                value={maxPrice}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
                className="mt-4 w-full accent-primary"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>KES 3,000</span>
                <span>Up to KES 50,000</span>
              </div>
            </div>
            <div className="border-b border-border py-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Vehicle category
              </p>
              <div className="mt-3 flex flex-col gap-3">
                {CATEGORIES.map((category) => (
                  <label
                    key={category}
                    className="flex cursor-pointer items-center gap-2 text-xs text-foreground"
                  >
                    <input
                      type="checkbox"
                      checked={categories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="size-4 rounded border-border accent-primary"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>
            <div className="border-b border-border py-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Seats
              </p>
              <div className="mt-3 grid grid-cols-4 overflow-hidden rounded-lg bg-muted p-1 text-[11px] font-semibold">
                {(["any", "2+", "5+", "7+"] as const).map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => setSeats(option)}
                    className={`rounded-md py-2 ${seats === option ? "bg-foreground text-background shadow-soft" : "text-muted-foreground"}`}
                  >
                    {option === "any" ? "Any" : option}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Sort by
              </p>
              <div className="mt-3 flex flex-col gap-1">
                {(
                  [
                    ["recommended", "Recommended"],
                    ["price-low", "Price: low to high"],
                    ["price-high", "Price: high to low"],
                  ] as [Sort, string][]
                ).map(([value, label]) => (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setSort(value)}
                    className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-semibold ${sort === value ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}
                  >
                    {label}
                    {sort === value && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-5 hidden items-center justify-between lg:flex">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {filteredVehicles.length} cars
                </span>{" "}
                available in Nairobi
              </p>
              <button
                type="button"
                onClick={() => setShowFilters((open) => !open)}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                <Filter className="mr-1 inline size-3.5" /> Refine search
              </button>
            </div>
            <div className="mb-6 flex items-center gap-4 rounded-2xl border border-border bg-secondary/60 p-4 sm:p-5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-background text-primary shadow-soft">
                <ShieldCheck className="size-6" />
              </div>
              <div>
                <p className="text-sm font-bold">Travel with confidence</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Kenya-wide roadside assistance and medical rescue, so you can have peace of mind.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-background px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                    Roadside assistance
                  </span>
                  <span className="rounded-full bg-background px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                    Medical rescue
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {filteredVehicles.map((vehicle) => (
                <DealCard
                  key={vehicle.slug}
                  vehicle={vehicle}
                  mode={mode}
                  quantity={quantities[vehicle.slug] ?? 1}
                  onQuantityChange={(quantity) =>
                    setQuantities((current) => ({ ...current, [vehicle.slug]: quantity }))
                  }
                />
              ))}
            </div>
            {filteredVehicles.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                <Sparkles className="mx-auto size-6 text-primary" />
                <h2 className="mt-3 text-lg font-bold">No vehicles match those filters</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try clearing a category or raising your maximum daily price.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      <footer id="support" className="mt-12 border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Link to="/" className="font-display text-lg font-extrabold text-foreground">
            drivenest
          </Link>
          <span>Verified operators · Transparent prices · M-Pesa & card</span>
          <a href="mailto:hello@drivenest.ke" className="font-semibold text-primary">
            Need help?
          </a>
        </div>
      </footer>
    </div>
  );
}

function DealCard({
  vehicle,
  mode,
  quantity,
  onQuantityChange,
}: {
  vehicle: Vehicle;
  mode: "self" | "chauffeured";
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-soft transition-shadow hover:shadow-lift sm:p-5">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold sm:text-lg">{vehicle.name}</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {vehicle.example} · <span className="text-foreground">{vehicle.seats} seats</span>
          </p>
          <div className="mt-4 inline-flex rounded-lg bg-muted p-1 text-[11px] font-semibold">
            <span className="rounded-md bg-background px-3 py-1.5 text-foreground shadow-soft">
              {mode === "self" ? "Self drive" : "Chauffeured"}
            </span>
            <span className="px-3 py-1.5 text-muted-foreground">
              {mode === "self" ? "Chauffeured" : "Self drive"}
            </span>
          </div>
        </div>
        <img
          src={vehicle.image}
          alt={`${vehicle.name} rental`}
          width={180}
          height={100}
          className="h-20 w-28 object-contain sm:h-24 sm:w-40"
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xl font-extrabold tracking-tight sm:text-2xl">
            {formatKes(vehicle.price)}
            <span className="text-xs font-medium text-muted-foreground">/day</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {vehicle.seats} seats · {vehicle.minDays}-day minimum · {vehicle.transmission}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Remove one ${vehicle.name}`}
              disabled={quantity <= 1}
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground disabled:opacity-40"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-4 text-center text-sm font-semibold">{quantity}</span>
            <button
              type="button"
              aria-label={`Add one ${vehicle.name}`}
              onClick={() => onQuantityChange(quantity + 1)}
              className="flex size-8 items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <a
            href={`/vehicles/${vehicle.slug}`}
            className="rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View deal
          </a>
        </div>
      </div>
    </article>
  );
}
