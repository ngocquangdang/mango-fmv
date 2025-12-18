import { RectNode, RectNodeModel, h } from "@logicflow/core";

type ChapterNodeProperties = {
  title?: string;
  label?: string;
  text?: string;
  thumbUrl?: string;
  status?: string;
};

class SafariChapterNodeModel extends RectNodeModel {
  setAttributes() {
    this.width = 240;
    this.height = 150;
    this.text.editable = false;
    this.text.draggable = false;
  }
}

class SafariChapterNode extends RectNode {
  getShape() {
    const { model } = this.props;
    const { x, y, width, height, properties } = model;
    const data = properties as ChapterNodeProperties;

    const title = data.label || data.title || data.text || "";
    const thumbUrl = data.thumbUrl || "https://picsum.photos/200/120";
    const isLocked = !data.status;

    const cardX = x - width / 2;
    const cardY = y - height / 2;

    const paddingX = 16;
    const paddingTop = 24;
    const imageHeight = 104;

    const imageX = cardX + paddingX;
    const imageY = cardY + paddingTop;
    const imageWidth = width - paddingX * 2;

    const chipWidth = width * 0.8;
    const chipHeight = 24;
    const chipX = x - chipWidth / 2;
    // Nằm chồng lên phần dưới của ảnh giống version HTML (top: -16px)
    const chipY = imageY + imageHeight - chipHeight / 2;

    const groupChildren: any[] = [];

    // Nền card: dùng image flow-node.png để giống HTML version
    groupChildren.push(
      h("image", {
        href: "/images/flow-node.png",
        x: cardX,
        y: cardY,
        width,
        height,
        preserveAspectRatio: "none",
      })
    );

    // Thumbnail
    groupChildren.push(
      h("image", {
        href: thumbUrl,
        x: imageX,
        y: imageY,
        width: imageWidth,
        height: imageHeight,
        preserveAspectRatio: "xMidYMid slice",
        style: isLocked ? "opacity:0.5;" : "opacity:1;",
      })
    );

    if (title) {
      // Chip nền trắng dưới ảnh
      groupChildren.push(
        h("rect", {
          x: chipX,
          y: chipY,
          width: chipWidth,
          height: chipHeight,
          rx: 4,
          ry: 4,
          fill: "#ffffff",
          stroke: "#e5e7eb",
          strokeWidth: 1,
          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
        })
      );

      // Text tiêu đề
      groupChildren.push(
        h(
          "text",
          {
            x,
            y: chipY + chipHeight / 2,
            textAnchor: "middle",
            dominantBaseline: "middle",
            fill: "#1e3a8a",
            fontSize: 12,
            fontWeight: 700,
          },
          title
        )
      );
    }

    // Thêm onClick handler vào group để trigger LogicFlow node click event
    const handleClick = (e: MouseEvent | TouchEvent) => {
      // e.stopPropagation();
      // Trigger LogicFlow's node:click event thông qua graphModel
      console.log("handleClick", e);
      const graphModel = (this as any).graphModel || (this.props as any).graphModel;
      if (graphModel && graphModel.eventCenter) {
        graphModel.eventCenter.emit("node:click", {
          data: model,
          e,
        });
      }
    };

    return h(
      "g",
      {
        onClick: handleClick,
        onTouchEnd: handleClick,
        style: { cursor: "pointer" },
      },
      groupChildren
    );
  }
}

// LƯU Ý: type vẫn là "chapter-node" để có thể thay thế HtmlNode trên Safari
export default {
  type: "chapter-node",
  view: SafariChapterNode,
  model: SafariChapterNodeModel,
};


