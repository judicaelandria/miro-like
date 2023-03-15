import { Canvas, TldrawEditor, useApp } from "@tldraw/tldraw";
import "@tldraw/tldraw/editor.css";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  CursorArrowRaysIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  StopIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import { ShapeMenuButton } from "./ShapeMenuButton";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";
import { track } from "signia-react";

const Editor = () => {
  return (
    <div className="fixed w-full h-full">
      <TldrawEditor>
        <Canvas />
        <ShapeMenu />
        <ZoomMenu />
      </TldrawEditor>
    </div>
  );
};

type Tool = "draw" | "eraser" | "select" | "line";

const ZoomMenu = track(() => {
  const app = useApp();
  const zoomLevel = app.zoomLevel;

  const handleZoomIn = useCallback(() => app.zoomIn(app.screenCenter), [app]);
  const handleZoomOut = useCallback(() => app.zoomOut(app.screenCenter), [app]);

  return (
    <div className="fixed bottom-2 right-2 w-max h-9 bg-white shadow-lg flex items-center gap-4 z-[999] rounded p-1">
      <ShapeMenuButton className="h-full" onClick={handleZoomOut}>
        <MinusIcon className="w-6 text-slate-900" />
      </ShapeMenuButton>
      <span className="text-sm text-slate-900 font-medium">
        {zoomLevel * 100}%
      </span>
      <ShapeMenuButton className="h-full" onClick={handleZoomIn}>
        <PlusIcon className="w-6 text-slate-900" />
      </ShapeMenuButton>
    </div>
  );
});

const ShapeMenu = track(() => {
  const app = useApp();
  const isDrawActive = app.currentToolId === "draw";
  const isEraserActive = app.currentToolId === "eraser";
  const isCursorActive = app.currentToolId === "select";
  const canUndo = app.canUndo;
  const canRedo = app.canRedo;

  const handleSelectTool = useCallback(
    (tool: Tool) => app.setSelectedTool(tool),
    [app]
  );

  const handleUndo = useCallback(() => app.undo(), [app]);
  const handleRedo = useCallback(() => app.redo(), [app]);

  return (
    <div className="fixed left-2 top-[30%] h-max space-y-6 z-[999]">
      <div className="h-max p-1 bg-white shadow-lg flex flex-col">
        <ShapeMenuButton
          isActive={isCursorActive}
          onClick={() => handleSelectTool("select")}
          title="Select"
        >
          <CursorArrowRaysIcon className="w-6 text-black" />
        </ShapeMenuButton>
        <ShapeMenuButton
          isActive={isDrawActive}
          onClick={() => handleSelectTool("draw")}
          title="Pencil"
        >
          <PencilIcon className="w-6 text-black" />
        </ShapeMenuButton>
        <ShapeMenuButton
          isActive={isEraserActive}
          onClick={() => handleSelectTool("eraser")}
          title="Eraser"
        >
          <StopIcon className="w-6 text-black" />
        </ShapeMenuButton>
        <ShapeMenuButton
          isActive={app.currentToolId === "line"}
          onClick={() => handleSelectTool("line")}
          title="Line"
        >
          <WrenchIcon className="w-6 text-black" />
        </ShapeMenuButton>
      </div>
      <div className="h-max p-1 bg-white shadow-lg flex flex-col">
        <ShapeMenuButton title="Undo" onClick={handleUndo} disabled={!canUndo}>
          <ArrowUturnLeftIcon
            className={twMerge(
              "w-6 text-slate-900",
              !canUndo && "text-slate-300"
            )}
          />
        </ShapeMenuButton>
        <ShapeMenuButton title="Redo" onClick={handleRedo} disabled={!canRedo}>
          <ArrowUturnRightIcon
            className={twMerge(
              "w-6 text-slate-900",
              !canRedo && "text-slate-300"
            )}
          />
        </ShapeMenuButton>
      </div>
    </div>
  );
});

export default Editor;
