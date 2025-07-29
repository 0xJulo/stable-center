
"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import CustomConnectButton from "@/components/ConnectButton";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
    const { isConnected } = useAuth();
    return (
        <header className=" fixed top-0 z-10 w-full flex justify-between items-center p-4">
            <Link href="/">
                <h1 className="text-white hover:text-light-green text-2xl font-bold cursor-pointer">StableCenter</h1>
            </Link>
            <div className="flex items-center gap-2">
                {/* <Button className="font-medium py-2 px-4">
                    <Link href="/">All Investments</Link>
                </Button> */}
                {isConnected && (
                    <Button className="font-medium py-[1rem] px-4 bg-light-green">
                        <Link href="/my-investments">My Investments</Link>
                    </Button>
                )}
                <CustomConnectButton />
            </div>
        </header>
    )
}