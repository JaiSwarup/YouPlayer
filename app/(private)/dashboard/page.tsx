import getChannels from "@/app/actions/getChannels";

export default async function Profile() {
  const channels = await getChannels()
  if (!channels) {
    return <p>Not logged in</p>;
  }
  // const { data: session, } = useSession();

  // if (!session) {
  //   return <p>Not logged in</p>;
  // }
  // console.log(session)

  return (
    <>

    </>
  );
}
