import { NavLink } from "react-router-dom";
import { Home, ClipboardList, Wallet, User } from "lucide-react";
import { useTranslation } from "react-i18next";

const items = [
  { to: "/", key: "nav_home", Icon: Home, end: true },
  { to: "/orders", key: "nav_orders", Icon: ClipboardList, end: false },
  { to: "/payment", key: "nav_payment", Icon: Wallet, end: false },
  { to: "/profile", key: "nav_profile", Icon: User, end: false },
];

export default function BottomNav() {
  const { t } = useTranslation();
  return (
    <nav
      style={{
        position: "sticky",
        bottom: 0,
        display: "flex",
        justifyContent: "space-around",
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        padding: "10px 8px calc(10px + env(safe-area-inset-bottom))",
      }}
    >
      {items.map(({ to, key, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          style={({ isActive }) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            textDecoration: "none",
            color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
            fontSize: 11,
            fontWeight: 600,
            flex: 1,
          })}
        >
          <Icon size={22} strokeWidth={2.25} />
          {t(key)}
        </NavLink>
      ))}
    </nav>
  );
}
