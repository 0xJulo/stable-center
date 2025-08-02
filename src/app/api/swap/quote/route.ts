import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const amount = searchParams.get("amount");
  const srcChainId = searchParams.get("srcChainId");
  const dstChainId = searchParams.get("dstChainId");
  const srcToken = searchParams.get("srcToken");
  const dstToken = searchParams.get("dstToken");

  if (!amount || !srcChainId || !dstChainId) {
    return NextResponse.json(
      {
        error: "Amount, source chain ID, and destination chain ID are required",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://stable-center-backend-production.up.railway.app/api/swap/quote?${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error getting quote:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
