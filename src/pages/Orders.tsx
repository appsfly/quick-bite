import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClipboardList } from "lucide-react";
import { getOrders, type SavedOrder } from "../lib/orderHistory";

export default function Orders() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<SavedOrder[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  if (orders.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: 32,
          textAlign: "center",
        }}
      >
        <ClipboardList size={40} color="var(--color-text-muted)" />
        <div style={{ fontWeight: 700 }}>{t("orders_empty")}</div>
        <div style={{ color: "var(--color-text-muted)", fontSize: 13 }}>{t("orders_empty_hint")}</div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontWeight: 700, fontSize: 19 }}>{t("nav_orders")}</div>
      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            background: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            padding: 16,
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>
              {new Date(order.placedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span style={{ fontWeight: 700, fontSize: 15 }}>${order.total.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {order.items.map((item, i) => (
              <div
                key={i}
                style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--color-text-muted)" }}
              >
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>${item.lineTotal.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
