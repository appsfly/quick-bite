import { useState, type CSSProperties, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, Heart, Share2, Bike, Truck } from "lucide-react";
import { getBusinessById, getMenuItemsForBusiness } from "../data/mockData";
import FoodImage from "../components/FoodImage";
import StarRating from "../components/StarRating";
import SplitButton from "../components/SplitButton";
import { useCartStore } from "../store/cartStore";

export default function BusinessDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const [liked, setLiked] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const business = id ? getBusinessById(id) : undefined;
  const menuItems = id ? getMenuItemsForBusiness(id) : [];

  if (!business) {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => navigate(-1)}>{t("back_to_home")}</button>
      </div>
    );
  }

  const total = menuItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddAll = () => {
    menuItems.forEach((item) => addItem(item.id, 1));
    navigate("/cart");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div style={{ position: "relative" }}>
        <FoodImage
          emoji={business.emoji}
          color={business.color}
          imageUrl={business.imageUrl}
          width="100%"
          height="220px"
          fontSize="6rem"
          radius="0"
        />
        <div style={{ position: "absolute", top: 16, left: 16, right: 16, display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => navigate(-1)} style={circleBtnStyle}>
            <ChevronLeft size={20} />
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setLiked((v) => !v)} style={circleBtnStyle}>
              <Heart size={18} fill={liked ? "var(--color-danger)" : "none"} color={liked ? "var(--color-danger)" : "#111"} />
            </button>
            <button style={circleBtnStyle}>
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "var(--color-surface)",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          marginTop: -24,
          padding: 20,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 19 }}>{business.name}</div>
            <div style={{ color: "var(--color-text-muted)", fontSize: 13, marginTop: 2 }}>
              {t("by")} {business.cuisine}
            </div>
          </div>
          <StarRating rating={business.rating} size={16} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <FoodImage emoji="🧑‍🍳" color="#EFEFF2" size="48px" fontSize="1.4rem" radius="50%" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{business.ownerName}</div>
            <div style={{ color: "var(--color-text-muted)", fontSize: 12 }}>ID: {business.ownerId}</div>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{t("description")}</div>
          <div style={{ color: "var(--color-text-muted)", fontSize: 13, lineHeight: 1.5 }}>
            {showMore ? business.description : `${business.description.slice(0, 70)}... `}
            <span
              onClick={() => setShowMore((v) => !v)}
              style={{ color: "var(--color-text)", fontWeight: 600, cursor: "pointer" }}
            >
              {t("read_more")}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <InfoPill icon={<Bike size={16} />} label={t("delivery_time")} value={`${business.deliveryTimeMin} ${t("min")}`} />
          <InfoPill icon={<Truck size={16} />} label={t("delivery_type")} value={business.name} />
        </div>

        <div style={{ fontWeight: 700, fontSize: 15 }}>{t("picks_for_you")}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {menuItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: 8,
              }}
            >
              <FoodImage emoji={item.emoji} color={item.color} imageUrl={item.imageUrl} size="48px" fontSize="1.5rem" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</div>
                {item.nativeName && (
                  <div style={{ color: "var(--color-text-muted)", fontSize: 11 }}>{item.nativeName}</div>
                )}
              </div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>${item.price.toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "auto", paddingTop: 8 }}>
          <SplitButton
            price={`$${total.toFixed(2)}`}
            label={t("add_to_cart") ?? "Add to Cart"}
            onClick={handleAddAll}
          />
        </div>
      </div>
    </div>
  );
}

const circleBtnStyle: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,0.9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

function InfoPill({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "var(--color-bg)",
        borderRadius: "var(--radius-md)",
        padding: "10px 12px",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "var(--color-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{value}</div>
      </div>
    </div>
  );
}
