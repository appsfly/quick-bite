import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, MoreVertical, Ticket, ShoppingBag } from "lucide-react";
import { getMenuItemById, getBusinessById } from "../data/mockData";
import { useCartStore } from "../store/cartStore";
import FoodImage from "../components/FoodImage";
import StarRating from "../components/StarRating";
import QuantityStepper from "../components/QuantityStepper";
import SplitButton from "../components/SplitButton";

const DELIVERY_FEE = 2.0;

export default function Cart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lines, incrementItem, decrementItem, clearCart } = useCartStore();
  const [voucher, setVoucher] = useState("");
  const [placed, setPlaced] = useState(false);

  const rows = useMemo(
    () =>
      lines
        .map((line) => {
          const item = getMenuItemById(line.itemId);
          if (!item) return null;
          const business = getBusinessById(item.businessId);
          return { line, item, business };
        })
        .filter((r): r is NonNullable<typeof r> => r !== null),
    [lines]
  );

  const subtotal = rows.reduce((sum, r) => sum + r.item.price * r.line.quantity, 0);
  const deliveryFee = rows.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div style={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{t("order_placed")}</div>
        <div style={{ color: "var(--color-text-muted)", fontSize: 14, marginBottom: 24 }}>{t("order_placed_hint")}</div>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "var(--color-primary)",
            color: "white",
            border: "none",
            borderRadius: "var(--radius-pill)",
            padding: "12px 28px",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          {t("back_to_home")}
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 20px 12px" }}>
        <button onClick={() => navigate(-1)} style={navBtnStyle}>
          <ChevronLeft size={20} />
        </button>
        <span style={{ fontWeight: 700, fontSize: 17 }}>{t("cart")}</span>
        <button style={navBtnStyle}>
          <MoreVertical size={18} />
        </button>
      </div>

      {rows.length === 0 ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: 32, textAlign: "center" }}>
          <ShoppingBag size={40} color="var(--color-text-muted)" />
          <div style={{ fontWeight: 700 }}>{t("cart_empty")}</div>
          <div style={{ color: "var(--color-text-muted)", fontSize: 13 }}>{t("cart_empty_hint")}</div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "0 20px" }}>
            {rows.map(({ line, item, business }) => (
              <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <FoodImage emoji={item.emoji} color={item.color} imageUrl={item.imageUrl} size="64px" fontSize="1.8rem" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</span>
                    <StarRating rating={business?.rating ?? 4.5} />
                  </div>
                  <div style={{ color: "var(--color-text-muted)", fontSize: 12, marginBottom: 8 }}>
                    {t("by")} {business?.name}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>${item.price.toFixed(2)}</span>
                    <QuantityStepper
                      quantity={line.quantity}
                      onIncrement={() => incrementItem(item.id)}
                      onDecrement={() => decrementItem(item.id)}
                      compact
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: 20, marginTop: 8 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "var(--color-surface)",
                border: "1px dashed var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "12px 14px",
                marginBottom: 18,
              }}
            >
              <Ticket size={18} color="var(--color-primary)" />
              <input
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                placeholder={t("voucher_placeholder") ?? ""}
                style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 13 }}
              />
            </div>

            <SummaryRow label={t("subtotal")} value={`$${subtotal.toFixed(2)}`} />
            <SummaryRow label={t("delivery_fee")} value={`$${deliveryFee.toFixed(2)}`} />
            <div style={{ borderTop: "1px solid var(--color-border)", margin: "10px 0" }} />
            <SummaryRow label={t("total_amount")} value={`$${total.toFixed(2)}`} bold />
          </div>

          <div style={{ marginTop: "auto", padding: "0 20px 20px" }}>
            <SplitButton price={`$${total.toFixed(2)}`} label={t("checkout") ?? "Checkout"} onClick={handleCheckout} />
          </div>
        </>
      )}
    </div>
  );
}

const navBtnStyle = {
  width: 36,
  height: 36,
  borderRadius: "50%",
  border: "1px solid var(--color-border)",
  background: "var(--color-surface)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
} as const;

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: bold ? 16 : 14, fontWeight: bold ? 700 : 500 }}>
      <span>{label}</span>
      <span style={{ fontWeight: 700 }}>{value}</span>
    </div>
  );
}
