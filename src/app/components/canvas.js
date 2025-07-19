"use client";
import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useDrop } from "react-dnd";
import { useCart } from "../context/cartContext";

export default function FabricCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const fabricCanvas = useRef(null);
  const { addToCart, updateQuantity } = useCart();

  useEffect(() => {
  const lastSnapshot = localStorage.getItem("lastCanvasSnapshot");
  if (lastSnapshot && fabricCanvas.current) {
    fabric.Image.fromURL(lastSnapshot, (img) => {
      fabricCanvas.current.add(img);
      fabricCanvas.current.renderAll();
    });
  }
}, []);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 652,
      height: 650,
      backgroundColor: "#fff",
      preserveObjectStacking: true,
    });
    fabricCanvas.current = canvas;

    if (containerRef.current) {
      containerRef.current.addEventListener("dragover", (e) => e.preventDefault());
      containerRef.current.addEventListener("drop", onDrop);
    }

    canvas.on("selection:created", bringToFront);
    canvas.on("selection:updated", bringToFront);

    return () => {
      canvas.dispose();
      if (containerRef.current) {
        containerRef.current.removeEventListener("drop", onDrop);
      }
    };
  }, []);

  const bringToFront = ({ selected }) => {
    if (selected?.[0]) {
      selected[0].bringToFront();
      fabricCanvas.current.renderAll();
    }
  };

const onDrop = (e) => {
  e.preventDefault();
  const src = e.dataTransfer.getData("fabricImageSrc");
  if (!src) return;

  const rect = containerRef.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  fabric.Image.fromURL(
    src,
    (img) => {
      const canvasWidth = fabricCanvas.current.getWidth();
      const targetWidth = canvasWidth * 0.2;
      const scaleFactor = targetWidth / img.width;

      img.set({
        left: x,
        top: y,
        scaleX: scaleFactor,
        scaleY: scaleFactor,
        originX: "center",
        originY: "center",
        selectable: true,
      });

      img.setControlsVisibility({
        mt: true,
        mb: true,
        ml: true,
        mr: true,
        bl: true,
        br: true,
        tl: true,
        tr: true,
        mtr: true,
      });

      fabricCanvas.current.add(img);
      fabricCanvas.current.setActiveObject(img);
      fabricCanvas.current.requestRenderAll();

      // ✅ Update quantity in localStorage
      const existing = JSON.parse(localStorage.getItem("cartQuantities") || "{}");
      const updated = {
        ...existing,
        [src]: (existing[src] || 0) + 1
      };
      localStorage.setItem("cartQuantities", JSON.stringify(updated));

      // ✅ Optional: update state too (if using useState-based cart)
      updateQuantity(src, 1);  // This should be defined in your context
    },
    { crossOrigin: "anonymous" }
  );
};

const handleAddToCart = () => {
  const dataUrl = fabricCanvas.current.toDataURL({ format: "png", quality: 0.8 });

  // Get all image srcs used on canvas
  const usedImageSrcs = fabricCanvas.current.getObjects()
    .filter(obj => obj.type === "image" && obj._element?.src)
    .map(obj => obj._element.src);

  addToCart(dataUrl, usedImageSrcs); // ✅ pass image srcs
  alert("Saved Outfit!");
};

// 
  const handleClear = () => {
    const objects = fabricCanvas.current.getObjects();
    objects.forEach((obj) => {
      if (obj.type === "image" && obj._element?.src) {
        updateQuantity(obj._element.src, 0);
      }
    });
    fabricCanvas.current.clear();
    fabricCanvas.current.setBackgroundColor("#fff", () => {});
  };

const handleDelete = () => {
  const canvas = fabricCanvas.current;
  const activeObject = canvas.getActiveObject();

  if (activeObject && activeObject.type === "image") {
    const src = activeObject._element?.src;

    if (src) {
      // 🔽 1. Remove from localStorage
      const existing = JSON.parse(localStorage.getItem("cartQuantities") || "{}");
      if (existing[src]) {
        if (existing[src] <= 1) {
          delete existing[src];
        } else {
          existing[src] -= 1;
        }
        localStorage.setItem("cartQuantities", JSON.stringify(existing));
      }

      // 🔽 2. Update context
      updateQuantity(src, -1);

      // 🔽 3. Remove image from canvas
      canvas.remove(activeObject);
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  } else {
    alert("Please select an image to delete.");
  }
};



  return (
    <>
      <div
        ref={containerRef}
        className="border-2 border-dashed"
        style={{ width: 652, height: 650 }}
      >
        <canvas ref={canvasRef} />
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleAddToCart}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          Save Outfit
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer"
        >
          Clear Canvas
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700 cursor-pointer"
        >
          Delete Item
        </button>
      </div>
    </>
  );
}
