import "~/styles/globals.css";
import type { AppProps } from "next/app";
import { RoomProvider } from "~/libs";
import { useId } from "react";
import { ClientSideSuspense } from "@liveblocks/react";

export default function App({ Component, pageProps }: AppProps) {
  const id = useId();
  return (
    <RoomProvider
      id={id}
      initialPresence={{
        cursor: null,
        user: { id: "NewUser", username: "New User" },
      }}
    >
      <ClientSideSuspense
        fallback={
          <div className="w-screen h-screen flex justify-center items-center">
            Loading...
          </div>
        }
      >
        {() => <Component {...pageProps} />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
