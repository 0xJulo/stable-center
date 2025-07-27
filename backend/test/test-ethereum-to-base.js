const axios = require("axios");

// Configuration for cross-chain tests
const API_BASE_URL = "http://localhost:3001";
const AMOUNT = "3000000"; // 3 USDC (6 decimals)
const SRC_CHAIN_ID = 1; // Ethereum
const DST_CHAIN_ID = 8453; // Base

// Test 1: Get quote for Ethereum to Base swap
async function testGetQuote() {
  console.log("\n💰 Testing: Get quote for 3 USDC Ethereum to Base swap");

  const requestParams = {
    amount: AMOUNT,
    srcChainId: SRC_CHAIN_ID,
    dstChainId: DST_CHAIN_ID,
    srcToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC on Ethereum
    dstToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
  };

  console.log("📤 Making request to:", `${API_BASE_URL}/api/swap/quote`);
  console.log("📋 Request params:", JSON.stringify(requestParams, null, 2));

  try {
    const response = await axios.get(`${API_BASE_URL}/api/swap/quote`, {
      params: requestParams,
    });
    console.log("✅ Quote received:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("❌ Error getting quote:");
    console.error("Status:", error.response?.status);
    console.error("Status Text:", error.response?.statusText);
    console.error("Response Data:", error.response?.data);
    console.error("Error Message:", error.message);
    throw error;
  }
}

// Test 2: Simulate the swap (safe test)
async function testSimulateSwap() {
  console.log("\n🧪 Testing: Simulate 3 USDC Ethereum to Base swap");
  try {
    const response = await axios.post(`${API_BASE_URL}/api/swap/cross-chain`, {
      amount: AMOUNT,
      srcChainId: SRC_CHAIN_ID,
      dstChainId: DST_CHAIN_ID,
      simulate: true,
      srcToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC on Ethereum
      dstToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
    });
    console.log(
      "✅ Simulation result:",
      JSON.stringify(response.data, null, 2)
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error simulating swap:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Test 3: Create actual swap (WARNING: This will create a real order!)
async function testCreateSwap() {
  console.log("\n⚠️  WARNING: This will create a REAL swap order!");
  console.log("Press Ctrl+C to cancel, or wait 5 seconds to continue...");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log("\n🚀 Testing: Create actual 3 USDC Ethereum to Base swap");
  try {
    const response = await axios.post(`${API_BASE_URL}/api/swap/cross-chain`, {
      amount: AMOUNT,
      srcChainId: SRC_CHAIN_ID,
      dstChainId: DST_CHAIN_ID,
      simulate: false,
      srcToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC on Ethereum
      dstToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
    });
    console.log(
      "✅ Swap order created:",
      JSON.stringify(response.data, null, 2)
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error creating swap:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Test 4: Create complete swap with monitoring
async function testCompleteSwap() {
  console.log(
    "\n⚠️  WARNING: This will create a REAL swap order and monitor it!"
  );
  console.log("Press Ctrl+C to cancel, or wait 5 seconds to continue...");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log(
    "\n🔄 Testing: Create complete 3 USDC Ethereum to Base swap with monitoring"
  );
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/swap/cross-chain/complete`,
      {
        amount: AMOUNT,
        srcChainId: SRC_CHAIN_ID,
        dstChainId: DST_CHAIN_ID,
        simulate: false,
        srcToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC on Ethereum
        dstToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base
      }
    );
    console.log(
      "✅ Complete swap result:",
      JSON.stringify(response.data, null, 2)
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error creating complete swap:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Test 5: Test different chain combinations including BSC
async function testDifferentChains() {
  console.log("\n🔗 Testing different chain combinations");

  const testCases = [
    {
      name: "Ethereum to Base",
      srcChainId: 1,
      dstChainId: 8453,
      srcToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      dstToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    },
    {
      name: "Ethereum to Avalanche",
      srcChainId: 1,
      dstChainId: 43114,
      srcToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      dstToken: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    },
    {
      name: "Ethereum to BSC",
      srcChainId: 1,
      dstChainId: 56,
      srcToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      dstToken: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    },
    {
      name: "Base to Ethereum",
      srcChainId: 8453,
      dstChainId: 1,
      srcToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      dstToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
    {
      name: "BSC to Ethereum",
      srcChainId: 56,
      dstChainId: 1,
      srcToken: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      dstToken: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    },
    {
      name: "Base to BSC",
      srcChainId: 8453,
      dstChainId: 56,
      srcToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      dstToken: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    },
  ];

  for (const testCase of testCases) {
    console.log(`\n🧪 Testing: ${testCase.name}`);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/swap/quote`, {
        params: {
          amount: "1000000", // 1 USDC
          srcChainId: testCase.srcChainId,
          dstChainId: testCase.dstChainId,
          srcToken: testCase.srcToken,
          dstToken: testCase.dstToken,
        },
      });
      console.log("   ✅ SUCCESS - Quote received");
      console.log(
        `   📊 Estimated amount: ${response.data.data.quote.estimatedAmount}`
      );
    } catch (error) {
      console.log("   ❌ FAILED");
      console.log(
        `   💬 Error: ${error.response?.data?.error || error.message}`
      );
    }
  }
}

// Main test runner
async function runTests() {
  console.log("🚀 Starting Cross-Chain Swap Tests");
  console.log("==================================");
  console.log(`Amount: ${AMOUNT} (3 USDC)`);
  console.log(`Source Chain: ${SRC_CHAIN_ID} (Ethereum)`);
  console.log(`Destination Chain: ${DST_CHAIN_ID} (Base)`);
  console.log("==================================\n");

  try {
    // Run tests in sequence
    await testGetQuote();
    await testSimulateSwap();
    await testDifferentChains();

    // Uncomment the lines below to test real swaps (WARNING: These create real orders!)
    // await testCreateSwap();
    // await testCompleteSwap();

    console.log("\n✅ All tests completed successfully!");
  } catch (error) {
    console.error("\n❌ Test failed:", error.message);
    process.exit(1);
  }
}

// Run the tests
runTests();
