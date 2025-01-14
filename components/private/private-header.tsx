import { LogOutIcon, UserIcon, User2Icon } from "lucide-react";
import ChannelSwitcher from "./channel-switcher";
import { User } from "@/schema/users";
import { UserNav } from "./user-nav";
import { youtube_v3 } from "googleapis";

const items = [
  { title: "Profile", url: "/profile", icon: UserIcon },
  { title: "Sign out", url: "/signout", icon: LogOutIcon },
];

export function PrivateHeader({ user, channels, selectedChannelId }: { user: User, channels: youtube_v3.Schema$Channel[], selectedChannelId: string }) {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <ChannelSwitcher channels={channels} selectedChannelId={selectedChannelId} />
            {/* <MainNav className="mx-6" /> */}
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              <UserNav user={user} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
