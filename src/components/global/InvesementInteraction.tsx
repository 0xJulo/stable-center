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
import { ArrowDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";



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
  return (
    <Card className="bg-[#102E37] border border-[#B5CAA9/20] gap-4 items-start p-3">
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-white" />
        <p className="text-white text-1rem">
          You are currently connected to (Ethereum)
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



// Button component that can change based on where it is used
// It is currently utilised across all the different view of the component
// This will need to be hooked up to functions to perform the different actions

interface ButtonSectionProps {
  buttonText: string;
}

function ButtonSection({ buttonText }: ButtonSectionProps) {
  return (
    <div>
      <div className="flex flex-col gap-4 mt-6">
        {/* <h3>Invest Steps</h3> */}
        <p>You may be prompted to sign multiple transactions.</p>
        <Button className="w-full text-[1.25rem] h-12 bg-light-green text-black font-medium py-[1rem] cursor-pointer">
          {buttonText}
        </Button>
      </div>
    </div>
  );
}


// Component for the base of investing in a pool
// This will need to be update so that it shows the correct information
// such as what assets they can use, and also the name of the pool

function InvestSteps() {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <p>Please select the asset and amount you want to invest:</p>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <Input
            type="number"
            placeholder="Amount"
            className="flex-1 h-12 bg-[#17404C] border-[#B5CAA9/20] text-white [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Select>
            <SelectTrigger className="flex-1 min-h-12 bg-[#17404C] border-[#B5CAA9/20] text-white">
              <SelectValue placeholder="Asset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usdc">USDC</SelectItem>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="wbtc">WBTC</SelectItem>
              <SelectItem value="usdt">USDT</SelectItem>
              <SelectItem value="dai">DAI</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-white text-[0.8rem]">Value in USD: $1,200.00</p>
      </div>
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
  return (
    <div className="flex flex-col gap-6">
      <InvestHeader />
      <CurrentChain />
      <InvestSteps />
      <ButtonSection buttonText="Confirm" />
    </div>
  );
}


// Component for the withdraw section of the manage view

function WithdrawSection() {
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
              className="flex-1 h-12 bg-[#17404C] border-[#B5CAA9/20] text-white [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Select>
              <SelectTrigger className="flex-1 min-h-12 bg-[#17404C] border-[#B5CAA9/20] text-white">
                <SelectValue placeholder="Asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usdc">USDC</SelectItem>
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="wbtc">WBTC</SelectItem>
                <SelectItem value="usdt">USDT</SelectItem>
                <SelectItem value="dai">DAI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-white text-[0.8rem]">Value in USD: $1,200.00</p>
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
  return (
    <div className="flex flex-col gap-4">
      <CurrentChain />
      <InvestSteps />
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
