import { createClient, EnsureJson } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

export type Presence = {
  cursor: { x: number; y: number } | null;
  user: EnsureJson<{ id: string; username: string }>;
};

const client = createClient({
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY as string,
});
export const {
  suspense: {
    RoomProvider,
    useOthers,
    useUpdateMyPresence,
    useStorage,
    useMutation,
    useSelf,
  },
} = createRoomContext<Presence, Storage>(client);
