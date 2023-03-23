import { Presence } from "~/libs";

interface CursorProps {
  presence: Presence;
}

export const Cursor = ({ presence }: CursorProps) => {
  return (
    <div
      className="absolute flex flex-col items-center z-[999]"
      style={{
        transform: `translate(${presence!.cursor!.x}px, ${
          presence!.cursor!.y
        }px)`,
      }}
    >
      <img src="https://liveblocks.io/images/cursor.svg" />
      <span className="text-sm text-black">{presence.user.username}</span>
    </div>
  );
};
