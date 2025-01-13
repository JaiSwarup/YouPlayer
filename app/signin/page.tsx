import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex min-h-screen justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent>
            <form
              key={"google"}
              className="flex flex-col gap-2 items-center w-full"
              action={async () => {
                "use server";
                try {
                  await signIn("google", {
                    redirectTo: "/dashboard",
                  });
                } catch (error) {
                  if (error instanceof AuthError) {
                    return redirect(`/signin/?error=${error.type}`);
                  }
                  throw error;
                }
              }}
            >
              <Button className="w-full" type="submit">
                <span>Sign in with Google</span>
              </Button>
            </form>
            <Separator className="my-4" />
          {searchParams.error && (
            <p>Login failed</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
