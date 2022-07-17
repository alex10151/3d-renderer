import pipe from '../algorithms/ray-trace.ts';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 *  容器
 * @returns
 */
const Container = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState(0);
  const loop = useCallback(
    () =>
      requestAnimationFrame(() => {
        if (state > 3) {
          return;
        }
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            pipe(
              { x: 250, y: 250, z: 0 },
              canvasRef.current.width,
              canvasRef.current.height,
              canvasRef.current.width,
              canvasRef.current.height,
              state,
              {
                sphere: [
                  // {
                  //   center: { x: 0, y: -1, z: 3 },
                  //   radius: 1,
                  //   color: { r: 255, g: 0, b: 0, a: 255 },
                  // },
                  {
                    center: { x: 0, y: 250, z: 51 },
                    radius: 50,
                    color: { r: 0, g: 255, b: 0, a: 255 },
                  },
                  // {
                  //   center: { x: 3, y: 2, z: 1 },
                  //   radius: 5,
                  //   color: { r: 100, g: 100, b: 200, a: 255 },
                  // },
                ],
              },
              ctx,
            );
            setState((s) => s + 1);
            ctx.font = '32px serif';
            ctx.textBaseline = 'hanging';
            ctx.fillStyle = '#FFF';
            ctx.fillText(`State: ${state} `, 0, 0);
          }
        }
      }),
    [state],
  );
  useEffect(() => {
    loop();
  }, [loop]);
  return <canvas ref={canvasRef} width={500} height={500} />;
};

export default Container;
