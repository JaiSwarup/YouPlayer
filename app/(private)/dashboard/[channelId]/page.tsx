import { PrivateSidebar } from "@/components/private/private-sidebar";

type Props = {
    
};

export default function UserPage({  }: Props) {
    return (
        <div className="grid grid-cols-5">
            <PrivateSidebar playlists={[]} />
            <div className="col-span-4">
                <h1>Dashboard</h1>
            </div>
        </div>
    );
}