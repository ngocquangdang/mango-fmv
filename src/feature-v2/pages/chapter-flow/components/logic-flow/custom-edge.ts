import { PolylineEdge, PolylineEdgeModel } from "@logicflow/core";

class CustomEdgeModel extends PolylineEdgeModel {
  getEdgeStyle() {
    const style = super.getEdgeStyle();
    const { properties } = this;
    const data = properties as Record<string, any>;
    const isLocked = !data.status;

    style.strokeWidth = isLocked ? 2 : 5;
    style.stroke = isLocked ? "#3b82f6" : "#f97316"; // Blue-500 vs Orange-500

    style.strokeLinecap = "round";
    style.strokeLinejoin = "round";
    (style as any).radius = 50;
    style.fill = "none";
    style.filter = "url(#scribble-filter)";
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

class CustomEdge extends PolylineEdge {}

export default {
  type: "chapter-edge",
  model: CustomEdgeModel,
  view: CustomEdge,
};
