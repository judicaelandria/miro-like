import { Canvas, TldrawEditor } from "@tldraw/tldraw";
import "@tldraw/tldraw/editor.css";
import { PrimaryTool, TopPanel, ZoomMenu } from "~/components";

export const Editor = () => {
  return (
    <div className="fixed w-full h-full">
      <TldrawEditor>
        <Canvas />
        <TopPanel />
        <PrimaryTool />
        <ZoomMenu />
      </TldrawEditor>
    </div>
  );
};
