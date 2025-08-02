/*

    This component is used whenever a user clicks to invest or manage their
    investment, such as withdrawing or adding funds.

    It is used within the OpenInvestmentCard and InvestmentCard components.

*/

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowDown, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import { useCrossChainSwap } from "@/hooks/useCrossChainSwap";
import { useMorphoInvestment } from "@/lib/morpho-utils";

// These props determine which view the user sees
// The component is then structure based off this initial type prop.

interface InvestmentInteractionProps {
  type: "invest" | "manage";
}

// The header remains the same for both views, it should be hooked up to what the name of
// the investment is, and other information such as APY, platform, asset etc

function InvestHeader() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="leading-none">Invest in (name) by (investment name)</h3>
      <div className="flex flex-row text-light-green gap-4">
        <p className="text-[0.8rem]">Estimated APY: (7.07%)</p>
        <p className="text-[0.8rem]">Platform: (Morpho)</p>
        <p className="text-[0.8rem]">Network: (Base)</p>
        <p className="text-[0.8rem]">Asset: (USDC)</p>
      </div>
    </div>
  );
}

// Component to show the user what chain they are currently connected to

function CurrentChain() {
  const chainId = useChainId();

  const getChainName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return "Ethereum";
      case 8453:
        return "Base";
      case 10:
        return "Optimism";
      default:
        return "Unknown";
    }
  };

  return (
    <Card className="bg-[#102E37] border border-[#B5CAA9/20] gap-4 items-start p-3">
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-white" />
        <p className="text-white text-1rem">
          You are currently connected to {getChainName(chainId)}
        </p>
      </div>
    </Card>
  );
}

// Component to show if the user has unclaimed rewards that they can claim
// This is used when the type prop is "manage"

function ClaimRewards() {
  return (
    <Card className="flex flex-row bg-[#102E37] border border-[#B5CAA9/20] gap-4 items-center justify-between p-3">
      <div className="flex items-center gap-2 w-full">
        <Info className="w-4 h-4 text-white" />
        <p className="text-white text-1rem">
          You have $100.00 in unclaimed rewards
        </p>
      </div>
      <Button className="text-[1rem] h-10 bg-light-green text-black font-medium py-[1rem] cursor-pointer">
        Claim
      </Button>
    </Card>
  );
}

// Progress component for cross-chain swap
function SwapProgress({ swapState }: { swapState: any }) {
  if (swapState.status === "idle") return null;

  return (
    <Card className="bg-[#102E37] border border-[#B5CAA9/20] p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          {swapState.status === "error" ? (
            <Info className="w-4 h-4 text-red-400" />
          ) : (
            <Loader2 className="w-4 h-4 text-light-green animate-spin" />
          )}
          <p className="text-white text-sm font-medium">{swapState.message}</p>
        </div>

        <Progress
          value={swapState.progress}
          max={100}
          showSpinner={
            swapState.status === "swapping" || swapState.status === "investing"
          }
        />

        {swapState.error && (
          <p className="text-red-400 text-sm">{swapState.error}</p>
        )}

        {swapState.swapHash && (
          <p className="text-gray-400 text-xs">
            Swap Hash: {swapState.swapHash.slice(0, 10)}...
            {swapState.swapHash.slice(-8)}
          </p>
        )}
      </div>
    </Card>
  );
}

// Button component that can change based on where it is used
// It is currently utilised across all the different view of the component
// This will need to be hooked up to functions to perform the different actions

interface ButtonSectionProps {
  buttonText: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

function ButtonSection({
  buttonText,
  onClick,
  disabled = false,
  loading = false,
}: ButtonSectionProps) {
  return (
    <div>
      <div className="flex flex-col gap-4 mt-6">
        {/* <h3>Invest Steps</h3> */}
        <p>You may be prompted to sign multiple transactions.</p>
        <Button
          className="w-full text-[1.25rem] h-12 bg-light-green text-black font-medium py-[1rem] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onClick}
          disabled={disabled || loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              In Progress...
            </div>
          ) : (
            buttonText
          )}
        </Button>
      </div>
    </div>
  );
}

