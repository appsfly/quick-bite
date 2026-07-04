const STORAGE_KEY = "quickbite-orders";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export interface SavedOrderLine {
  name: string;
  nativeName?: string;
  businessName: string;
  quantity: number;
  price: number;
  lineTotal: number;
}

export interface SavedOrder {
  id: string;
  placedAt: string;
  items: SavedOrderLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

function readAll(): SavedOrder[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed: SavedOrder[] = JSON.parse(raw);
    const now = Date.now();
    const fresh = parsed.filter((order) => now - new Date(order.placedAt).getTime() < MAX_AGE_MS);
    if (fresh.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    }
    return fresh;
  } catch {
    return [];
  }
}

export function getOrders(): SavedOrder[] {
  return readAll().sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime());
}

export function saveOrder(order: Omit<SavedOrder, "id" | "placedAt">): void {
  const orders = readAll();
  const newOrder: SavedOrder = {
    ...order,
    id: crypto.randomUUID(),
    placedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...orders, newOrder]));
}
