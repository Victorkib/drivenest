import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Briefcase, Cog, Fuel, ShieldCheck, Users } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatKes, getGalleryImages, getVehicle } from "@/lib/fleet";

export const Route = createFileRoute("/vehicles/$slug")({
  loader: ({ params }) => {
    const vehicle = getVehicle(params.slug);
    if (!vehicle) throw notFound();
    return vehicle;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} | DriveNest` : "Vehicle | DriveNest" },
      { name: "description", content: loaderData?.blurb ?? "Vehicle details on DriveNest." },
    ],
  }),
  notFoundComponent: VehicleNotFound,
  component: VehicleDetail,
});

function VehicleDetail() {
  const vehicle = Route.useLoaderData();
  const images = getGalleryImages(vehicle);

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
          <a
            href="#support"
            className="ml-auto hidden text-xs font-semibold text-muted-foreground hover:text-foreground sm:block"
          >
            Become an Operator
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/browse">Browse</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{vehicle.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0">
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((src, index) => (
                  <CarouselItem key={src + index}>
                    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={src}
                          alt={`${vehicle.name} photo ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>

            <div className="mt-6 flex flex-wrap gap-2">
              <SpecBadge icon={Users} label={`${vehicle.seats} seats`} />
              <SpecBadge icon={Cog} label={vehicle.transmission} />
              <SpecBadge icon={Fuel} label={vehicle.fuel} />
              <SpecBadge icon={Briefcase} label={`${vehicle.luggage} bags`} />
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-bold">About this vehicle</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{vehicle.blurb}</p>
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-secondary/60 p-4 sm:p-5">
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
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {vehicle.category}
              </p>
              <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight">
                {vehicle.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{vehicle.example}</p>

              <div className="mt-5 border-t border-border pt-5">
                <p className="text-3xl font-extrabold tracking-tight">
                  {formatKes(vehicle.price)}
                  <span className="text-sm font-medium text-muted-foreground">/day</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{vehicle.minDays}-day minimum</p>
              </div>

              <Button size="lg" className="mt-6 w-full rounded-full">
                Request to book
              </Button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                No payment now. Our team will confirm availability.
              </p>
            </div>
          </aside>
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

function SpecBadge({
  icon: Icon,
  label,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}) {
  return (
    <Badge
      variant="secondary"
      className="gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold"
    >
      <Icon className="size-3.5" />
      {label}
    </Badge>
  );
}

function VehicleNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Vehicle not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't find that vehicle. It may have been renamed or removed from the fleet.
        </p>
        <div className="mt-6">
          <Link
            to="/browse"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to browse
          </Link>
        </div>
      </div>
    </div>
  );
}
