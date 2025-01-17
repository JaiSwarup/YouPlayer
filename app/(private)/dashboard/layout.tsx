import { SessionProvider } from "next-auth/react";
type Props = {
    children: React.ReactNode
};

export default function Layout({ children }: Props) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}