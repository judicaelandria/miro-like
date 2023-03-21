import { TldrawEditorConfig } from "@tldraw/tldraw";
import { CFrameShape, CFrameTool } from "./CFrame";

export const customConfig = new TldrawEditorConfig({
  tools: [CFrameTool],
  shapes: [CFrameShape],
  allowUnknownShapes: true,
});
