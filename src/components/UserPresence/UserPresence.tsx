import { Popover } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { getInitials, useSelf, useUpdateMyPresence } from "~/libs";

interface Props {
  username: string;
  connectionId: number;
}

export const UserPresence = ({ username, connectionId }: Props) => {
  const me = useSelf();
  const isMe = me.connectionId === connectionId;
  const updateMyPresence = useUpdateMyPresence();

  return (
    <Popover className="relative">
      <Popover.Button
        className={twMerge(
          "w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 hover:border-2 hover:border-blue-700 focus:border-2 focus:border-blue-700 duration-150",
          isMe &&
            "bg-purple-500 hover:border-purple-700 focus:border-purple-700"
        )}
      >
        <h3 className="text-sm text-white font-semibold">
          {getInitials(username)}
        </h3>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 bg-white shadow-lg right-0 rounded-md mt-2 w-max">
        {isMe ? (
          <div className="w-full flex justify-center">
            <span className="text-sm text-slate-900">You</span>
          </div>
        ) : null}
        {!isMe ? (
          <span className="text-sm text-black p-2 w-max">{username}</span>
        ) : (
          <input
            type="text"
            disabled={!isMe}
            value={username}
            className="p-1 focus:bg-slate-100 text-center bg-slate-50 w-max"
            onChange={(e) =>
              updateMyPresence({
                user: { username: e.target.value, id: me.presence.user.id },
              })
            }
          />
        )}
      </Popover.Panel>
    </Popover>
  );
};
