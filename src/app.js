import React from "react";
import ReactDOM from "react-dom";
import { useState, useRef } from "react";
import KeyHandler, { KEYPRESS } from "react-key-handler";
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
    <div className="inspector">
      {hasHovered && <Box variant={"hovered"} box={hovered.box} />}
      {hasSelected && <Box variant={"selected"} box={selected.box} />}
      {hasHoveredAndSelected && (
        <Rulers fromBox={selected.box} toBox={hovered.box} />
      )}
    </div>
  );
};

export const App = () => {
  const [enabled, setEnabled] = useState(true);
  const [debug, setDebug] = useState(false);
  const elRef = useRef(null);
  const hovered = useHoveredElementPosition(elRef.current);
  const selected = useSelectedElementPosition(hovered);

  return (
    <div ref={elRef} className="el-ruler-ext">
      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="r"
        onKeyHandle={e => {
          if (e.repeat) return;

          setEnabled(!enabled);
        }}
      />

      <KeyHandler
        keyEventName={KEYPRESS}
        keyValue="d"
        onKeyHandle={e => {
          if (e.repeat) return;

          setDebug(!debug);
        }}
      />

      {enabled && debug && (
        <Toolbar
          enabled={enabled}
          setEnabled={setEnabled}
          hovered={hovered}
          selected={selected}
        />
      )}
      {enabled && <Inspector hovered={hovered} selected={selected} />}
    </div>
  );
};

const rootId = "element-ruler-extension";
const getRoot = () => document.getElementById(rootId);
const createRoot = () => {
  const el = document.createElement("div");
  el.id = rootId;
  document.body.append(el);
  return el;
};
const removeRoot = () => getRoot().remove();

export const mount = () => {
  const el = getRoot();

  if (el) return;

  ReactDOM.render(<App />, createRoot());
};

export const unmount = () => {
  const el = getRoot();

  if (!el) return;

  ReactDOM.unmountComponentAtNode(el);
  removeRoot();
};
