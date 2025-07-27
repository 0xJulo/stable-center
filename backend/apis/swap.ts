import express from "express";
import {
  createFusionOrder,
  createEthereumToNearSwap,
  createCompleteFusionOrder,
  createCompleteEthereumToNearSwap,
} from "../1inch_fusion_order/createOrder";

const router = express.Router();

// Original deposit endpoint (maintained for backward compatibility)
router.post("/deposit", async (req, res) => {
  const { amount, srcToken, dstToken, srcChainId, dstChainId } = req.body;

  try {
    const result = await createFusionOrder({
      amount,
      srcTokenAddress: srcToken,
      dstTokenAddress: dstToken,
      srcChainId,
      dstChainId,
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: (err as Error).message });
  }
});

// New Ethereum to NEAR swap endpoint
router.post("/ethereum-to-near", async (req, res) => {
  const { amount, srcToken, dstToken, simulate = false } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const result = await createEthereumToNearSwap({
      amount,
      srcToken,
      dstToken,
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
    console.error("Error creating Ethereum to NEAR swap:", err);
    res.status(500).json({
      success: false,
      error: (err as Error).message,
    });
  }
});

// Complete Ethereum to NEAR swap with monitoring endpoint
router.post("/ethereum-to-near/complete", async (req, res) => {
  const { amount, srcToken, dstToken, simulate = false } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const result = await createCompleteEthereumToNearSwap({
      amount,
      srcToken,
      dstToken,
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
    console.error("Error creating complete Ethereum to NEAR swap:", err);
    res.status(500).json({
      success: false,
      error: (err as Error).message,
    });
  }
});

// Simulate Ethereum to NEAR swap endpoint
router.post("/simulate/ethereum-to-near", async (req, res) => {
  const { amount, srcToken, dstToken } = req.body;

  if (!amount) {
    return res.status(400).json({ error: "Amount is required" });
  }

  try {
    const result = await createEthereumToNearSwap({
      amount,
      srcToken,
      dstToken,
      simulate: true,
    });

    res.status(200).json({
      success: true,
      data: result,
      message: "Order simulation completed",
    });
  } catch (err) {
    console.error("Error simulating Ethereum to NEAR swap:", err);
    res.status(500).json({
      success: false,
      error: (err as Error).message,
    });
  }
});

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

export default router;
