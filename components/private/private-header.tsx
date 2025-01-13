import { LogOutIcon, UserIcon, User2Icon } from "lucide-react";
import ChannelSwitcher from "./channel-switcher";
import MainNav from "./main-nav"
import Image from 'next/image';
import { User } from "@/schema/users";
import { UserNav } from "./user-nav";

const items = [
  { title: "Profile", url: "/profile", icon: UserIcon },
  { title: "Sign out", url: "/signout", icon: LogOutIcon },
];

export function PrivateHeader({ user }: { user: User }) {
  return (
    <>
    <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
          />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
          />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <ChannelSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              {/* <Search /> */}
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
