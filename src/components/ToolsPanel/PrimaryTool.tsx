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
import { ReactElement, useCallback, useEffect } from "react";
import { track } from "signia-react";
import { twMerge } from "tailwind-merge";
import { LineIcon } from "~/icons";
import { Tool } from "~/types";
import { ShapeMenuButton } from "../ShapeMenuButton";

export const getActiveToolId = (app: App) => {
  const activeTool = app.root.current.value;
  let activeToolId = activeTool?.id;
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

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Delete":
        case "Backspace": {
          const isInput = ["input", "textarea"].includes(
            document.activeElement!.tagName.toLowerCase()
          );
          if (!isInput) app.deleteShapes();
        }
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const tools: { title: Tool; icon: ReactElement }[] = [
    {
      title: "select",
      icon: <CursorArrowRaysIcon className="w-6" />,
    },
    {
      title: "draw",
      icon: <PencilIcon className="w-6" />,
    },
    {
      title: "eraser",
      icon: <StopIcon className="w-6" />,
    },
    {
      title: "line",
      icon: <LineIcon />,
    },
    {
      title: "note",
      icon: <DocumentTextIcon className="w-6" />,
    },
    {
      title: "text",
      icon: <span className="text-xl">T</span>,
    },
    {
      title: "cframe",
      icon: <WindowIcon className="w-6" />,
    },
  ];

  return (
    <div className="fixed left-2 top-[30%] h-max space-y-6 z-[999]">
      <div className="h-max p-1 bg-white dark:bg-dark-bg shadow-lg flex flex-col">
        {tools.map((tool, id) => (
          <ShapeMenuButton
            key={id}
            isActive={getActiveToolId(app) === tool.title}
            onClick={() => handleSelectTool(tool.title)}
            title={tool.title}
            className="[&>*]:dark:text-white [&>*]:text-black"
          >
            {tool.icon}
          </ShapeMenuButton>
        ))}
      </div>
      <div className="h-max p-1 bg-white dark:bg-dark-bg shadow-lg flex flex-col">
        <ShapeMenuButton title="Undo" onClick={handleUndo} disabled={!canUndo}>
          <ArrowUturnLeftIcon
            className={twMerge(
              "w-6 text-slate-900 dark:text-white",
              !canUndo && "text-slate-300 dark:text-slate-500"
            )}
          />
        </ShapeMenuButton>
        <ShapeMenuButton title="Redo" onClick={handleRedo} disabled={!canRedo}>
          <ArrowUturnRightIcon
            className={twMerge(
              "w-6 text-slate-900 dark:text-white",
              !canRedo && "text-slate-300 dark:text-slate-500"
            )}
          />
        </ShapeMenuButton>
      </div>
    </div>
  );
});
