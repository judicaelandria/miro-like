import {
  Canvas,
  getUserData,
  TldrawEditor,
  TldrawUi,
  TLInstance,
  useLocalSyncClient,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/editor.css";
import { Cursor, PrimaryTool, TopPanel, ZoomMenu } from "~/components";
import { useOthers, useUpdateMyPresence } from "~/libs";
import { customConfig } from "../shapes";

const instanceId = TLInstance.createCustomId("tl-miro");

// still need to register the cframe to the tools
export const Editor = () => {
  const others = useOthers();
  const userData = getUserData();
  const syncedStore = useLocalSyncClient({
    instanceId,
    userId: userData.id,
    universalPersistenceKey: "tl-miro",
    config: customConfig,
  });
  const updateMyPresence = useUpdateMyPresence();

  return (
    <div
      className="fixed w-full h-full"
      onPointerMove={(e) => {
        updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } });
      }}
      onPointerLeave={() => updateMyPresence({ cursor: null })}
    >
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
        {others.map(({ connectionId, presence }) =>
          presence.cursor ? (
            <Cursor presence={presence} key={connectionId} />
          ) : null
        )}
      </TldrawEditor>
    </div>
  );
};
