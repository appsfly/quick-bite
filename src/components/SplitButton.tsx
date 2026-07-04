interface SplitButtonProps {
  price: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function SplitButton({ price, label, onClick, disabled }: SplitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        border: "none",
        borderRadius: "var(--radius-pill)",
        background: "var(--color-primary)",
        padding: 6,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        boxShadow: "var(--shadow-float)",
      }}
    >
      <span
        style={{
          color: "white",
          fontWeight: 700,
          padding: "12px 20px",
          fontSize: 15,
        }}
      >
        {price}
      </span>
      <span
        style={{
          flex: 1,
          background: "var(--color-surface)",
          borderRadius: "var(--radius-pill)",
          textAlign: "center",
          padding: "12px 20px",
          fontWeight: 700,
          fontSize: 15,
          color: "var(--color-text)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
