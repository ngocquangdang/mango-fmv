import { PolylineEdge, PolylineEdgeModel, h } from "@logicflow/core";

class CustomEdgeModel extends PolylineEdgeModel {
  setAttributes() {
    // Set radius để bo tròn các góc của edge
    // LogicFlow PolylineEdgeModel hỗ trợ radius property
    this.radius = 5000; // Tăng radius để góc bo tròn hơn (tự động limit bởi độ dài cạnh)
  }

  getEdgeStyle() {
    const style = super.getEdgeStyle();
    const { properties } = this;
    const data = properties as Record<string, any>;
    const isLocked = !data.status;

    style.strokeWidth = isLocked ? 2 : 5;
    style.stroke = isLocked ? "#3b82f6" : "#f97316"; // Blue-500 vs Orange-500

    style.strokeLinecap = "round";
    style.strokeLinejoin = "round";
    style.fill = "none";
    // style.filter = "url(#scribble-filter)"; // Still breaking on Safari/iOS despite optimization
    return style;
  }

  // Ẩn hoàn toàn mũi tên đầu/cuối edge
  getArrowStyle() {
    const style = super.getArrowStyle() as any;
    style.endArrowType = "none";
    style.startArrowType = "none";
    style.stroke = "none";
    style.fill = "none";
    return style;
  }
}

class CustomEdge extends PolylineEdge {
  // Override getShape để modify path với rounded corners
  getShape() {
    const { model } = this.props;
    const { pointsList, points } = model as any;
    const pointsArray = Array.isArray(pointsList) ? pointsList : (Array.isArray(points) ? points : []);
    const radius = (model.radius as number) || 100;

    if (!pointsArray || pointsArray.length < 2) {
      return super.getShape();
    }

    const style = model.getEdgeStyle();
    
    // Tạo 2 đường path hơi lệch nhau để giả hiệu ứng vẽ tay (sketch)
    // Đường 1: Chính
    const path1 = this.createScribblePath(pointsArray, radius, 1.5);
    // Đường 2: Phụ, mỏng và nhạt hơn (tạo hiệu ứng chì phác thảo)
    const path2 = this.createScribblePath(pointsArray, radius, 2.5);

    return h("g", {}, [
      // Background path cho tương tác (click/hover)
      h("path", {
        d: path1,
        stroke: "transparent",
        strokeWidth: 20,
        fill: "none"
      }),
      // Nét vẽ chính
      h("path", {
        d: path1,
        ...style,
        fill: "none"
      }),
      // Nét phác thảo phụ
      h("path", {
        d: path2,
        ...style,
        strokeWidth: (style.strokeWidth as number) / 2,
        opacity: 0.4,
        fill: "none"
      })
    ]);
  }

  // Helper tạo tọa độ ngẫu nhiên nhỏ
  private getJitter(intensity: number): number {
    return (Math.random() - 0.5) * intensity;
  }

  // Hàm tạo path tích hợp cả bo góc và hiệu ứng run tay (scribble)
  // Thuật toán: Vẽ từng đoạn thẳng (có jitter) nối tiếp bằng các góc bo (smooth)
  createScribblePath(points: Array<{ x: number; y: number }>, radius: number, jitter: number): string {
    if (points.length < 2) return "";

    let path = `M ${points[0].x} ${points[0].y}`;
    let currentPos = { x: points[0].x, y: points[0].y };

    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1]; // Điểm trước
      const p2 = points[i];     // Điểm hiện tại (có thể là góc cua)
      const p3 = points[i + 1]; // Điểm tiếp theo

      const dx1 = p2.x - p1.x;
      const dy1 = p2.y - p1.y;
      const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

      if (dist1 < 0.1) continue;

      // Tính radius hiệu dụng cho góc cua tại p2
      let r = 0;
      if (p3) {
        const dx2 = p3.x - p2.x;
        const dy2 = p3.y - p2.y;
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        r = Math.min(radius, dist1 / 2, dist2 / 2);
      }

      // Điểm bắt đầu của góc bo
      const curveStart = {
        x: p2.x - (dx1 / dist1) * r,
        y: p2.y - (dy1 / dist1) * r
      };

      // 1. Vẽ đoạn thẳng có độ rung từ currentPos tới curveStart
      const dxStraight = curveStart.x - currentPos.x;
      const dyStraight = curveStart.y - currentPos.y;
      const distStraight = Math.sqrt(dxStraight * dxStraight + dyStraight * dyStraight);

      if (distStraight > 1) {
        const subSegments = Math.max(1, Math.floor(distStraight / 20));
        for (let j = 1; j <= subSegments; j++) {
          const t = j / subSegments;
          // Jitter = 0 tại điểm cuối (curveStart) để khớp với góc bo
          const currentJitter = j === subSegments ? 0 : jitter;
          const tx = currentPos.x + dxStraight * t;
          const ty = currentPos.y + dyStraight * t;
          path += ` L ${tx + this.getJitter(currentJitter)} ${ty + this.getJitter(currentJitter)}`;
        }
      } else {
        path += ` L ${curveStart.x} ${curveStart.y}`;
      }

      // 2. Nếu có điểm p3, vẽ góc bo tới curveEnd
      if (p3) {
        const dx2 = p3.x - p2.x;
        const dy2 = p3.y - p2.y;
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        const curveEnd = {
          x: p2.x + (dx2 / dist2) * r,
          y: p2.y + (dy2 / dist2) * r
        };

        // Góc bo vẽ mượt, không jitter để tránh gãy nét
        path += ` Q ${p2.x} ${p2.y} ${curveEnd.x} ${curveEnd.y}`;
        currentPos = curveEnd;
      } else {
        currentPos = p2;
      }
    }

    return path;
  }
}

export default {
  type: "chapter-edge",
  model: CustomEdgeModel,
  view: CustomEdge,
};
