import { HtmlNode, HtmlNodeModel } from "@logicflow/core";

// Define the properties expected in data
type ChapterNodeProperties = {
  title?: string;
  label?: string;
  text?: string;
  thumbUrl?: string;
  status?: string; // "locked" | "completed" | "unlocked"
  originalY?: number;
};

class ChapterNodeModel extends HtmlNodeModel {
  setAttributes() {
    // Node rộng hơn một chút để khung thoáng hơn
    this.width = 288;
    this.height = 180;
    this.text.editable = false;
    this.text.draggable = false;
    // Anchors (Handles)
    this.anchorsOffset = [
      // [this.width / 2, 0], // Right (in visual 90deg rotation?) -> No, LF coordinates are standard.
      // visual: Top, Right, Bottom, Left.
      // ReactFlow: Left/Right handles.
      // Flow direction is LR.
      // LF: [x, y] relative to center? or absolute?
      // LF: getDefaultAnchor returns array of points.
    ];
  }

  // Define anchors (ports) - roughly Left and Right
  getDefaultAnchor() {
    const { width, x, y } = this;
    return [
      {
        x: x - width / 2,
        y: y,
        id: `${this.id}_left`,
        type: "left",
      },
      {
        x: x + width / 2,
        y: y,
        id: `${this.id}_right`,
        type: "right",
      },
    ];
  }
}

class ChapterNode extends HtmlNode {
  setHtml(rootEl: SVGForeignObjectElement) {
    const { properties } = this.props.model;
    const data = properties as ChapterNodeProperties;

    const title = data.label || data.title || data.text || "";
    const thumbUrl = data.thumbUrl || "https://picsum.photos/200/120";

    const el = document.createElement("div");
    el.className = "chapter-node-container";

    const { width, height } = this.props.model;
    const contentStyle = `
        width: ${width}px;
        height: ${height}px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        position: relative;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        background-image: url(/images/flow-node.png);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
        overflow: hidden;
    `;

    el.innerHTML = `
        <div style="${contentStyle}">
             <div style="width: 100%; flex: 1; padding: 1.2rem; padding-top: 1.8rem;">
                <img src="${thumbUrl}" alt="${title}" style="width: 100%; height: 124.8px; object-fit: cover; filter: ${
      !data.status ? "grayscale(100%)" : "none"
    };" />
             </div>
             
             ${
               title
                 ? `
                <div style="
                  background-color: white;
                  padding: 4px 8px;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                  border-top: 1px solid #e5e7eb;
                  display: flex;
                  align-items: center;
                  white-space: nowrap;
                  width: fit-content;
                  margin: auto;
                  position: relative;
                  top: -16px;
                ">
                    <span style="font-size: 12px; font-weight: bold; color: #1e3a8a; font-family: 'CondensedDisplay', sans-serif;">
                        ${title}
                    </span>
                </div>
                `
                 : ""
             }
        </div>
      `;

    rootEl.appendChild(el);
  }
}

export default {
  type: "chapter-node",
  view: ChapterNode,
  model: ChapterNodeModel,
};
