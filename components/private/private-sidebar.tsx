import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { youtube_v3 } from "googleapis"
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: youtube_v3.Schema$Playlist[]
}

export function PrivateSidebar({ className, 
  playlists
 }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Playlists
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist.snippet?.title}-${i}`}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  {playlist.snippet?.title}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}