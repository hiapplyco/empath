
import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isRecording: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isRecording }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    const draw = () => {
      if (!isRecording) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw a simple pulsing circle when recording
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 10 + Math.sin(Date.now() / 200) * 5;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgb(147, 51, 234)'; // Tailwind purple-600
      ctx.fill();
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isRecording]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      width={300}
      height={100}
    />
  );
};
