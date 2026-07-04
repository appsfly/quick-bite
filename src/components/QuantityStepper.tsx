import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  compact?: boolean;
}

export default function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  compact = false,
}: QuantityStepperProps) {
  const size = compact ? 24 : 28;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button
        onClick={onDecrement}
        aria-label="Decrease quantity"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          color: "var(--color-text)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Minus size={14} />
      </button>
      <span style={{ minWidth: 14, textAlign: "center", fontWeight: 600 }}>
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        aria-label="Increase quantity"
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          border: "none",
          background: "var(--color-primary)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
