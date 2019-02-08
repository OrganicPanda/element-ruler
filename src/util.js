import smartTruncate from "smart-truncate";

export const elementDescription = (el, fallback = "no element") => {
  if (!el) return fallback;

  const tagLabel = el.tagName;
  const idLabel = el.id ? `#${el.id}` : "";
  const classLabel = el.getAttribute("class")
    ? `.${smartTruncate(el.getAttribute("class"), 21, { position: 10 })}`
    : "";
  const textLabel = el.textContent
    ? ` "${smartTruncate(el.textContent, 21, { position: 10 })}"`
    : "";

  return `${tagLabel}${idLabel}${classLabel}${textLabel}`;
};

export const box = pos => {
  const { width, height, x, y } = pos;
  const halfHeight = height / 2;
  const halfWidth = width / 2;
  const centerX = x + halfWidth;
  const centerY = y + halfHeight;
  const topY = centerY - halfHeight;
  const bottomY = centerY + halfHeight;
  const leftX = centerX - halfWidth;
  const rightX = centerX + halfWidth;

  return {
    size: { width, height },
    points: {
      topLeft: { x: leftX, y: topY },
      top: { x: centerX, y: topY },
      topRight: { x: rightX, y: topY },

      left: { x: leftX, y: centerY },
      center: { x: centerX, y: centerY },
      right: { x: rightX, y: centerY },

      bottomLeft: { x: leftX, y: bottomY },
      bottom: { x: centerX, y: bottomY },
      bottomRight: { x: rightX, y: bottomY }
    }
  };
};
