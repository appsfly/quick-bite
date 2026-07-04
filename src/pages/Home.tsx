import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Search, SlidersHorizontal, ShoppingBag } from "lucide-react";
import { businesses, categories } from "../data/mockData";
import FoodImage from "../components/FoodImage";
import StarRating from "../components/StarRating";
import { useCartCount } from "../store/cartStore";
import type { CategoryId } from "../types";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cartCount = useCartCount();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

  const filtered = businesses.filter((b) => {
    const matchesQuery = b.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !activeCategory || b.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div style={{ paddingBottom: 12 }}>
      <div style={{ padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--color-text-muted)", fontSize: 13 }}>
              <MapPin size={14} />
              {t("location")}
            </div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Al Safa Street, Al Wasi</div>
          </div>
          <button
            onClick={() => navigate("/cart")}
            aria-label={t("cart") ?? "Cart"}
            style={{
              position: "relative",
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "none",
              background: "#111",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  background: "var(--color-primary)",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 700,
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "var(--color-surface)",
              borderRadius: "var(--radius-pill)",
              padding: "10px 16px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <Search size={18} color="var(--color-text-muted)" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search_placeholder") ?? "Search"}
              style={{ border: "none", outline: "none", background: "transparent", flex: 1, fontSize: 14 }}
            />
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "var(--color-primary)",
              color: "white",
              border: "none",
              borderRadius: "var(--radius-pill)",
              padding: "0 16px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            {t("filter")}
            <SlidersHorizontal size={15} />
          </button>
        </div>

        <div
          style={{
            marginTop: 18,
            background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
            borderRadius: "var(--radius-lg)",
            padding: 20,
            color: "white",
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{t("banner_title")}</div>
          <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 14, maxWidth: 220 }}>
            {t("banner_subtitle")}
          </div>
          <button
            style={{
              background: "white",
              color: "var(--color-primary-dark)",
              border: "none",
              borderRadius: "var(--radius-pill)",
              padding: "10px 20px",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {t("order_now")}
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22 }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>{t("categories")}</span>
          <span style={{ color: "var(--color-text-muted)", fontSize: 13 }}>{t("see_all")}</span>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(isActive ? null : cat.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: isActive ? "var(--color-primary)" : "var(--color-surface)",
                    boxShadow: "var(--shadow-card)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  {cat.emoji}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: isActive ? "var(--color-primary)" : "var(--color-text)" }}>
                  {t(cat.labelKey)}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 22 }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>{t("picks_for_you")}</span>
          <span style={{ color: "var(--color-text-muted)", fontSize: 13 }}>{t("see_all")}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "12px 20px 0" }}>
        {filtered.map((b) => (
          <button
            key={b.id}
            onClick={() => navigate(`/business/${b.id}`)}
            style={{
              display: "flex",
              gap: 12,
              background: "var(--color-surface)",
              borderRadius: "var(--radius-lg)",
              padding: 12,
              boxShadow: "var(--shadow-card)",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <FoodImage emoji={b.emoji} color={b.color} imageUrl={b.imageUrl} size="84px" fontSize="2.2rem" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{b.name}</span>
                <StarRating rating={b.rating} />
              </div>
              <div style={{ color: "var(--color-text-muted)", fontSize: 13, marginTop: 6 }}>
                {b.deliveryTimeMin} {t("min")} · {t("easy")} · {t("by")} {b.cuisine}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
