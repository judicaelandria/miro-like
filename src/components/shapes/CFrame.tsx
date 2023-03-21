import {
  TLBoxTool,
  TLFrameShape,
  TLBoxUtil,
  HTMLContainer,
  defineShape,
  TLBaseShape,
  TLOpacityType,
  TLShapeType,
  TLShape,
} from "@tldraw/tldraw";

type CFrameShape = TLBaseShape<
  "cframe",
  {
    w: number;
    h: number;
    opacity: TLOpacityType;
    color?: string;
  } & TLFrameShape["props"]
>;
export const CFrameShape = defineShape<CFrameShape>({
  type: "cframe",
  getShapeUtil: () => CFrameUtil,
});

export class CFrameUtil extends TLBoxUtil<CFrameShape> {
  static type = "cframe";

  override canBind = () => true;
  override canEdit = () => true;

  override defaultProps(): CFrameShape["props"] {
    return {
      h: 400,
      w: 200,
      opacity: "1",
      name: "Untitled Frame",
      color: "#ffffff",
    };
  }

  override canReceiveNewChildrenOfType = (_type: TLShapeType) => {
    return true;
  };

  override canDropShapes = (
    _shape: CFrameShape,
    _shapes: TLShape[]
  ): boolean => {
    return true;
  };

  // need to add the method that let us drop a shape

  override onDragShapesOut = (_shape: CFrameShape, shapes: TLShape[]): void => {
    this.app.reparentShapes(
      shapes.map((shape) => shape.id),
      this.app.currentPageId
    );
  };

  render(shape: CFrameShape) {
    return (
      <HTMLContainer
        id={shape.id}
        className="border border-slate-400 rounded relative"
        style={{ pointerEvents: "all", backgroundColor: shape.props.color }}
      >
        <div className="absolute left-0 -top-10 flex items-center gap-6 z-[999]">
          <input
            type="text"
            className="bg-inherit w-max p-1 rounded focus:bg-slate-200"
            defaultValue={shape.props.name}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // sending us back to edit mode
                e.stopPropagation();
                e.currentTarget.blur();
              }
            }}
            onInput={(e) => {
              this.app.updateShapes([
                {
                  id: shape.id,
                  type: shape.type,
                  props: { name: e.currentTarget.value ?? "Untitled Frame" },
                },
              ]);
            }}
          />
          <input
            type="color"
            className="rounded-full w-9 h-9"
            value={shape.props.color}
            onInput={(e) => {
              this.app.updateShapes([
                {
                  id: shape.id,
                  type: shape.type,
                  props: { color: e.currentTarget.value },
                },
              ]);
            }}
          />
        </div>
      </HTMLContainer>
    );
  }

  indicator(shape: CFrameShape) {
    const bounds = this.getBounds(shape);
    return <rect width={bounds.w} height={bounds.h} />;
  }
}

export class CFrameTool extends TLBoxTool {
  static id = "cframe";
  static initial = "idle";
  shapeType = "cframe";
}
