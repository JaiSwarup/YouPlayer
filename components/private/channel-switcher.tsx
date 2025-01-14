"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"
import { youtube_v3 } from "googleapis";
import { useParams, useRouter } from "next/navigation"

interface Channel {
  kind: "youtube#channel",
  etag: string,
  id: string,
  snippet: {
    title: string,
    description: string,
    customUrl: string,
    publishedAt: Date,
    thumbnails: {
      (key:any): {
        url: string,
        width: number,
        height: number
      }
    },
  },
  // "statistics": {
  //   "viewCount": number,
  //   "subscriberCount": number,  // this value is rounded to three significant figures
  //   "hiddenSubscriberCount": boolean,
  //   "videoCount": number
  // },
}

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface ChannelSwitcherProps extends PopoverTriggerProps {
  channels: youtube_v3.Schema$Channel[]
  selectedChannelId: string
}

export default function ChannelSwitcher({ className,
  channels,
  selectedChannelId,
 }: ChannelSwitcherProps) {
  const router = useRouter();
  const selectedChannel = channels.find((channel) => channel.id === selectedChannelId) || channels[0]
  const [open, setOpen] = React.useState(false)


  return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a Channel"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={selectedChannel.snippet?.thumbnails?.default?.url || undefined}
                alt={selectedChannel.snippet?.title || undefined}
                // className="grayscale"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedChannel.snippet?.title}
            <ChevronsUpDown className="ml-auto opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search channel" />
            <CommandList>
              <CommandEmpty>No team found.</CommandEmpty>
              {channels.map((channel) => (
                    <CommandItem
                      key={channel.id}
                      onSelect={() => {
                        setOpen(false)
                        router.push(`/dashboard/${channel.id}`)
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={channel.snippet?.thumbnails?.default?.url || undefined}
                          alt={channel.snippet?.title || undefined}
                          // className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {channel.snippet?.title}
                      <Check
                        className={cn(
                          "ml-auto",
                          selectedChannelId === channel.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
            </CommandList>
            <CommandSeparator />
          </Command>
        </PopoverContent>
      </Popover>
  )
}