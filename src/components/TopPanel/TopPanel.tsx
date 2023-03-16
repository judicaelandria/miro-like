import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";

export const TopPanel = () => {
  return (
    <div className="w-full fixed top-3 inset-x-0 px-3 flex justify-between items-center z-[999]">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};
