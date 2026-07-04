import { useTranslation } from "react-i18next";
import { Check, Globe } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "../i18n";

export default function Profile() {
  const { t, i18n } = useTranslation();

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--color-primary)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          Q
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 17 }}>{t("nav_profile")}</div>
          <div style={{ color: "var(--color-text-muted)", fontSize: 13 }}>+972 5X-XXX-XXXX</div>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 15, marginBottom: 10 }}>
          <Globe size={18} />
          {t("choose_language")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const active = i18n.language?.startsWith(lang.code);
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderRadius: "var(--radius-md)",
                  border: active ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                {lang.label}
                {active && <Check size={18} color="var(--color-primary)" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
