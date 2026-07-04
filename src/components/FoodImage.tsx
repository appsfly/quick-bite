import { useState } from "react";

interface FoodImageProps {
  emoji: string;
  color: string;
  imageUrl?: string;
  size?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  radius?: string;
}

export default function FoodImage({
  emoji,
  color,
  imageUrl,
  size = "100%",
  width,
  height,
  fontSize = "2.5rem",
  radius = "var(--radius-md)",
}: FoodImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = imageUrl && !failed;

  return (
    <div
      style={{
        width: width ?? size,
        height: height ?? size,
        background: color,
        borderRadius: radius,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {showImage ? (
        <img
          src={imageUrl}
          alt=""
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span style={{ fontSize, lineHeight: 1 }}>{emoji}</span>
      )}
    </div>
  );
}
