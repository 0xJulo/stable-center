
"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UserStats from "@/components/my-investments/UserStats"
import AllInvestments from "@/components/global/AllInvestments";
import OpenInvestments from "@/components/my-investments/OpenInvestments";
import { useAuth } from "@/hooks/useAuth";

export default function MyInvestmentsPage() {
    const { isConnected, isLoading } = useAuth();
    const router = useRouter();

    // Redirect if not authenticated
    useEffect(() => {
        if (!isLoading && !isConnected) {
            router.push('/?auth-required=true');
        }
    }, [isConnected, isLoading, router]);

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="bg-background font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen w-full px-8 pb-20 gap-16 sm:px-20">
                <main className="flex flex-col gap-[32px] row-start-2 items-center w-full max-w-6xl">
                    <div className="text-white text-xl">Loading...</div>
                </main>
            </div>
        );
    }

    // Don't render content if not connected (additional safety)
    if (!isConnected) {
        return null;
    }
    return (
        <div className="bg-background font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen w-full px-8 pb-20 gap-16 sm:px-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-start w-full">
                <h1 className="text-[5.25rem] leading-[5.25rem] font-bold text-light-green mb-6 mt-12">My Investments</h1>
                <UserStats />
                <OpenInvestments />
                <AllInvestments id="all-investments" manage={true} />
            </main>
        </div>
    );
}