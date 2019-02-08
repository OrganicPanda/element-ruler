import React from "react";
import { elementDescription } from "./util";

export const ToolbarDetails = ({ item, variant }) => {
  const variantMap = {
    hovered: "toolbar-details-hovered-item",
    selected: "toolbar-details-selected-item"
  };
  const toolbarVariant = variantMap[variant] || variantMap.hovered;

  return (
    <div className={`toolbar-details-item ${toolbarVariant}`}>
      <div className="toolbar-details-item-title">
        {item && elementDescription(item.el)}
      </div>
      <pre className="toolbar-details-item-position">
        {item && JSON.stringify(item.box, null, 2)}
      </pre>
    </div>
  );
};

export const Toolbar = ({ enabled, setEnabled, hovered, selected }) => {
  return (
    <div className="toolbar">
      <div className="toolbar-info">This is the toolbar</div>
      <div className="toolbar-controls">
        <label>
          <input
            name="enabled"
            type="checkbox"
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
          />
          <span>{enabled ? "🐵" : "🙈"}</span>
        </label>
      </div>
      <div className="toolbar-details">
        <ToolbarDetails item={selected} variant={"selected"} />
        <ToolbarDetails item={hovered} variant={"hovered"} />
      </div>
    </div>
  );
};
