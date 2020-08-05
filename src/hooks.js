import { useState, useEffect, useRef } from "react";
import { box } from "./util";

export const useMousePos = () => {
  const [pos, setPos] = useState(null);

  function handleMouseMove({ clientX, clientY }) {
    setPos({
      x: clientX,
      y: clientY
    });
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return pos;
};

export const useWindowScrollPos = () => {
  const [pos, setPos] = useState(null);

  function handleScroll(e) {
    setPos({
      x: document.body.scrollLeft,
      y: document.body.scrollTop
    });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return pos;
};

const closestEl = (x, y, excluded) => {
  return document
    .elementsFromPoint(x, y)
    .filter(el => el !== excluded && !excluded.contains(el))[0];
};

export const useHoveredElement = excluded => {
  const mousePos = useMousePos();
  // Don't need the result, just need to trigger the calculation again on scroll
  const windowScrollPos = useWindowScrollPos();

  return {
    mousePos,
    el: mousePos ? closestEl(mousePos.x, mousePos.y, excluded) : null
  };
};

export const useElementPosition = element => {
  if (!element) return null;

  const { mousePos, el } = element;

  return {
    mousePos,
    el,
    box: el ? box(el.getBoundingClientRect()) : null
  };
};

export const useSelectedElement = hovered => {
  const [selected, setSelected] = useState(null);

  function handleClick() {
    setSelected(hovered);
  }

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  });

  return selected;
};
