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

export default async function Page({
  params
} : {
  params: Promise<{channelId : string}>;
}) {
  const channels = await getChannels();
  const session = await auth();
  const channelId = (await params).channelId

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
    <div>
    <PrivateHeader user={userObj} channels={channels || []} selectedChannelId={channelId} />
    <div className="flex flex-col p-4 space-y-4">
      <h1 className="text-4xl text-center">Channels</h1>
      <div className="grid grid-cols-4 gap-4 justify-center items-center h-[calc(100vh-16rem)]">
        {channels?.map((channel) => (
          <Link key={channel.id} href={`/dashboard/${channel.id}`}>
            <ChannelCard channel={channel}
              className="w-[250px]"
              aspectRatio="square"
              width={150}
              height={130} />
          </Link>
        ))}
      </div>
    </div>
</div>
  );
}

