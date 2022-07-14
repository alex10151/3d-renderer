import pipe from '../algorithms/ray-trace.ts';
import { useEffect, useRef } from 'react';

/**
 *  容器
 * @returns
 */
const Container = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dpr = window.devicePixelRatio;
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        pipe(
          { x: 0, y: 0, z: 0 },
          canvasRef.current.width * dpr,
          canvasRef.current.height * dpr,
          canvasRef.current.width * dpr,
          canvasRef.current.height * dpr,
          50,
          {
            sphere: [
              {
                center: { x: 0, y: 125, z: 125 },
                radius: 500,
                color: { r: 255, g: 0, b: 0, a: 255 },
              },
              {
                center: { x: 125, y: 0, z: 125 },
                radius: 20,
                color: { r: 0, g: 255, b: 0, a: 255 },
              },
              {
                center: { x: 3, y: 2, z: 1 },
                radius: 5,
                color: { r: 100, g: 100, b: 200, a: 255 },
              },
            ],
          },
          ctx,
        );
      }
    }
  }, []);
  return <canvas ref={canvasRef} width={500} height={500} />;
};

export default Container;
