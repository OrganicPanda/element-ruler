import { useState, useEffect } from "react";
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

export const useHoveredElement = () => {
  const mousePos = useMousePos();
  // Don't need the result, just need to trigger the calculation again on scroll
  const windowScrollPos = useWindowScrollPos();

  return {
    mousePos,
    el: mousePos ? document.elementFromPoint(mousePos.x, mousePos.y) : null
  };
};

export const useHoveredElementPosition = () => {
  const { mousePos, el } = useHoveredElement();

  return {
    mousePos,
    el,
    box: el ? box(el.getBoundingClientRect()) : null
  };
};

export const useSelectedElementPosition = hovered => {
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
