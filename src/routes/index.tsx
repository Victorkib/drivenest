import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  Car,
  MapPin,
  Menu,
  Phone,
  Receipt,
  Search,
  Shield,
  Star,
  LifeBuoy,
} from "lucide-react";

import heroNairobi from "@/assets/hero-nairobi.jpg";
import carCompact from "@/assets/car-compact.jpg";
import carSedan from "@/assets/car-sedan.jpg";
import carLuxury from "@/assets/car-luxury.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carSafari from "@/assets/car-safari.jpg";
import carVan from "@/assets/car-van.jpg";
import carPickup from "@/assets/car-pickup.jpg";
import cityNairobi from "@/assets/city-nairobi.jpg";
import cityMombasa from "@/assets/city-mombasa.jpg";
import cityDiani from "@/assets/city-diani.jpg";
import cityKisumu from "@/assets/city-kisumu.jpg";
import cityNaivasha from "@/assets/city-naivasha.jpg";
import cityNanyuki from "@/assets/city-nanyuki.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DriveNest | Self drive & chauffeured car hire in Kenya" },
      {
        name: "description",
        content:
          "Hire a car anywhere in Kenya. Verified operators, transparent daily rates, M-Pesa or card. Self drive or with a driver.",
      },
      {
        property: "og:title",
        content: "DriveNest | Self drive & chauffeured car hire in Kenya",
      },
      {
        property: "og:description",
        content:
          "Hire a car anywhere in Kenya. Verified operators, transparent daily rates, M-Pesa or card.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CATEGORIES = [
  "All",
  "Small car",
  "Medium car",
  "Mid-size SUV",
  "SUV",
  "Safari",
  "Pickup truck",
  "Minivan",
  "Van",
  "Bus",
] as const;

type Category = (typeof CATEGORIES)[number];

const VEHICLES: {
  name: string;
  example: string;
  price: string;
  image: string;
  category: Exclude<Category, "All">;
}[] = [
  {
    name: "Economy Small Car",
    example: "Mazda Demio or similar",
    price: "KES 4,000",
    image: carCompact,
    category: "Small car",
  },
  {
    name: "Economy Medium Car",
    example: "Toyota Axio or similar",
    price: "KES 4,500",
    image: carSedan,
    category: "Medium car",
  },
  {
    name: "Premium Medium Car",
    example: "Mercedes C 200 or similar",
    price: "KES 18,000",
    image: carSedan,
    category: "Medium car",
  },
  {
    name: "Luxury Medium Car",
    example: "Mercedes S 350 or similar",
    price: "KES 30,000",
    image: carLuxury,
    category: "Medium car",
  },
  {
    name: "Economy Mid-Size SUV",
    example: "Nissan X-Trail or similar",
    price: "KES 7,500",
    image: carSuv,
    category: "Mid-size SUV",
  },
  {
    name: "Standard Mid-Size SUV",
    example: "Mazda CX-5 or similar",
    price: "KES 8,500",
    image: carSuv,
    category: "Mid-size SUV",
  },
  {
    name: "Premium SUV",
    example: "Toyota Prado J150 or similar",
    price: "KES 13,000",
    image: carSuv,
    category: "SUV",
  },
  {
    name: "Luxury SUV",
    example: "Toyota LC200 V8 or similar",
    price: "KES 28,000",
    image: carSafari,
    category: "SUV",
  },
  {
    name: "Economy Safari",
    example: "Toyota Hiace Safari or similar",
    price: "KES 25,500",
    image: carVan,
    category: "Safari",
  },
  {
    name: "Standard Safari",
    example: "Toyota Land Cruiser or similar",
    price: "KES 35,000",
    image: carSafari,
    category: "Safari",
  },
  {
    name: "Premium Pickup Truck",
    example: "Toyota Hilux (2x Cab) or similar",
    price: "KES 15,000",
    image: carPickup,
    category: "Pickup truck",
  },
  {
    name: "Standard Minivan",
    example: "Toyota Noah or similar",
    price: "KES 8,000",
    image: carVan,
    category: "Minivan",
  },
  {
    name: "Premium Minivan",
    example: "Toyota Alphard or similar",
    price: "KES 16,000",
    image: carVan,
    category: "Minivan",
  },
  {
    name: "Standard Van",
    example: "Toyota Hiace or similar",
    price: "KES 15,000",
    image: carVan,
    category: "Van",
  },
  {
    name: "Standard Bus",
    example: "Toyota Coaster or similar",
    price: "KES 26,000",
    image: carVan,
    category: "Bus",
  },
  {
    name: "Compact City Car",
    example: "Suzuki Swift or similar",
    price: "KES 3,800",
    image: carCompact,
    category: "Small car",
  },
];