// Component for the base of investing in a pool
// This will need to be update so that it shows the correct information
// such as what assets they can use, and also the name of the pool

function InvestSteps({
  amount,
  setAmount,
  selectedAsset,
  setSelectedAsset,
  swapState,
}: {
  amount: string;
  setAmount: (value: string) => void;
  selectedAsset: string;
  setSelectedAsset: (value: string) => void;
  swapState: any;
}) {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <p>Please select the asset and amount you want to invest:</p>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <Input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 h-12 bg-[#17404C] border-[#B5CAA9/20] text-white [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            disabled={swapState.status !== "idle"}
          />
          <Select
            value={selectedAsset}
            onValueChange={setSelectedAsset}
            disabled={swapState.status !== "idle"}
          >
            <SelectTrigger className="flex-1 min-h-12 bg-[#17404C] border-[#B5CAA9/20] text-white">
              <SelectValue placeholder="Asset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USDC">USDC</SelectItem>
              <SelectItem value="USDT">USDT</SelectItem>
              <SelectItem value="ETH">ETH</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-white text-[0.8rem]">
          Value in USD: ${amount ? (parseFloat(amount) * 1).toFixed(2) : "0.00"}
        </p>
      </div>

      {swapState.status !== "idle" && <SwapProgress swapState={swapState} />}

      <div className="flex justify-center">
        <div className="w-12 h-12 rounded-full bg-[#17404C] border border-[#B5CAA9/20] flex items-center justify-center">
          <ArrowDown className="w-5 h-5 text-white" />
        </div>
      </div>
      <Card className="bg-[#102E37] border border-[#B5CAA9/20] gap-4 items-center p-3">
        <p className="text-white text-1rem">
          Earn with MEV Capital (7.07%) on Base
        </p>
      </Card>
    </div>
  );
}

// Component built from the above code to create the layout for a user making a new investment

