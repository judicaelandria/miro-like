import { UserIcon } from "@heroicons/react/24/outline";

export const RightPanel = () => {
  return (
    <div className="bg-white dark:bg-dark-bg h-12 shadow-lg p-3 rounded-md flex items-center gap-6">
      <UserIcon className="w-6 text-slate-900 dark:text-white" />
    </div>
  );
};
