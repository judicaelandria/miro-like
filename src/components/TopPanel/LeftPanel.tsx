import { ArrowUpTrayIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useApp, useExportAs } from "@tldraw/tldraw";
import { useCallback } from "react";

export const LeftPanel = () => {
  const app = useApp();
  const exportAs = useExportAs();
  const handleExport = useCallback(() => {
    exportAs(app.selectedIds, "png");
  }, []);
  return (
    <div className="bg-white h-12 shadow-lg p-3 rounded-md flex items-center gap-6">
      <h2 className="text-slate-900 text-xl font-bold">Tlmiro</h2>
      <h2 className="text-slate-900 text-sm md:text-base">Made with Tldraw</h2>
      <div className="flex items-center gap-6">
        <Cog6ToothIcon className="w-6 text-slate-900" />
        <button
          className="w-max border-none"
          title="export"
          aria-label="export"
          onClick={handleExport}
        >
          <ArrowUpTrayIcon className="w-6 text-slate-900" />
        </button>
      </div>
    </div>
  );
};
