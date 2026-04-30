import { useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";

const TechStack = ({ items, speed = 50, direction = "right" }) => {
  const [duplicatedItems, setDuplicatedItems] = useState([]);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [contentWidth, setContentWidth] = useState(0);

  // Duplicate items enough times to fill the viewport + extra for smooth loop
  useEffect(() => {
    // At least 4 copies to ensure seamless loop
    const copies = [...items, ...items, ...items, ...items];
    setDuplicatedItems(copies);
  }, [items]);

  // Measure the width of a single set of items
  useEffect(() => {
    if (containerRef.current) {
      const singleSetWidth = containerRef.current.scrollWidth / 4; // because we have 4 copies
      setContentWidth(singleSetWidth);
    }
  }, [duplicatedItems]);

  // Animate the x position
  useAnimationFrame((t, delta) => {
    if (!contentWidth) return;
    const step = (speed * delta) / 1000; // pixels per millisecond -> per frame
    let newX = x.get() - (direction === "left" ? step : -step);
    
    // Wrap around when we've scrolled the width of one full set
    if (Math.abs(newX) >= contentWidth) {
      newX = newX % contentWidth;
    }
    x.set(newX);
  });

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        ref={containerRef}
        className="flex gap-6"
        style={{ x }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="  flex-shrink-0   p-5 flex flex-col items-center   hover:scale-105 transition-all duration-300"
          >
            <div className="text-3xl mb-2" style={{ color: item.color }}>
              {typeof item.icon === "string" ? item.icon : item.icon}
            </div>
            <p className="font-medium text-gray-800">{item.name}</p>
           
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStack;