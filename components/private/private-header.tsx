import { LogOutIcon, UserIcon, User2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "@/schema/users";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

const items = [
  { title: "Profile", url: "/profile", icon: UserIcon },
  { title: "Sign out", url: "/signout", icon: LogOutIcon },
];

export function PrivateHeader({ user }: { user: User }) {
  return (
    <header className="flex h-8 shrink-0 items-center gap-2 border-b fixed w-full z-20 justify-between bg-background">
      <div className="flex w-full justify-between items-center">
        <div className="font-mono font-bold px-2">
          <Link href="/">shadrizz</Link>
        </div>
        <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger  className="flex items-center gap-2 focus:outline-none hover:bg-muted h-8 px-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={user.image ?? undefined} />
                <AvatarFallback>
                  <User2Icon />
                </AvatarFallback>
              </Avatar>
              <div>{user.name}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {items.map((item) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link
                    key={item.title}
                    href={item.url}
                    className="flex text-sm items-center gap-2"
                  >
                    <item.icon className="flex-shrink-0 w-4 h-4" />
                    <span>{item.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}