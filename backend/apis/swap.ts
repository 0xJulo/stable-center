import express from "express";
import {
  createFusionOrder,
  createCompleteFusionOrder,
} from "../1inch_fusion_order/createOrder";

const router = express.Router();

// Generic cross-chain swap endpoint with simulation support
router.post("/cross-chain", async (req, res) => {
  const {
    amount,
    srcToken,
    dstToken,
    srcChainId,
    dstChainId,
    simulate = false,
  } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  if (!srcChainId || !dstChainId) {
    return res
      .status(400)
      .json({ error: "Source and destination chain IDs are required" });
  }

  try {
    const result = await createFusionOrder({
      amount,
      srcTokenAddress: srcToken,
      dstTokenAddress: dstToken,
      srcChainId,
      dstChainId,
      simulate,
    });

    res.status(200).json({
      success: true,
      data: result,
      message: simulate
        ? "Order simulated successfully"
        : "Order created successfully",
    });
  } catch (err) {
    console.error("Error creating cross-chain swap:", err);
    res.status(500).json({
      success: false,
      error: (err as Error).message,
    });
  }
});

// Complete cross-chain swap with monitoring endpoint
router.post("/cross-chain/complete", async (req, res) => {
  const {
    amount,
    srcToken,
    dstToken,
    srcChainId,
    dstChainId,
    simulate = false,
  } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  if (!srcChainId || !dstChainId) {
    return res
      .status(400)
      .json({ error: "Source and destination chain IDs are required" });
  }

  try {
    const result = await createCompleteFusionOrder({
      amount,
      srcTokenAddress: srcToken,
      dstTokenAddress: dstToken,
      srcChainId,
      dstChainId,
      simulate,
    });

    res.status(200).json({
      success: true,
      data: result,
      message: simulate
        ? "Order simulation completed"
        : "Order completed successfully",
    });
  } catch (err) {
    console.error("Error creating complete cross-chain swap:", err);
    res.status(500).json({
      success: false,
      error: (err as Error).message,
    });
  }
});

// Get quote for cross-chain swap
router.get("/quote", async (req, res) => {
  const { amount, srcToken, dstToken, srcChainId, dstChainId } = req.query;

  console.log("🔍 Quote request received:");
  console.log("Query params:", {
    amount,
    srcToken,
    dstToken,
    srcChainId,
    dstChainId,
  });

  if (!amount || !srcChainId || !dstChainId) {
    return res.status(400).json({
      error: "Amount, source chain ID, and destination chain ID are required",
    });
  }

  try {
    // Use the existing createFusionOrder function with simulate=true to get a quote
    const { createFusionOrder } = await import(
      "../1inch_fusion_order/createOrder"
    );

    const result = await createFusionOrder({
      amount: amount as string,
      srcChainId: Number(srcChainId),
      dstChainId: Number(dstChainId),
      srcTokenAddress: srcToken as string,
      dstTokenAddress: dstToken as string,
      simulate: true,
    });

    console.log("✅ Quote received successfully");
    console.log("Quote data:", JSON.stringify(result, null, 2));

    res.status(200).json({
      success: true,
      data: {
        quote: result.quote,
        srcChainId: Number(srcChainId),
        dstChainId: Number(dstChainId),
        srcTokenAddress: srcToken as string,
        dstTokenAddress: dstToken as string,
        amount: amount as string,
      },
      message: "Quote retrieved successfully",
    });
  } catch (err: any) {
    console.error("❌ Error getting quote:");
    console.error("Error details:", err);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

export default router;
