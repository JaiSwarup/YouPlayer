import Image from "next/image"
import { youtube_v3 } from "googleapis"
import { cn } from "@/lib/utils"


interface ChannelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  channel: youtube_v3.Schema$Channel
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function ChannelCard({
  channel,
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
              src={channel.snippet?.thumbnails?.high?.url || ""}
              alt={channel.snippet?.title || ""}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-contain transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{channel?.snippet?.title}</h3>
        <p className="text-xs text-muted-foreground">{channel?.snippet?.description}</p>
      </div>
    </div>
  )
}