import { useState, type FormEvent, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/authStore";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = login(phone.trim(), password);
    if (!result.ok) {
      setError(t("error_invalid_credentials"));
      return;
    }
    navigate("/");
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: 28, gap: 20 }}>
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🍜</div>
        <div style={{ fontWeight: 700, fontSize: 22 }}>QuickBite</div>
        <div style={{ color: "var(--color-text-muted)", fontSize: 14, marginTop: 4 }}>{t("login_title")}</div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t("phone_number") ?? ""}
          type="tel"
          required
          style={inputStyle}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("password") ?? ""}
          type="password"
          required
          style={inputStyle}
        />
        {error && <div style={{ color: "var(--color-danger)", fontSize: 13 }}>{error}</div>}
        <button type="submit" style={primaryButtonStyle}>
          {t("login_button")}
        </button>
      </form>

      <div style={{ textAlign: "center", fontSize: 13, color: "var(--color-text-muted)" }}>
        {t("no_account")}{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{ color: "var(--color-primary)", fontWeight: 700, cursor: "pointer" }}
        >
          {t("signup_link")}
        </span>
      </div>
    </div>
  );
}

export const inputStyle: CSSProperties = {
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  padding: "14px 16px",
  fontSize: 15,
  background: "var(--color-surface)",
  outline: "none",
};

export const primaryButtonStyle: CSSProperties = {
  background: "var(--color-primary)",
  color: "white",
  border: "none",
  borderRadius: "var(--radius-pill)",
  padding: "14px",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
  marginTop: 4,
};
