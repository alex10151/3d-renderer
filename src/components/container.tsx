import pipe from "../algorithms/ray-trace.ts";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 *  容器
 * @returns
 */
const defaultSphere = { x: 250, y: 250, z: 0, r: 50 };
const Container = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState(0);
  const [sphere, setSphere] = useState(() => defaultSphere);

  useEffect(() => {
    let f: number | null = null;
    const loop = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          pipe(
            { x: 250, y: 250, z: 100 },
            canvasRef.current.width,
            canvasRef.current.height,
            canvasRef.current.width,
            canvasRef.current.height,
            state,
            {
              sphere: [
                {
                  center: { x: sphere.x, y: sphere.y, z: sphere.z },
                  radius: sphere.r,
                  color: { r: 0, g: 255, b: 0, a: 255 },
                },
              ],
            },
            ctx
          );
        }
      }
      f = requestAnimationFrame(loop);
    };
    f = requestAnimationFrame(loop);
    return () => {
      if (f) {
        cancelAnimationFrame(f);
      }
    };
  }, [sphere]);

  const loop = useCallback(
    () =>
      requestAnimationFrame(() => {
        if (state > 3) {
          return;
        }
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            pipe(
              { x: 250, y: 250, z: 100 },
              canvasRef.current.width,
              canvasRef.current.height,
              canvasRef.current.width,
              canvasRef.current.height,
              state,
              {
                sphere: [
                  // {
                  //   center: { x: sphere.x, y: sphere.y, z: sphere.z },
                  //   radius: sphere.r,
                  //   color: { r: 0, g: 255, b: 0, a: 255 },
                  // },
                  // {
                  //   center: { x: 0, y: -1, z: 3 },
                  //   radius: 1,
                  //   color: { r: 255, g: 0, b: 0, a: 255 },
                  // },
                  {
                    center: { x: 250, y: 250, z: 0 },
                    radius: 100,
                    color: { r: 0, g: 255, b: 0, a: 255 },
                  },
                  // {
                  //   center: { x: 3, y: 2, z: 1 },
                  //   radius: 5,
                  //   color: { r: 100, g: 100, b: 200, a: 255 },
                  // },
                ],
              },
              ctx
            );
            setState((s) => s + 1);
            ctx.font = "32px serif";
            ctx.textBaseline = "hanging";
            ctx.fillStyle = "#FFF";
            ctx.fillText(`State: ${state} `, 0, 0);
          }
        }
      }),
    [state, sphere]
  );
  // useEffect(() => {
  //   loop();
  // }, [loop]);
  return (
    <div>
      <canvas ref={canvasRef} width={500} height={500} />
      <div>
        center:x:{sphere.x} y:{sphere.y} z:{sphere.z}
      </div>
      <div>radius:{sphere.r}</div>
      <button
        onClick={(e) => {
          setSphere(() => defaultSphere);
        }}
      >
        reset
      </button>
      <input
        type="range"
        min={0}
        max={500}
        step={1}
        value={sphere.x}
        onChange={(e) => {
          setSphere((s) => ({ ...s, x: parseFloat(e.target.value) }));
        }}
      />
      <input
        type="range"
        min={0}
        max={500}
        step={1}
        value={sphere.y}
        onChange={(e) => {
          setSphere((s) => ({ ...s, y: parseFloat(e.target.value) }));
        }}
      />
      <input
        type="range"
        min={-50}
        max={50}
        step={1}
        value={sphere.z}
        onChange={(e) => {
          setSphere((s) => ({ ...s, z: parseFloat(e.target.value) }));
        }}
      />
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={sphere.r}
        onChange={(e) => {
          setSphere((s) => ({ ...s, r: parseFloat(e.target.value) }));
        }}
      />
    </div>
  );
};

export default Container;
