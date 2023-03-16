import {
  Canvas,
  getUserData,
  TldrawEditor,
  TLInstance,
  useLocalSyncClient,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/editor.css";
import { PrimaryTool, TopPanel, ZoomMenu } from "~/components";

const instanceId = TLInstance.createCustomId("tl-miro");

export const Editor = () => {
  const userData = getUserData();
  const syncedStore = useLocalSyncClient({
    instanceId,
    userId: userData.id,
    universalPersistenceKey: "tl-miro",
  });
  return (
    <div className="fixed w-full h-full">
      <TldrawEditor
        instanceId={instanceId}
        userId={userData.id}
        store={syncedStore}
      >
        <Canvas />
        <TopPanel />
        <PrimaryTool />
        <ZoomMenu />
      </TldrawEditor>
    </div>
  );
};