function InvestLayout() {
  const { address } = useAccount();
  const chainId = useChainId();

  const {
    swapState,
    initiateSwap,
    resetState,
    completeInvestment,
    isSwapping,
    isSwapComplete,
    isInvesting,
    hasError,
    // New hook state
    amount,
    setAmount,
    isValidAmount,
    isApprovePending,
    isDepositPending,
    isLoadingApprove,
    isLoadingDeposit,
    writeApproveError,
    writeDepositError,
  } = useCrossChainSwap();

  const [selectedAsset, setSelectedAsset] = useState("USDC");

  const handleConfirm = async () => {
    if (!address) {
      alert("Please connect your wallet first");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (!selectedAsset) {
      alert("Please select an asset");
      return;
    }

    try {
      // Start cross-chain swap + Morpho investment flow
      await initiateSwap(amount, selectedAsset);
    } catch (error) {
      console.error("Investment error:", error);
      alert("Investment failed. Please try again.");
    }
  };

  // Determine button state and text
  const getButtonState = () => {
    if (hasError) {
      return {
        text: "Retry",
        loading: false,
        disabled: false,
        onClick: () => {
          resetState();
          handleConfirm();
        },
      };
    }

    if (isSwapping) {
      return {
        text: swapState.message || "In Progress...",
        loading: true,
        disabled: true,
        onClick: undefined,
      };
    }

    if (!isValidAmount) {
      return {
        text: "Enter Amount",
        loading: false,
        disabled: true,
        onClick: undefined,
      };
    }

    return {
      text: "Confirm",
      loading: false,
      disabled: !amount,
      onClick: handleConfirm,
    };
  };

  const buttonState = getButtonState();

  return (
    <div className="flex flex-col gap-6">
      <InvestHeader />
      <CurrentChain />
      <InvestSteps
        amount={amount}
        setAmount={setAmount}
        selectedAsset={selectedAsset}
        setSelectedAsset={setSelectedAsset}
        swapState={swapState}
      />
      <ButtonSection
        buttonText={buttonState.text}
        onClick={buttonState.onClick}
        disabled={buttonState.disabled}
        loading={buttonState.loading}
      />
    </div>
  );
}

// Component for the withdraw section of the manage view

function WithdrawSection() {
  const [amount, setAmount] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("USDC");
  const { swapState } = useCrossChainSwap();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 mt-2">
        <Card className="bg-[#102E37] border border-[#B5CAA9/20] gap-4 items-center p-3">
          <p className="text-white text-1rem">
            Earn with MEV Capital (7.07%) on Base
          </p>
        </Card>
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full bg-[#17404C] border border-[#B5CAA9/20] flex items-center justify-center">
            <ArrowDown className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="flex flex-col gap-0">
          <p>Please select the asset and amount you want to withdraw:</p>
          <p>You may swap this into another asset if you like:</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 h-12 bg-[#17404C] border-[#B5CAA9/20] text-white [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Select value={selectedAsset} onValueChange={setSelectedAsset}>
              <SelectTrigger className="flex-1 min-h-12 bg-[#17404C] border-[#B5CAA9/20] text-white">
                <SelectValue placeholder="Asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USDC">USDC</SelectItem>
                <SelectItem value="USDT">USDT</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="WBTC">WBTC</SelectItem>
                <SelectItem value="DAI">DAI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-white text-[0.8rem]">
            Value in USD: $
            {amount ? (parseFloat(amount) * 1).toFixed(2) : "0.00"}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full mt-4">
          <p>Please select the chain you would like to withdraw to:</p>
          <Select>
            <SelectTrigger className="w-full min-h-12 bg-[#17404C] border-[#B5CAA9/20] text-white">
              <SelectValue placeholder="Chain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="base">Base</SelectItem>
              <SelectItem value="ethereum">Ethereum</SelectItem>
              <SelectItem value="polygon">Polygon</SelectItem>
              <SelectItem value="arbitrum">Arbitrum</SelectItem>
              <SelectItem value="optimism">Optimism</SelectItem>
              <SelectItem value="avalanche">Avalanche</SelectItem>
              <SelectItem value="gnosis">Gnosis</SelectItem>
              <SelectItem value="bsc">BSC</SelectItem>
              <SelectItem value="fantom">Fantom</SelectItem>
              <SelectItem value="celo">Celo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <ButtonSection buttonText="Withdraw" />
    </div>
  );
}

// Component for the add section of the manage view
// It is very similar to the InvestLayout, but it utilised in ManageLayout differently

function AddSection() {
  const [amount, setAmount] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("USDC");
  const { swapState } = useCrossChainSwap();

  return (
    <div className="flex flex-col gap-4">
      <CurrentChain />
      <InvestSteps
        amount={amount}
        setAmount={setAmount}
        selectedAsset={selectedAsset}
        setSelectedAsset={setSelectedAsset}
        swapState={swapState}
      />
      <ButtonSection buttonText="Add" />
    </div>
  );
}

// The main layout for the managed view
// Comprised different components from above and has tabs to switch between add and withdraw

function ManageLayout() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-4 items-center">
          <p>Manage your investment</p>
          <p className="text-light-green">Current Balance: $1,200.00</p>
        </div>
        <InvestHeader />
        <ClaimRewards />
      </div>
      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#17404C] border border-[#B5CAA9/20] h-12 mb-4 ">
          <TabsTrigger
            value="add"
            className=" text-white data-[state=active]:bg-light-green data-[state=active]:text-black cursor-pointer"
          >
            Add Funds
          </TabsTrigger>
          <TabsTrigger
            value="withdraw"
            className=" text-white data-[state=active]:bg-light-green data-[state=active]:text-black cursor-pointer"
          >
            Withdraw Funds
          </TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <AddSection />
        </TabsContent>
        <TabsContent value="withdraw">
          <WithdrawSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// The main component that is used to render the different views

export default function InvestmentInteraction({
  type,
}: InvestmentInteractionProps) {
  const renderContent = () => {
    switch (type) {
      case "invest":
        return <InvestLayout />;
      case "manage":
        return <ManageLayout />;
      default:
        return <p>Investment type: {type}</p>;
    }
  };

  return (
    <>
      <div className="py-4">{renderContent()}</div>
    </>
  );
}
