import React from "react";

const DraggableCard = ({ type, img, label, onDragStart, className }) => {
  return (
    <div
      className={`border rounded-lg p-4 flex flex-col items-center gap-2 cursor-grab ${className}`}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      {img && <img src={img} alt={`${type}-img`} className="h-6 w-6" />}
      <span>{label}</span>
    </div>
  );
};

export default DraggableCard;
