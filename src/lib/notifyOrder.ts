export interface OrderNotificationLine {
  name: string;
  nativeName?: string;
  businessName: string;
  quantity: number;
  price: number;
  lineTotal: number;
}

export interface OrderNotificationPayload {
  orderedAt: string;
  items: OrderNotificationLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  voucherCode?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildItemsHtml(items: OrderNotificationLine[]): string {
  const rows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:6px 8px;border-bottom:1px solid #eee;">${item.quantity}x ${escapeHtml(item.name)}</td>
        <td style="padding:6px 8px;border-bottom:1px solid #eee;">${escapeHtml(item.businessName)}</td>
        <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:right;">$${item.lineTotal.toFixed(2)}</td>
      </tr>`
    )
    .join("");

  return `<table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">${rows}</table>`;
}

function buildItemsText(items: OrderNotificationLine[]): string {
  return items
    .map((item) => `${item.quantity}x ${item.name} (${item.businessName}) - $${item.lineTotal.toFixed(2)}`)
    .join("\n");
}

export async function notifyOrderPlaced(payload: OrderNotificationPayload): Promise<void> {
  const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;
  if (!webhookUrl) return;

  const enrichedPayload = {
    ...payload,
    itemCount: payload.items.reduce((sum, item) => sum + item.quantity, 0),
    itemsHtml: buildItemsHtml(payload.items),
    itemsText: buildItemsText(payload.items),
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enrichedPayload),
    });
  } catch (error) {
    console.warn("Failed to send order notification to Make webhook", error);
  }
}
