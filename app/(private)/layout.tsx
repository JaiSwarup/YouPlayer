import { eq } from "drizzle-orm/expressions";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { PrivateSidebar } from "@/components/private/private-sidebar";
import { users } from "@/schema/users";
import { PrivateHeader } from "@/components/private/private-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div>
      <PrivateHeader user={userObj} />
      <div>
        <PrivateSidebar />
        <div className="flex flex-col ml-8 sm:ml-40">
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
