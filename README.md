# Stable Center

The StableCenter application is designed to make investing in stablecoin DeFi protocols straightforward for new and everyday crypto users. 

**Problem Statement**

TODO: Finish putting content in

## Design

This project has been designed with a combination of Figma for rough ideas, basic layouts, and type and colour variables, as well as being directly improved and built upon in the code itself.

The Figma file containing mock ups and ideas can be found [here](https://www.figma.com/design/4tWJ2Lii0An49YPw2U9Wew/Unite-Defi--ETH-Global-?node-id=0-1&t=jNDP6wIM26SEUG9c-1).



## Main components

### Global components

- [Wallet connection](/src/components/ConnectButton.tsx) - `/src/components/ConnectButton.tsx`
    - Wallet connecion component using Rainbowkit
    - Login has been used instead of "connect", making it more user friendly for people not familiar with blockchain terminology
- [Header](/src/components/Header.tsx) - `/src/components/Header.tsx`
    - Header for the application, including wallet connect and application links

### Landing Page

The landing page of the application is designed to give users a bit of context into stablecoins, as well as the ability to login and start investing right away. 

**File structure:**

- [Main Page](/src/app/page.tsx) - `/src/app/page.tsx` 
    - The main page, comprised of the below components
- [Hero Component](/src/components//home/Hero.tsx) - `/src/components//home/Hero.tsx`
    - Contains the headline and subtitle
    - Has an instance of the [Connect Button](/src/components/ConnectButton.tsx) which allows user to login here
    - It will display the connection, as well as the value of the account in USD
- [How It Works](/src/components/home/HowItWorks.tsx) - `/src/components/home/HowItWorks.tsx`
    - Explainer section for the application
    - Three column section detailing relevant information for the user
- [Investment Card](/src/components/home/InvestmentCard.tsx) - `/src/components/home/InvestmentCard.tsx`
    - Component for showcasing DeFi investment opportunities
    - Includes information such as APY, the project name, risk and estimated fees
    - Has an input and invest button for users to quick invest
- [Top Investments](/src/components/home/TopInvestments.tsx) - `/src/components/home/TopInvestments.tsx`
    - A list of `InvestmentCard.tsx` components
