import {
  ArrowUpTrayIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export const LeftPanel = () => {
  return (
    <div className="bg-white h-12 shadow-lg p-3 rounded-md flex items-center gap-6">
      <h2 className="text-slate-900 text-xl font-bold">Tlmiro</h2>
      <h2 className="text-slate-900 text-base">Made with Tldraw</h2>
      <div className="flex items-center gap-6">
        <Cog6ToothIcon className="w-6 text-slate-900" />
        <ArrowUpTrayIcon className="w-6 text-slate-900" />
        <MagnifyingGlassIcon className="w-6 text-slate-900" />
      </div>
    </div>
  );
};
