import { eq } from "drizzle-orm/expressions";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import getChannels from "@/app/actions/getChannels";
import { users } from "@/schema/users";
import { PrivateHeader } from "@/components/private/private-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const channels = await getChannels();

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
      <PrivateHeader user={userObj} channels={channels || []} />
        {children}
    </div>
  );
}

export const dynamic = "force-dynamic";
