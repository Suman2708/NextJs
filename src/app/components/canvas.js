// "use client";
// import React, { useEffect, useRef } from "react";
// import { fabric } from "fabric";
// // import { Button } from "./ui/button"; // Adjust if needed

// export default function FabricCanvas() {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);
//   const fabricCanvas = useRef(null);

//   useEffect(() => {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: 652,
//       height: 650,
//       backgroundColor: "#fff",
//       preserveObjectStacking: true,
//     });
//     fabricCanvas.current = canvas;

//     const container = containerRef.current;
//     container.addEventListener("dragover", (e) => e.preventDefault());
//     container.addEventListener("drop", onDrop);

//     // When an object is selected, bring it to front
//     canvas.on("selection:created", bringToFront);
//     canvas.on("selection:updated", bringToFront);

//     return () => {
//       canvas.dispose();
//       container.removeEventListener("drop", onDrop);
//     };
//   }, []);

//   const bringToFront = (e) => {
//     const obj = e.selected?.[0];
//     if (obj) {
//       obj.bringToFront();
//       fabricCanvas.current.renderAll();
//     }
//   };

//   const onDrop = (e) => {
//     e.preventDefault();
//     const imageUrl = e.dataTransfer.getData("fabricImageSrc");
//     if (!imageUrl) return;

//     const rect = containerRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     fabric.Image.fromURL(
//       imageUrl,
//       (img) => {
//         img.set({
//           left: x,
//           top: y,
//           scaleX: 0.4,
//           scaleY: 0.4,
//           selectable: true,
//         });

//         img.setControlsVisibility({
//           mt: true,
//           mb: true,
//           ml: true,
//           mr: true,
//           bl: true,
//           br: true,
//           tl: true,
//           tr: true,
//           mtr: true,
//         });

//         fabricCanvas.current.add(img);
//         fabricCanvas.current.setActiveObject(img);
//         fabricCanvas.current.renderAll();
//       },
//       { crossOrigin: "anonymous" }
//     );
//   };

//   const handleReset = () => {
//     if (!fabricCanvas.current) return;
//     fabricCanvas.current.clear();
//     fabricCanvas.current.setBackgroundColor("#fff", () => {});
//   };

//   const handleSave = () => {
//     if (!fabricCanvas.current) return;
//     const dataUrl = fabricCanvas.current.toDataURL({
//       format: "png",
//       quality: 1,
//     });

//     const link = document.createElement("a");
//     link.download = "canvas.png";
//     link.href = dataUrl;
//     link.click();
//   };

//   const handleDelete = () => {
//     const canvas = fabricCanvas.current;
//     const activeObject = canvas?.getActiveObject();
//     if (activeObject) {
//       canvas.remove(activeObject);
//       canvas.discardActiveObject();
//       canvas.renderAll();
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <div
//   ref={containerRef}
//   className="canvas-highlight-zone border-3 border-dashed rounded shadow-lg transition-all duration-300"
// >
//   <canvas ref={canvasRef} />
// </div>


//       <div className="flex gap-4 mt-4">
//       <button onClick={handleReset} className="px-4 py-2 rounded bg-red-500 hover:bg-red-700 text-white cursor-pointer">
//         Reset Canvas
//       </button>
//       <button onClick={handleSave} className="px-4 py-2 rounded bg-green-500  hover:bg-green-700 text-white cursor-pointer" >
//         Save Image
//       </button>
//       <button  onClick={handleDelete} className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-700 text-white cursor-pointer">
//         Delete
//       </button>
//             </div>
//     </div>
//   );
// }








"use client";
import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { useDrop } from "react-dnd";
import { useCart } from "../context/cartContext";

export default function FabricCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const fabricCanvas = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 652, height: 650, backgroundColor: "#fff", preserveObjectStacking: true
    });
    fabricCanvas.current = canvas;

    containerRef.current.addEventListener("dragover", e => e.preventDefault());
    containerRef.current.addEventListener("drop", onDrop);
    canvas.on("selection:created", bringToFront);
    canvas.on("selection:updated", bringToFront);

    return () => {
      canvas.dispose();
      containerRef.current.removeEventListener("drop", onDrop);
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

    fabric.Image.fromURL(src, (img) => {
      img.set({ left: x, top: y, scaleX: 0.4, scaleY: 0.4, selectable: true });
      img.setControlsVisibility({
        mt: true, mb: true, ml: true, mr: true,
        bl: true, br: true, tl: true, tr: true, mtr: true
      });
      fabricCanvas.current.add(img);
      fabricCanvas.current.setActiveObject(img);
      fabricCanvas.current.requestRenderAll();
    }, { crossOrigin: "anonymous" });
  };

  const handleAddToCart = () => {
    const dataUrl = fabricCanvas.current.toDataURL({ format:'png', quality:0.8 });
    addToCart({ id: Date.now().toString(), snapshot: dataUrl });
    alert("Outfit added to cart!");
  };

  const handleClear = () => {
    fabricCanvas.current.clear();
    fabricCanvas.current.setBackgroundColor("#fff", () => {});
  };

  const handleDelete = () => {
    const obj = fabricCanvas.current.getActiveObject();
    if (obj) {
      fabricCanvas.current.remove(obj);
      fabricCanvas.current.discardActiveObject();
      fabricCanvas.current.requestRenderAll();
    }
  };

  return (
    <>
      <div ref={containerRef} className="border-2 border-dashed" style={{ width: 652, height: 650 }}>
        <canvas ref={canvasRef} />
      </div>
      <div className="flex gap-4 mt-4">
        <button onClick={handleAddToCart} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 cursor-pointer">Add Outfit to Cart</button>
        <button onClick={handleClear} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 cursor-pointer">Clear Canvas</button>
        <button onClick={handleDelete} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700 cursor-pointer">Delete Item</button>
      </div>
    </>
  );
}
