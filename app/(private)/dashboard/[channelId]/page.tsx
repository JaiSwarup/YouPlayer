import { PrivateSidebar } from "@/components/private/private-sidebar";
import {getPlaylists} from "@/app/actions/getPlaylists";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import { eq } from "drizzle-orm/expressions";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import getChannels from "@/app/actions/getChannels";
import { users } from "@/schema/users";
import Link from "next/link";
import { PrivateHeader } from "@/components/private/private-header";
import { ChannelCard } from "@/components/private/channel-card";
import { PlaylistCard } from "@/components/private/playlist-card";

export default async function UserPage({ params }: {
    params: Promise<{ channelId: string }>;
}) {
    const channelId = (await params).channelId;
    const playlists = await getPlaylists();
      const channels = await getChannels();
      const session = await auth();
    
      if (!session?.user?.id) {
        redirect("/signin");
      }
    
      const userObj = await db.query.users.findFirst({
        where: eq(users.id, session.user.id),
      });
    
      if (!userObj) {
        redirect("/signin");
      }
    
    return (
    <>
        <PrivateHeader user={userObj} channels={channels || []} selectedChannelId={channelId} />
        <div className="grid grid-cols-5">
            <PrivateSidebar playlists={playlists || []} />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Listen Now
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {playlists?.map((list) => (
                              <PlaylistCard
                                key={list.snippet?.title}
                                playlist={list}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                                />
                                ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                </div>
              </div>
        </div>
    </>
    );
}