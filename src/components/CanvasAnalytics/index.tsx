import { useEffect, useRef, useState } from "react";

const CanvasAnalytics = () => {
  const canvasRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;

    const data = [120, 200, 150, 80, 220, 180]; // Example dataset
    const maxDataValue = Math.max(...data);
    const barWidth = 100;
    const gap = 100;
    const startX = 50;
    const chartHeight = height - 50;
    const animationSpeed = 0.01;

    let progress = 0; // For animation
    const animate = () => {
      progress += animationSpeed; // Animation speed
      if (progress > 1) progress = 1;

      ctx.clearRect(0, 0, width, height); // Clear canvas

      // Draw bars
      data.forEach((value, index) => {
        const x = startX + index * (barWidth + gap);
        const barHeight = (value / maxDataValue) * chartHeight * progress; // Animate height

        ctx.fillStyle = hoveredIndex === index ? "#4CAF50" : "#3498db"; // Highlight on hover
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        // Draw text labels
        ctx.fillStyle = "#000";
        ctx.font = "14px Arial";
        ctx.fillText(value.toString(), x + 10, height - barHeight - 10);
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    animate();

    // Handle mouse hover
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      let hovered = null;
      data.forEach((_, index) => {
        const x = startX + index * (barWidth + gap);
        if (mouseX > x && mouseX < x + barWidth && mouseY > height - chartHeight) {
          hovered = index;
        }
      });

      setHoveredIndex(hovered);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    return () => canvas.removeEventListener("mousemove", handleMouseMove);
  }, [hoveredIndex]);

  return <canvas ref={canvasRef} width={window.innerWidth - 50} height={window.innerHeight - 100} style={{ border: "1px solid #ddd" }} />;
}

export default CanvasAnalytics
