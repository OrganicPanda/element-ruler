import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import {
  useMousePos,
  useWindowScrollPos,
  useHoveredElement,
  useHoveredElementPosition,
  useSelectedElementPosition
} from "./hooks";
import { Toolbar } from "./toolbar";
import { Rulers } from "./ruler";

const Box = ({ box, variant }) => {
  const boxMap = {
    hovered: "box-hovered",
    selected: "box-selected"
  };
  const variantClass = boxMap[variant] || boxMap.hovered;

  return (
    <div
      className={`box ${variantClass}`}
      style={{
        top: `${box.points.topLeft.y}px`,
        left: `${box.points.topLeft.x}px`,
        width: `${box.size.width}px`,
        height: `${box.size.height}px`
      }}
    />
  );
};

const Inspector = ({ hovered, selected }) => {
  const hasHovered = hovered && hovered.box;
  const hasSelected = selected && selected.box;
  const hasHoveredAndSelected = hasHovered && hasSelected;
  const hoveredAndSelectedEqual =
    hasHoveredAndSelected && hovered.el === selected.el;

  return (
    <>
      <div className="inspector">
        {hasHovered && <Box variant={"hovered"} box={hovered.box} />}
        {hasSelected && <Box variant={"selected"} box={selected.box} />}
        {hasHoveredAndSelected && (
          <Rulers fromBox={selected.box} toBox={hovered.box} />
        )}
      </div>
    </>
  );
};

export default function App() {
  const [enabled, setEnabled] = useState(true);
  const hovered = useHoveredElementPosition();
  const selected = useSelectedElementPosition(hovered);

  return (
    <div className="el-ruler-ext">
      <Toolbar
        enabled={enabled}
        setEnabled={setEnabled}
        hovered={hovered}
        selected={selected}
      />
      {enabled && <Inspector hovered={hovered} selected={selected} />}
    </div>
  );
}

const doc = window.document;
const root = doc.createElement("div");
doc.body.append(root);

ReactDOM.render(<App />, root);
