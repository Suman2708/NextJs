export default function DraggableItem({ image, alt }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("fabricImageSrc", image);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <img
  src={image}
  alt={alt}
  draggable="true"
  onDragStart={handleDragStart}
  className="w-20 h-20 object-contain cursor-grab transition-transform duration-200 hover:scale-130"
/>

  );
}

