import type { Business, Category, MenuItem } from "../types";

import adoboPlate from "../assets/food/adobo-plate.jpg";
import adoboTacos from "../assets/food/adobo-tacos.jpg";
import sinigang from "../assets/food/sinigang.jpg";
import padThaiHero from "../assets/food/pad-thai-hero.jpg";
import padThai from "../assets/food/pad-thai.jpg";
import greenCurry from "../assets/food/green-curry.jpg";
import momosHero from "../assets/food/momos-hero.jpg";
import momos from "../assets/food/momos.jpg";
import butterChickenHero from "../assets/food/butter-chicken-hero.jpg";
import butterChicken from "../assets/food/butter-chicken.jpg";
import dimSum from "../assets/food/dim-sum.jpg";
import sriLankanCurry from "../assets/food/sri-lankan-curry.jpg";
import strawberries from "../assets/food/strawberries.jpg";

export const categories: Category[] = [
  { id: "food", labelKey: "cat_food", emoji: "🍜" },
  { id: "stores", labelKey: "cat_stores", emoji: "🏪" },
  { id: "groceries", labelKey: "cat_groceries", emoji: "🛒" },
];

export const businesses: Business[] = [
  {
    id: "b1",
    name: "Aling Nena's Kitchen",
    ownerName: "Mitchel Santaran",
    ownerId: "13256626",
    rating: 4.7,
    reviewCount: 2300,
    category: "food",
    cuisine: "Filipino",
    deliveryTimeMin: 25,
    difficulty: "Easy",
    description:
      "From fresh adobo to sinigang, we've got your favorite Filipino home cooking. Shop now, and we'll deliver it fast!",
    emoji: "🌮",
    color: "#FDECC8",
    imageUrl: adoboPlate,
  },
  {
    id: "b2",
    name: "Bangkok Home Kitchen",
    ownerName: "Somchai Waree",
    ownerId: "44210981",
    rating: 4.8,
    reviewCount: 1450,
    category: "food",
    cuisine: "Thai",
    deliveryTimeMin: 30,
    difficulty: "Easy",
    description:
      "Authentic Thai dishes made fresh daily — pad thai, curries, and spicy salads just like home.",
    emoji: "🍛",
    color: "#E4F3E1",
    imageUrl: padThaiHero,
  },
  {
    id: "b3",
    name: "Kathmandu Spice",
    ownerName: "Bikash Thapa",
    ownerId: "77102345",
    rating: 4.6,
    reviewCount: 980,
    category: "food",
    cuisine: "Nepali",
    deliveryTimeMin: 35,
    difficulty: "Medium",
    description:
      "Momos, dal bhat, and traditional Nepali comfort food, made with love and delivered warm.",
    emoji: "🥟",
    color: "#FCE4E4",
    imageUrl: momosHero,
  },
  {
    id: "b4",
    name: "Mumbai Tiffin",
    ownerName: "Priya Nair",
    ownerId: "56320099",
    rating: 4.7,
    reviewCount: 1680,
    category: "food",
    cuisine: "Indian",
    deliveryTimeMin: 28,
    difficulty: "Easy",
    description:
      "Homestyle Indian tiffin boxes — curries, rice, and fresh roti, packed the way mom used to.",
    emoji: "🍛",
    color: "#FFF1D6",
    imageUrl: butterChickenHero,
  },
  {
    id: "b5",
    name: "Golden Dragon Grocery",
    ownerName: "Wei Chen",
    ownerId: "90887761",
    rating: 4.5,
    reviewCount: 610,
    category: "groceries",
    cuisine: "Chinese",
    deliveryTimeMin: 20,
    difficulty: "Easy",
    description:
      "Community grocery store with imported sauces, noodles, and snacks from home.",
    emoji: "🥡",
    color: "#E6F0FA",
    imageUrl: dimSum,
  },
  {
    id: "b6",
    name: "Colombo Corner Store",
    ownerName: "Nimal Perera",
    ownerId: "33019284",
    rating: 4.4,
    reviewCount: 340,
    category: "stores",
    cuisine: "Sri Lankan",
    deliveryTimeMin: 22,
    difficulty: "Easy",
    description:
      "Sri Lankan spices, snacks, and everyday essentials for the community.",
    emoji: "🏪",
    color: "#EFE6FA",
    imageUrl: sriLankanCurry,
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "m1",
    businessId: "b1",
    name: "Chicken Adobo Tacos",
    nativeName: "Adobo",
    price: 25.0,
    emoji: "🌮",
    color: "#FDECC8",
    imageUrl: adoboTacos,
  },
  {
    id: "m2",
    businessId: "b1",
    name: "Pork Sinigang Bowl",
    nativeName: "Sinigang",
    price: 18.5,
    emoji: "🍲",
    color: "#F6E3D2",
    imageUrl: sinigang,
  },
  {
    id: "m3",
    businessId: "b2",
    name: "Pad Thai",
    nativeName: "ผัดไทย",
    price: 15.0,
    emoji: "🍜",
    color: "#E4F3E1",
    imageUrl: padThai,
  },
  {
    id: "m4",
    businessId: "b2",
    name: "Green Curry",
    nativeName: "แกงเขียวหวาน",
    price: 17.0,
    emoji: "🍛",
    color: "#DFF0DA",
    imageUrl: greenCurry,
  },
  {
    id: "m5",
    businessId: "b3",
    name: "Steamed Momos",
    nativeName: "मःम",
    price: 12.0,
    emoji: "🥟",
    color: "#FCE4E4",
    imageUrl: momos,
  },
  {
    id: "m6",
    businessId: "b4",
    name: "Butter Chicken Tiffin",
    nativeName: "मक्खन चिकन",
    price: 20.0,
    emoji: "🍛",
    color: "#FFF1D6",
    imageUrl: butterChicken,
  },
  {
    id: "m7",
    businessId: "b1",
    name: "Fresh Strawberries",
    price: 3.5,
    emoji: "🍓",
    color: "#FBE1E6",
    imageUrl: strawberries,
  },
];

export function getBusinessById(id: string): Business | undefined {
  return businesses.find((b) => b.id === id);
}

export function getMenuItemsForBusiness(businessId: string): MenuItem[] {
  return menuItems.filter((m) => m.businessId === businessId);
}

export function getMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find((m) => m.id === id);
}
