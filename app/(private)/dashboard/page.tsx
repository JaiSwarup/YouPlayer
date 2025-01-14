import React from "react";
import getChannels from "@/app/actions/getChannels";
import {
  Card, 
  CardContent,
  CardDescription,
  CardTitle
} from "@/components/ui/card";
import { AvatarImage,
  Avatar
 } from "@/components/ui/avatar";
import Link from "next/link";

export default async function Page() {
  const channels = await getChannels();
  // console.log(channels);

  return (
    <div className="flex flex-col p-4 space-y-4">
      <h1 className="text-4xl text-center">Channels</h1>
      <div className="grid grid-cols-4 gap-4 justify-center items-center h-[calc(100vh-16rem)]">
        {channels?.map((channel) => (
          <Link key={channel.id} href={`/dashboard/${channel.id}`} className="flex flex-col justify-center items-center">
            <Card className="grid grid-rows-3 p-2  hover:bg-foreground hover:text-background">
              <Avatar className="row-span-2 flex flex-col justify-center items-center h-full w-full p-2 relative rounded-none ">
                <AvatarImage src={channel.snippet?.thumbnails?.high?.url || undefined} className="object-cover" />
              </Avatar>
              <CardContent className="row-span-1 flex flex-col justify-center items-center p-0">
                <CardTitle>{channel.snippet?.title}</CardTitle>
                <CardDescription>{channel.snippet?.description || "Your Description here..."}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

