import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  CursorArrowRaysIcon,
  DocumentTextIcon,
  PencilIcon,
  StopIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { useApp } from "@tldraw/tldraw";
import { ReactElement, useCallback, useEffect } from "react";
import { track } from "signia-react";
import { twMerge } from "tailwind-merge";
import { LineIcon } from "~/icons";
import { Tool } from "~/types";
import { ShapeMenuButton } from "../ShapeMenuButton";

export const PrimaryTool = track(() => {
  const app = useApp();
  const canUndo = app.canUndo;
  const canRedo = app.canRedo;

  const handleSelectTool = useCallback(
    (tool: Tool) => app.setSelectedTool(tool),
    [app]
  );

  const handleUndo = useCallback(() => app.undo(), [app]);
  const handleRedo = useCallback(() => app.redo(), [app]);

  /*   useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Delete":
        case "Backspace": {
          app.deleteShapes(app.selectedIds);
        }
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []); */

  const tools: { title: Tool; isActive: boolean; icon: ReactElement }[] = [
    {
      title: "select",
      isActive: app.currentToolId === "select",
      icon: <CursorArrowRaysIcon className="w-6 text-black" />,
    },
    {
      title: "draw",
      isActive: app.currentToolId === "draw",
      icon: <PencilIcon className="w-6 text-black" />,
    },
    {
      title: "eraser",
      isActive: app.currentToolId === "eraser",
      icon: <StopIcon className="w-6 text-black" />,
    },
    {
      title: "line",
      isActive: app.currentToolId === "line",
      icon: <LineIcon />,
    },
    {
      title: "note",
      isActive: app.currentToolId === "note",
      icon: <DocumentTextIcon className="w-6 text-black" />,
    },
    {
      title: "text",
      isActive: app.currentToolId === "text",
      icon: <span className="text-xl text-black">T</span>,
    },
    {
      title: "cframe",
      isActive: app.currentToolId === "cframe",
      icon: <WindowIcon className="w-6 text-black" />,
    },
  ];

  console.log(app.currentToolId);

  return (
    <div className="fixed left-2 top-[30%] h-max space-y-6 z-[999]">
      <div className="h-max p-1 bg-white shadow-lg flex flex-col">
        {tools.map((tool, id) => (
          <ShapeMenuButton
            key={id}
            isActive={tool.isActive}
            onClick={() => handleSelectTool(tool.title)}
            title={tool.title}
          >
            {tool.icon}
          </ShapeMenuButton>
        ))}
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
