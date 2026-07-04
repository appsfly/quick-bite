import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../store/authStore";
import { inputStyle, primaryButtonStyle } from "./Login";

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const signup = useAuthStore((s) => s.signup);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = signup(name.trim(), phone.trim(), password);
    if (!result.ok) {
      setError(t("error_phone_exists"));
      return;
    }
    navigate("/");
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: 28, gap: 20 }}>
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🍜</div>
        <div style={{ fontWeight: 700, fontSize: 22 }}>QuickBite</div>
        <div style={{ color: "var(--color-text-muted)", fontSize: 14, marginTop: 4 }}>{t("signup_title")}</div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("full_name") ?? ""}
          required
          style={inputStyle}
        />
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
          {t("signup_button")}
        </button>
      </form>

      <div style={{ textAlign: "center", fontSize: 13, color: "var(--color-text-muted)" }}>
        {t("have_account")}{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ color: "var(--color-primary)", fontWeight: 700, cursor: "pointer" }}
        >
          {t("login_link")}
        </span>
      </div>
    </div>
  );
}
