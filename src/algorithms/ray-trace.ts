/**
 *  背景色
 */
const BACKGROUND_COLOR: Color = {
  r: 0,
  g: 0,
  b: 0,
  a: 255,
};

/**
 *  颜色定义
 */
interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 *  点定义
 */
interface Point {
  x: number;
  y: number;
  z: number;
}
/**
 *  向量的表示，与点一样
 */
type Vector = Point;

/**
 *  2点求向量
 * @param p1
 * @param p2
 */
const vector = (p1: Point, p2: Point): Vector => {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
    z: p2.z - p1.z,
  };
};
/**
 *  点乘
 */
const dot = (v1: Vector, v2: Vector) => {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
};

/**
 *  微元的离散值设置
 */
type Divide = number;

/**
 *  相机大小
 */
interface Camera {
  width: number;
  height: number;
}

/**
 *  视口大小
 */
interface ViewPort {
  width: number;
  height: number;
  distance: number; // z轴，ViewPort与Camera的距离
}

/**
 * 球的定义
 */
interface Sphere {
  center: Point;
  radius: number;
  color: any;
}

/**
 *  场景抽象定义
 *   可以包含各种各样的几何形状，这里暂时定义个球
 */
interface Scene {
  sphere?: Sphere[];
}

/**
 *  相机到视口的坐标映射
 *  canvas坐标一定是2维的（是像素级坐标，canvas可以理解为人眼），视口也可以理解为人眼视野里的屏幕（在世界坐标里）。
 */
const switchCanvasToViewport = (
  x: number,
  y: number,
  camera: Camera,
  viewPort: ViewPort,
) => {
  return {
    x: (x * viewPort.width) / camera.width,
    y: (y * viewPort.height) / camera.height,
    z: viewPort.distance,
  };
};

/**
 *  射线与球求交
 */
const getIntersectionSphere = (
  origin: Point,
  direct: Point,
  sphere: Sphere,
) => {
  const r = sphere.radius;
  const vecOriginToCenter = vector(origin, sphere.center);

  const a = dot(direct, direct);
  const b = -2 * dot(vecOriginToCenter, direct);
  const c = dot(vecOriginToCenter, vecOriginToCenter) - r * r;

  const diff = b * b - 4 * a * c;
  // console.log(a, b, c, sphere, origin, direct, vecOriginToCenter, diff);
  if (diff < 0) {
    return { t1: Number.POSITIVE_INFINITY, t2: Number.POSITIVE_INFINITY };
  }
  const t1 = (-b + Math.sqrt(diff)) / (2 * a);
  const t2 = (-b - Math.sqrt(diff)) / (2 * a);
  return { t1, t2 };
};

/**
 *  光线追踪算法
 * @param origin 原点
 * @param Direct 方向
 * @param tmin 限制z方向，视线的延伸方向的范围
 * @param tmax 限制z方向，视线的延伸方向的范围
 */
const rayTrace = (
  origin: Point,
  direct: Point,
  tmin: number,
  tmax: number,
  scene: Scene,
): Color => {
  if (scene.sphere) {
    let mint = Number.POSITIVE_INFINITY;
    let minSphere: Sphere | null = null;
    scene.sphere.map((item) => {
      const { t1, t2 } = getIntersectionSphere(origin, direct, item);
      if (t1 < tmax && t1 > tmin && t1 < mint) {
        mint = t1;
        minSphere = item;
      }
      if (t2 < tmax && t2 > tmin && t2 < mint) {
        mint = t2;
        minSphere = item;
      }
    });
    if (minSphere) {
      return (minSphere as Sphere).color;
    } else {
      return BACKGROUND_COLOR;
    }
  }
  return BACKGROUND_COLOR;
};

/**
 *  光追的主流程
 * @param origin
 * @param canvasW
 * @param canvasH
 * @param viewPortW
 * @param viewPortH
 * @param distance
 * @param scene
 * @param ctx
 */
const pipe = (
  origin: Point,
  canvasW: number,
  canvasH: number,
  viewPortW: number,
  viewPortH: number,
  distance: number,
  scene: Scene,
  ctx: CanvasRenderingContext2D,
) => {
  const imgData = ctx.createImageData(canvasW, canvasH);
  let counter = 0;
  for (let i = 0; i < canvasW; i++) {
    for (let j = 0; j < canvasH; j++) {
      const direct = switchCanvasToViewport(
        i,
        j,
        { width: canvasW, height: canvasH },
        { width: viewPortW, height: viewPortH, distance },
      );
      // console.log('asdasd',origin,direct)
      const color = rayTrace(
        origin,
        vector(origin, direct),
        distance,
        Number.POSITIVE_INFINITY,
        scene,
      );
      // if(direct.x === 250 && direct.y ===250){
      //   console.log(color);
      //   debugger
      // }
      imgData.data[4 * counter] = color.r;
      imgData.data[4 * counter + 1] = color.g;
      imgData.data[4 * counter + 2] = color.b;
      imgData.data[4 * counter + 3] = color.a;
      counter++;
    }
  }
  ctx.putImageData(imgData, 0, 0);
};

export default pipe;
