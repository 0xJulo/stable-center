
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CustomConnectButton from "@/components/ConnectButton";

export default function Header() {
    return (
        <header className=" fixed top-0 z-10 w-full flex justify-between items-center p-4">
            <h1>StableCenter</h1>
            <div className="flex items-center gap-2">
                {/* <Button className="font-medium py-2 px-4">
                    <Link href="/">All Investments</Link>
                </Button> */}
                <Button className="font-medium py-[1rem] px-4 bg-light-green">
                    <Link href="/my-investments">My Investments</Link>
                </Button>
                <CustomConnectButton />
            </div>
        </header>
    )
}