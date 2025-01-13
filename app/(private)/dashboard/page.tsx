"use client"
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, } = useSession();

  if (!session) {
    return <p>Not logged in</p>;
  }
  console.log(session)

  return (
    <div>
      {/* <h1>Welcome, {session.user?.name}</h1> */}
      {/* <p>Access Token: {session.accessToken}</p> */}
    </div>
  );
}
