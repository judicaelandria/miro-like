import {
  Canvas,
  getUserData,
  TldrawEditor,
  TldrawUi,
  TLInstance,
  useLocalSyncClient,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/editor.css";
import { PrimaryTool, TopPanel, ZoomMenu } from "~/components";
import { customConfig } from "../shapes";

const instanceId = TLInstance.createCustomId("tl-miro");

// still need to register the cframe to the tools
export const Editor = () => {
  const userData = getUserData();
  const syncedStore = useLocalSyncClient({
    instanceId,
    userId: userData.id,
    universalPersistenceKey: "tl-miro",
    config: customConfig,
  });

  return (
    <div className="fixed w-full h-full">
      <TldrawEditor
        instanceId={instanceId}
        config={customConfig}
        store={syncedStore}
        userId={userData.id}
      >
        <TldrawUi>
          <Canvas />
          <TopPanel />
        </TldrawUi>
        <PrimaryTool />
        <ZoomMenu />
      </TldrawEditor>
    </div>
  );
};
