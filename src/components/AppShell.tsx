import type { ReactNode } from "react";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        background: "#EDEDF0",
      }}
    >
      <div
        className="app-frame"
        style={{
          width: "100%",
          maxWidth: 460,
          minHeight: "100vh",
          background: "var(--color-bg)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
}
