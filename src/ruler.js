import React from "react";

/****************************************************************************\
*                       │                           │                        *
*                 ┌────┐ ┌────┐               ┌────┐ ┌────┐                  *
*                 │10px│││10px│               │10px│││10px│                  *
*  ┌─────────────┐└────┘ └────┘┌─────────────┐└────┘ └────┘┌─────────────┐   *
*  │   Hovered   │◀────▶│◀────▶│   Hovered   │◀────▶│◀────▶│   Hovered   │   *
*  └─────────────┘  C      E   └─────────────┘  F      D   └─────────────┘   *
*         ▲ ┌────┐      │             ▲ ┌────┐      │             ▲ ┌────┐   *
*       A │ │50px│                  A │ │50px│                  A │ │50px│   *
*         ▼ └────┘      │             ▼ └────┘      │             ▼ └────┘   *
* ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┬───────────────────────────┬ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  *
*                       │         Selected          │                        *
* ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┴───────────────────────────┴ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  *
*         ▲ ┌────┐      │             ▲ ┌────┐      │             ▲ ┌────┐   *
*       B │ │50px│┌────┐ ┌────┐     B │ │50px│┌────┐ ┌────┐     B │ │50px│   *
*         ▼ └────┘│10px│││10px│       ▼ └────┘│10px│││10px│       ▼ └────┘   *
*  ┌─────────────┐└────┘ └────┘┌─────────────┐└────┘ └────┘┌─────────────┐   *
*  │   Hovered   │◀────▶│◀────▶│   Hovered   │◀────▶│◀────▶│   Hovered   │   *
*  └─────────────┘  C      E   └─────────────┘  F      D   └─────────────┘   *
*                       │                           │                        *
\****************************************************************************/

const rulerKey = (fromPoint, toPoint) =>
  `${fromPoint.x}, ${fromPoint.y} => ${toPoint.x}, ${toPoint.y}`;

const generateRulers = (boxA, boxB) => {
  const verticalRulers = [];
  const horizontalRulers = [];

  // A (hovered box fully above selected box)
  if (boxB.points.bottom.y < boxA.points.top.y) {
    verticalRulers.push([boxB.points.bottom, boxA.points.top]);
  } else if (boxB.points.bottom.y < boxA.points.bottom.y) {
    // ? (hovered box partially above selected box)
    verticalRulers.push([boxB.points.bottom, boxA.points.bottom]);
  }

  // B (hovered box fully below selected box)
  if (boxB.points.top.y > boxA.points.bottom.y) {
    verticalRulers.push([boxB.points.top, boxA.points.bottom]);
  } else if (boxB.points.top.y > boxA.points.top.y) {
    // ? (hovered box partially below selected box)
    verticalRulers.push([boxB.points.top, boxA.points.top]);
  }

  // C (hovered box fully to the left of selected box)
  if (boxB.points.right.x < boxA.points.left.x) {
    horizontalRulers.push([boxB.points.right, boxA.points.left]);
  } else if (boxB.points.right.x < boxA.points.right.x) {
    // F (hovered box partially to the left of selected box)
    horizontalRulers.push([boxB.points.right, boxA.points.right]);
  }

  // D (hovered box fully to the right of selected box)
  if (boxB.points.left.x > boxA.points.right.x) {
    horizontalRulers.push([boxB.points.left, boxA.points.right]);
  } else if (boxB.points.left.x > boxA.points.left.x) {
    // E (hovered box partially to the right of selected box)
    horizontalRulers.push([boxB.points.left, boxA.points.left]);
  }

  return [
    ...verticalRulers.map(([fromPoint, toPoint]) => (
      <VerticalRuler
        fromPoint={fromPoint}
        toPoint={toPoint}
        key={rulerKey(fromPoint, toPoint)}
      />
    )),
    ...horizontalRulers.map(([fromPoint, toPoint]) => (
      <HorizontalRuler
        fromPoint={fromPoint}
        toPoint={toPoint}
        key={rulerKey(fromPoint, toPoint)}
      />
    ))
  ];
};

export const Rulers = ({ fromBox, toBox }) => {
  return <div className={`rulers`}>{generateRulers(fromBox, toBox)}</div>;
};

export const VerticalRuler = ({ fromPoint, toPoint }) => {
  const height = toPoint.y - fromPoint.y;
  const absHeight = Math.abs(height);

  return (
    <div
      className={`ruler ruler-y`}
      style={{
        top: `${height < 0 ? fromPoint.y - absHeight : fromPoint.y}px`,
        left: `${fromPoint.x}px`,
        height: `${absHeight}px`
      }}
    >
      <div className="ruler-text">{absHeight}px</div>
    </div>
  );
};

export const HorizontalRuler = ({ fromPoint, toPoint }) => {
  const width = toPoint.x - fromPoint.x;
  const absWidth = Math.abs(width);

  return (
    <div
      className={`ruler ruler-x`}
      style={{
        top: `${fromPoint.y}px`,
        left: `${width < 0 ? fromPoint.x - absWidth : fromPoint.x}px`,
        width: `${absWidth}px`
      }}
    >
      <div className="ruler-text">{absWidth}px</div>
    </div>
  );
};
