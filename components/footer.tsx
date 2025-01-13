import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="container flex mx-auto h-14 items-center justify-center">
        <Link
          href="/"
          className="underline"
          target="_blank"
        >
          Youtube Playlist Manager
        </Link>
      </div>
    </footer>
  );
}
