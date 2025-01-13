import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col justify-center h-screen">
      <Header />
      <main className="flex flex-col flex-1 gap-5 w-72 m-auto justify-center">
        <h1 className="text-7xl font-bold font-mono">Youtube Playlist Manageer</h1>
        <Link href="/dashboard">
          <Button className="w-full" variant="outline">
            <LayoutDashboardIcon /> User Dashboard
          </Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
