export type CategoryId = "food" | "stores" | "groceries";

export interface Category {
  id: CategoryId;
  labelKey: string;
  emoji: string;
}

export interface MenuItem {
  id: string;
  businessId: string;
  name: string;
  nativeName?: string;
  price: number;
  emoji: string;
  color: string;
  imageUrl?: string;
}

export interface Business {
  id: string;
  name: string;
  ownerName: string;
  ownerId: string;
  rating: number;
  reviewCount: number;
  category: CategoryId;
  cuisine: string;
  deliveryTimeMin: number;
  difficulty: "Easy" | "Medium";
  description: string;
  emoji: string;
  color: string;
  imageUrl?: string;
}

export interface CartLine {
  itemId: string;
  quantity: number;
  specialRequest?: string;
}
