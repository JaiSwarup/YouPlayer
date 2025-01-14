import Image from "next/image"
import { youtube_v3 } from "googleapis"
import { cn } from "@/lib/utils"


interface ChannelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  playlist: youtube_v3.Schema$Playlist
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function PlaylistCard({
  playlist,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ChannelCardProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
          <div className="overflow-hidden rounded-md">
            <Image
              src={playlist.snippet?.thumbnails?.high?.url || ""}
              alt={playlist.snippet?.title || ""}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-contain transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{playlist?.snippet?.title}</h3>
        <p className="text-xs text-muted-foreground">{playlist?.snippet?.description}</p>
      </div>
    </div>
  )
}