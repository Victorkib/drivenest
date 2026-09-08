import carCompact from "@/assets/car-compact.jpg";
import carSedan from "@/assets/car-sedan.jpg";
import carLuxury from "@/assets/car-luxury.jpg";
import carSuv from "@/assets/car-suv.jpg";
import carSafari from "@/assets/car-safari.jpg";
import carVan from "@/assets/car-van.jpg";
import carPickup from "@/assets/car-pickup.jpg";

export const CATEGORIES = [
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

export type Category = (typeof CATEGORIES)[number];

export type Vehicle = {
  slug: string;
  name: string;
  example: string;
  price: number;
  seats: number;
  minDays: number;
  image: string;
  gallery?: string[];
  category: Category;
  transmission: string;
  fuel: string;
  luggage: number;
  blurb: string;
};

export const VEHICLES: Vehicle[] = [
  {
    slug: "economy-small-car",
    name: "Economy Small Car",
    example: "Mazda Demio or similar",
    price: 4000,
    seats: 5,
    minDays: 2,
    image: carCompact,
    category: "Small car",
    transmission: "Automatic",
    fuel: "Petrol",
    luggage: 2,
    blurb:
      "Nippy, frugal and easy to park. The sensible pick for city errands and short upcountry hops.",
  },
  {
    slug: "compact-city-car",
    name: "Compact City Car",
    example: "Suzuki Swift or similar",
    price: 3800,
    seats: 5,
    minDays: 2,
    image: carCompact,
    category: "Small car",
    transmission: "Manual",
    fuel: "Petrol",
    luggage: 2,
    blurb: "Our cheapest daily rate. Ideal for solo travellers staying inside town.",
  },
  {
    slug: "economy-medium-car",
    name: "Economy Medium Car",
    example: "Toyota Axio or similar",
    price: 4500,
    seats: 5,
    minDays: 2,
    image: carSedan,
    category: "Medium car",
    transmission: "Automatic",
    fuel: "Petrol",
    luggage: 3,
    blurb: "A comfortable saloon with real boot space for airport runs and longer drives.",
  },
  {
    slug: "premium-medium-car",
    name: "Premium Medium Car",
    example: "Mercedes C 200 or similar",
    price: 18000,
    seats: 5,
    minDays: 1,
    image: carSedan,
    category: "Medium car",
    transmission: "Automatic",
    fuel: "Petrol",
    luggage: 3,
    blurb: "Executive saloon for client meetings, weddings and airport pickups.",
  },
  {
    slug: "luxury-medium-car",
    name: "Luxury Medium Car",
    example: "Mercedes S 350 or similar",
    price: 30000,
    seats: 5,
    minDays: 1,
    image: carLuxury,
    category: "Medium car",
    transmission: "Automatic",
    fuel: "Petrol",
    luggage: 3,
    blurb: "The flagship saloon. Usually booked chauffeured with a suited driver.",
  },
  {
    slug: "economy-mid-size-suv",
    name: "Economy Mid-Size SUV",
    example: "Nissan X-Trail or similar",
    price: 7500,
    seats: 5,
    minDays: 3,
    image: carSuv,
    category: "Mid-size SUV",
    transmission: "Automatic",
    fuel: "Petrol",
    luggage: 4,
    blurb: "Higher ground clearance for murram roads without a safari-sized budget.",
  },
  {
    slug: "standard-mid-size-suv",
    name: "Standard Mid-Size SUV",
    example: "Mazda CX-5 or similar",
    price: 8500,
    seats: 5,
    minDays: 3,
    image: carSuv,
    category: "Mid-size SUV",
    transmission: "Automatic",
    fuel: "Diesel",
    luggage: 4,
    blurb: "Smooth on tarmac, capable off it. Our most booked weekend vehicle.",
  },
  {
    slug: "premium-suv",
    name: "Premium SUV",
    example: "Toyota Prado J150 or similar",
    price: 13000,
    seats: 7,
    minDays: 3,
    image: carSuv,
    category: "SUV",
    transmission: "Automatic",
    fuel: "Diesel",
    luggage: 5,
    blurb: "Seven seats and full 4WD. Built for family trips to the Mara or Amboseli.",
  },
  {
    slug: "luxury-suv",
    name: "Luxury SUV",
    example: "Toyota LC200 V8 or similar",
    price: 28000,
    seats: 7,
    minDays: 2,
    image: carSafari,
    category: "SUV",
    transmission: "Automatic",
    fuel: "Diesel",
    luggage: 6,
    blurb: "Serious presence and serious capability, with leather everywhere.",
  },
  {
    slug: "economy-safari",
    name: "Economy Safari",
    example: "Toyota Hiace Safari or similar",
    price: 25500,
    seats: 9,
    minDays: 3,
    image: carVan,
    category: "Safari",
    transmission: "Manual",
    fuel: "Diesel",
    luggage: 8,
    blurb: "Pop-top safari van with window seats for everyone in the group.",
  },
  {
    slug: "standard-safari",
    name: "Standard Safari",
    example: "Toyota Land Cruiser or similar",
    price: 35000,
    seats: 7,
    minDays: 3,
    image: carSafari,
    category: "Safari",
    transmission: "Manual",
    fuel: "Diesel",
    luggage: 6,
    blurb: "Open-roof game drive Land Cruiser with a driver-guide included.",
  },
  {
    slug: "premium-pickup-truck",
    name: "Premium Pickup Truck",
    example: "Toyota Hilux (2x Cab) or similar",
    price: 15000,
    seats: 5,
    minDays: 3,
    image: carPickup,
    category: "Pickup truck",
    transmission: "Manual",
    fuel: "Diesel",
    luggage: 6,
    blurb: "Double cab workhorse for site visits, farms and heavy loads.",
  },
  {
    slug: "standard-minivan",
    name: "Standard Minivan",
    example: "Toyota Noah or similar",
    price: 8000,
    seats: 7,
    minDays: 2,
    image: carVan,
    category: "Minivan",
    transmission: "Automatic",
    fuel: "Petrol",
    luggage: 5,
    blurb: "The family shuttle. Sliding doors and easy third-row access.",
  },
  {
    slug: "premium-minivan",
    name: "Premium Minivan",
    example: "Toyota Alphard or similar",
    price: 16000,
    seats: 7,
    minDays: 2,
    image: carVan,
    category: "Minivan",
    transmission: "Automatic",
    fuel: "Petrol",
    luggage: 5,
    blurb: "Captain chairs and quiet cabin. A boardroom on wheels.",
  },
  {
    slug: "standard-van",
    name: "Standard Van",
    example: "Toyota Hiace or similar",
    price: 15000,
    seats: 14,
    minDays: 2,
    image: carVan,
    category: "Van",
    transmission: "Manual",
    fuel: "Diesel",
    luggage: 10,
    blurb: "Fourteen seats for team transfers, conferences and church groups.",
  },
  {
    slug: "standard-bus",
    name: "Standard Bus",
    example: "Toyota Coaster or similar",
    price: 26000,
    seats: 26,
    minDays: 2,
    image: carVan,
    category: "Bus",
    transmission: "Manual",
    fuel: "Diesel",
    luggage: 20,
    blurb: "Chauffeured coaster for large groups and multi-day itineraries.",
  },
];

export const formatKes = (n: number) => `KES ${n.toLocaleString("en-KE")}`;

export const getVehicle = (slug: string) => VEHICLES.find((v) => v.slug === slug);

export const getGalleryImages = (vehicle: Vehicle): string[] =>
  vehicle.gallery && vehicle.gallery.length > 0 ? vehicle.gallery : [vehicle.image];
