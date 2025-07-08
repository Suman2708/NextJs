"use client";
import { useDrag } from 'react-dnd';

const DraggableItem = ({ image, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type, // This is key!
    item: { image },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={image}
      alt="clothing"
      className="w-20 h-20 object-contain cursor-grab hover:scale-105 transition"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    />
  );
};

export default DraggableItem;
