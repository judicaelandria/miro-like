import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  CursorArrowRaysIcon,
  DocumentTextIcon,
  PencilIcon,
  StopIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { App, useApp } from "@tldraw/tldraw";
import { ReactElement, useCallback } from "react";
import { track } from "signia-react";
import { twMerge } from "tailwind-merge";
import { LineIcon } from "~/icons";
import { Tool } from "~/types";
import { ShapeMenuButton } from "../ShapeMenuButton";

export const getActiveToolId = (app: App) => {
  const activeTool = app.root.current.value;
  let activeToolId = activeTool?.id;

  // Often a tool will transition into one of the following select states after the initial pointerdown: 'translating', 'resizing', 'dragging_handle'
  // It should then supply the tool id to the `onInteractionEnd` property to tell us which tool initially triggered the interaction.
  // If tool lock mode is on then tldraw will switch to the given tool id.
  // If tool lock mode is off then tldraw will switch back to the select tool when the interaction ends.

  // There is currently no way to enable tool lock for a specific tool only. We will add that as an option soon!
  if (activeToolId === "select") {
    const currentChildState = activeTool?.current.value as any;
    activeToolId = currentChildState?.info?.onInteractionEnd ?? "select";
  }

  return activeToolId;
};

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

  const tools: { title: Tool; icon: ReactElement }[] = [
    {
      title: "select",
      icon: <CursorArrowRaysIcon className="w-6 text-black" />,
    },
    {
      title: "draw",
      icon: <PencilIcon className="w-6 text-black" />,
    },
    {
      title: "eraser",
      icon: <StopIcon className="w-6 text-black" />,
    },
    {
      title: "line",
      icon: <LineIcon />,
    },
    {
      title: "note",
      icon: <DocumentTextIcon className="w-6 text-black" />,
    },
    {
      title: "text",
      icon: <span className="text-xl text-black">T</span>,
    },
    {
      title: "cframe",
      icon: <WindowIcon className="w-6 text-black" />,
    },
  ];

  return (
    <div className="fixed left-2 top-[30%] h-max space-y-6 z-[999]">
      <div className="h-max p-1 bg-white shadow-lg flex flex-col">
        {tools.map((tool, id) => (
          <ShapeMenuButton
            key={id}
            isActive={getActiveToolId(app) === tool.title}
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
