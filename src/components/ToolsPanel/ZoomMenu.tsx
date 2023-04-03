import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useApp } from "@tldraw/tldraw";
import { useCallback } from "react";
import { track } from "signia-react";
import { ShapeMenuButton } from "~/components/ShapeMenuButton";

export const ZoomMenu = track(() => {
  const app = useApp();
  const zoom = app.camera.z;

  const handleZoomIn = useCallback(() => app.zoomIn(app.screenCenter), [app]);
  const handleZoomOut = useCallback(() => app.zoomOut(app.screenCenter), [app]);

  return (
    <div className="fixed bottom-2 right-2 w-max h-9 bg-white dark:bg-dark-bg text-slate-900 dark:text-white shadow-lg flex items-center gap-4 z-[999] rounded p-1">
      <ShapeMenuButton className="h-full" onClick={handleZoomOut}>
        <MinusIcon className="w-6" />
      </ShapeMenuButton>
      <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
      <ShapeMenuButton className="h-full" onClick={handleZoomIn}>
        <PlusIcon className="w-6" />
      </ShapeMenuButton>
    </div>
  );
});
