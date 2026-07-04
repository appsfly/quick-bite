interface PlaceholderProps {
  title: string;
  emoji: string;
}

export default function Placeholder({ title, emoji }: PlaceholderProps) {
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
      }}
    >
      <div style={{ fontSize: 48 }}>{emoji}</div>
      <div style={{ fontWeight: 700, fontSize: 18 }}>{title}</div>
      <div style={{ color: "var(--color-text-muted)", fontSize: 13, textAlign: "center" }}>
        Coming soon
      </div>
    </div>
  );
}
