import { useOthers, useSelf } from "~/libs";
import { UserPresence } from "../UserPresence";

export const RightPanel = () => {
  const others = useOthers();
  const me = useSelf();
  const max = 2;

  return (
    <div className="h-max p-3 rounded-md flex items-center gap-6">
      <div className="flex gap-2">
        <UserPresence
          username={me.presence.user.username}
          connectionId={me.connectionId}
        />
        {others.slice(0, max).map(({ connectionId, presence }) => (
          <UserPresence
            key={connectionId}
            username={presence.user.username}
            connectionId={connectionId}
          />
        ))}
        {others.length > max ? (
          <div className="rounded-full flex justify-center items-center bg-light-blue text-primary z-[999] w-8 h-8">
            + {others.length - max}
          </div>
        ) : null}
      </div>
    </div>
  );
};