const CITIES = [
  { name: "Nairobi", tag: "Capital · fleet hub", image: cityNairobi },
  { name: "Mombasa", tag: "Coast · old town", image: cityMombasa },
  { name: "Diani", tag: "White-sand beaches", image: cityDiani },
  { name: "Kisumu", tag: "Lakeside city", image: cityKisumu },
  { name: "Naivasha", tag: "Lake · escarpment", image: cityNaivasha },
  { name: "Nanyuki", tag: "Mount Kenya country", image: cityNanyuki },
];

const TRUST = [
  { icon: BadgeCheck, label: "Verified operators" },
  { icon: Receipt, label: "Transparent pricing" },
  { icon: Phone, label: "M-Pesa & card" },
  { icon: LifeBuoy, label: "Roadside rescue included" },
];

const REVIEWS = [
  {
    initials: "WK",
    name: "Wanjiru K.",
    role: "Nairobi",
    quote:
      "Booked a RAV4 for a week in the Mara. Picked it up at the airport, signed everything on my phone, paid the deposit by M-Pesa. Easiest car hire I have done in Kenya.",
  },
  {
    initials: "JM",
    name: "James M.",
    role: "Mombasa",
    quote:
      "Hired a driver for three days of meetings around Mombasa. Confirmation came instantly by SMS. Felt premium without the premium price.",
  },
  {
    initials: "DO",
    name: "David O.",
    role: "Operations, Nairobi",
    quote:
      "We use DriveNest for all our client pickups. The driver was on time, smartly dressed, and the whole thing was billed to our company account.",
  },
];

