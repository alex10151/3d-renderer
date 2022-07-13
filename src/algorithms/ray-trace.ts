


/**
 *  数值范围
 */
interface Range {
    from: number;
    to: number;
}

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
};


/**
 *  相机到视口的坐标映射
 */
const switchCanvasToViewport = (x: number, y: number, camera: Camera, viewPort: ViewPort) => {
    return {
        x: x * viewPort.width / camera.width,
        y: y * viewPort.height / camera.height,
        z: viewPort.distance
    }
}

/**
 * 
 * @param xRange
 * @param yRange 
 * @param divide 
 */
const rayTrace = (xRange: Range, yRange: Range, divide: Divide) => {
    

}
export default rayTrace;