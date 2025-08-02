import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, srcChainId, dstChainId, srcToken, dstToken } = body;

    if (!amount || !srcChainId || !dstChainId) {
      return NextResponse.json(
        {
          error:
            "Amount, source chain ID, and destination chain ID are required",
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://stable-center-backend-production.up.railway.app/api/swap/cross-chain/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          srcChainId,
          dstChainId,
          srcToken,
          dstToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error completing cross-chain swap:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