function Index() {
  const [mode, setMode] = useState<"self" | "chauffeured">("self");
  const [category, setCategory] = useState<Category>("All");

  const vehicles = category === "All" ? VEHICLES : VEHICLES.filter((v) => v.category === category);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative isolate min-h-[46rem] overflow-hidden">
        <img
          src={heroNairobi}
          alt="Nairobi skyline at golden hour"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--gradient-hero)" }} />

        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <a href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-extrabold tracking-tight text-ink-foreground">
              drivenest
            </span>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="#operators"
              className="hidden text-sm font-medium text-ink-foreground/90 transition-colors hover:text-ink-foreground sm:block"
            >
              Become an Operator
            </a>
            <span className="rounded-full border border-ink-foreground/25 px-3 py-1.5 text-xs font-semibold text-ink-foreground/90">
              KSh
            </span>
            <button
              type="button"
              aria-label="Open menu"
              className="rounded-full border border-ink-foreground/25 p-2 text-ink-foreground/90 transition-colors hover:bg-ink-foreground/10"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </nav>

        <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-16 text-center sm:pt-24">
          <h1 className="text-4xl font-extrabold leading-[1.05] text-ink-foreground sm:text-6xl">
            Self drive or chauffeured rentals, anywhere in Kenya
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-ink-foreground/85">
            Verified operators, transparent prices, pay with M-Pesa or card. All in a few minutes.
          </p>

          <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-ink/35 px-3 py-1.5 text-xs font-medium text-ink-foreground backdrop-blur">
            <MapPin className="size-3.5" />
            Nairobi, Kenya
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full bg-background/15 p-1 backdrop-blur">
              <button
                type="button"
                onClick={() => setMode("self")}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                  mode === "self"
                    ? "bg-background text-foreground shadow-soft"
                    : "text-ink-foreground/90 hover:text-ink-foreground"
                }`}
              >
                <Car className="size-4" />
                Self drive
              </button>
              <button
                type="button"
                onClick={() => setMode("chauffeured")}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                  mode === "chauffeured"
                    ? "bg-background text-foreground shadow-soft"
                    : "text-ink-foreground/90 hover:text-ink-foreground"
                }`}
              >
                <BadgeCheck className="size-4" />
                Chauffeured
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-8 rounded-3xl bg-background p-2 text-left shadow-lift sm:rounded-full">
            <div className="grid gap-1 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center">
              <SearchField label="Start location" value="Nairobi" />
              <SearchField label="Return location" value="Same as start" divider />
              <SearchField
                label="Dates"
                value="Add dates"
                divider
                icon={<CalendarDays className="size-4 text-muted-foreground" />}
              />
              <button
                type="button"
                className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:mt-0 sm:w-12 sm:px-0"
              >
                <Search className="size-4" />
                <span className="sm:hidden">Search vehicles</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Trust strip */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-8">
          {TRUST.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-blush text-primary">
                <Icon className="size-4" />
              </span>
              <span className="text-sm font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Vehicles */}
      <section className="surface-blush py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Every kind of vehicle
            </h2>
            <p className="mt-3 text-muted-foreground">
              From city runabouts to safari Land Cruisers, with transparent daily rates.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vehicles.map((v) => (
              <article
                key={v.name}
                className="group overflow-hidden rounded-3xl bg-card shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className="overflow-hidden bg-blush">
                  <img
                    src={v.image}
                    alt={v.name}
                    width={768}
                    height={576}
                    loading="lazy"
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1 p-5">
                  <h3 className="text-base font-semibold text-card-foreground">{v.name}</h3>
                  <p className="text-sm text-muted-foreground">{v.example}</p>
                  <p className="pt-2 text-sm font-semibold text-primary">
                    {v.price}
                    <span className="font-medium text-muted-foreground">/day</span>
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#vehicles"
              className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-background px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-blush"
            >
              View all vehicles
            </a>
          </div>

          <div
            id="operators"
            className="mx-auto mt-14 flex max-w-3xl items-center gap-4 rounded-3xl bg-background p-6 shadow-soft"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blush text-primary">
              <Shield className="size-5" />
            </span>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Every operator is vetted.</span>{" "}
              Compare quotes from multiple trusted operators and pay securely.
            </p>
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Cities we serve</h2>
            <p className="mt-3 text-muted-foreground">
              Where to go, when to visit, and how to get around, city by city.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CITIES.map((c) => (
              <a
                key={c.name}
                href="#cities"
                className="group relative isolate block overflow-hidden rounded-3xl shadow-soft"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: "var(--gradient-hero)" }}
                />
                <div className="absolute bottom-5 left-5">
                  <p className="text-lg font-bold text-ink-foreground">{c.name}</p>
                  <p className="text-xs text-ink-foreground/85">{c.tag}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="surface-blush py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              What our customers say
            </h2>
            <p className="mt-3 text-muted-foreground">Real trips, verified bookings.</p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="flex h-full flex-col rounded-3xl bg-card p-7 shadow-soft"
              >
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-card-foreground">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-blush text-sm font-semibold text-blush-foreground">
                    {r.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">{r.name}</span>
                    <span className="block text-xs text-muted-foreground">{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink py-14 text-ink-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-2xl font-extrabold tracking-tight">drivenest</p>
            <p className="mt-2 text-sm text-ink-foreground/70">
              Car hire across Kenya, made simple.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-foreground/80">
            <a href="#vehicles" className="hover:text-ink-foreground">
              Vehicles
            </a>
            <a href="#cities" className="hover:text-ink-foreground">
              Cities
            </a>
            <a href="#operators" className="hover:text-ink-foreground">
              Become an operator
            </a>
            <a href="#support" className="hover:text-ink-foreground">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SearchField({
  label,
  value,
  divider,
  icon,
}: {
  label: string;
  value: string;
  divider?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-between rounded-2xl px-5 py-3 text-left transition-colors hover:bg-muted sm:rounded-full ${
        divider ? "sm:border-l sm:border-border" : ""
      }`}
    >
      <span>
        <span className="block text-xs font-semibold text-foreground">{label}</span>
        <span className="block text-sm text-muted-foreground">{value}</span>
      </span>
      {icon ?? <ChevronDown className="size-4 text-muted-foreground" />}
    </button>
  );
}
