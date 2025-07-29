"use client"

import * as React from "react"
import { Area, CartesianGrid, XAxis, ComposedChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  { date: "2024-04-01", stablecoinBalance: 15420, rewardsGenerated: 5000 },
  { date: "2024-04-02", stablecoinBalance: 15545, rewardsGenerated: 5033 },
  { date: "2024-04-03", stablecoinBalance: 15672, rewardsGenerated: 5067 },
  { date: "2024-04-04", stablecoinBalance: 15801, rewardsGenerated: 5100 },
  { date: "2024-04-05", stablecoinBalance: 15933, rewardsGenerated: 5133 },
  { date: "2024-04-06", stablecoinBalance: 16067, rewardsGenerated: 5167 },
  { date: "2024-04-07", stablecoinBalance: 16203, rewardsGenerated: 5200 },
  { date: "2024-04-08", stablecoinBalance: 16341, rewardsGenerated: 5233 },
  { date: "2024-04-09", stablecoinBalance: 16481, rewardsGenerated: 5267 },
  { date: "2024-04-10", stablecoinBalance: 16623, rewardsGenerated: 5300 },
  { date: "2024-04-11", stablecoinBalance: 16768, rewardsGenerated: 5333 },
  { date: "2024-04-12", stablecoinBalance: 16915, rewardsGenerated: 5367 },
  { date: "2024-04-13", stablecoinBalance: 17064, rewardsGenerated: 5400 },
  { date: "2024-04-14", stablecoinBalance: 17216, rewardsGenerated: 5433 },
  { date: "2024-04-15", stablecoinBalance: 17370, rewardsGenerated: 5467 },
  { date: "2024-04-16", stablecoinBalance: 17526, rewardsGenerated: 5500 },
  { date: "2024-04-17", stablecoinBalance: 17685, rewardsGenerated: 5533 },
  { date: "2024-04-18", stablecoinBalance: 17846, rewardsGenerated: 5567 },
  { date: "2024-04-19", stablecoinBalance: 18009, rewardsGenerated: 5600 },
  { date: "2024-04-20", stablecoinBalance: 18175, rewardsGenerated: 5633 },
  { date: "2024-04-21", stablecoinBalance: 18343, rewardsGenerated: 5667 },
  { date: "2024-04-22", stablecoinBalance: 18513, rewardsGenerated: 5700 },
  { date: "2024-04-23", stablecoinBalance: 18686, rewardsGenerated: 5733 },
  { date: "2024-04-24", stablecoinBalance: 18861, rewardsGenerated: 5767 },
  { date: "2024-04-25", stablecoinBalance: 19039, rewardsGenerated: 5800 },
  { date: "2024-04-26", stablecoinBalance: 19219, rewardsGenerated: 5833 },
  { date: "2024-04-27", stablecoinBalance: 19401, rewardsGenerated: 5867 },
  { date: "2024-04-28", stablecoinBalance: 19586, rewardsGenerated: 5900 },
  { date: "2024-04-29", stablecoinBalance: 19773, rewardsGenerated: 5933 },
  { date: "2024-04-30", stablecoinBalance: 19963, rewardsGenerated: 5967 },
  { date: "2024-05-01", stablecoinBalance: 20155, rewardsGenerated: 6000 },
  { date: "2024-05-02", stablecoinBalance: 20350, rewardsGenerated: 6033 },
  { date: "2024-05-03", stablecoinBalance: 20547, rewardsGenerated: 6067 },
  { date: "2024-05-04", stablecoinBalance: 20747, rewardsGenerated: 6100 },
  { date: "2024-05-05", stablecoinBalance: 20949, rewardsGenerated: 6133 },
  { date: "2024-05-06", stablecoinBalance: 21154, rewardsGenerated: 6167 },
  { date: "2024-05-07", stablecoinBalance: 21361, rewardsGenerated: 6200 },
  { date: "2024-05-08", stablecoinBalance: 21571, rewardsGenerated: 6233 },
  { date: "2024-05-09", stablecoinBalance: 21783, rewardsGenerated: 6267 },
  { date: "2024-05-10", stablecoinBalance: 21998, rewardsGenerated: 6300 },
  { date: "2024-05-11", stablecoinBalance: 22216, rewardsGenerated: 6333 },
  { date: "2024-05-12", stablecoinBalance: 22436, rewardsGenerated: 6367 },
  { date: "2024-05-13", stablecoinBalance: 22659, rewardsGenerated: 6400 },
  { date: "2024-05-14", stablecoinBalance: 22884, rewardsGenerated: 6433 },
  { date: "2024-05-15", stablecoinBalance: 23112, rewardsGenerated: 6467 },
  { date: "2024-05-16", stablecoinBalance: 23343, rewardsGenerated: 6500 },
  { date: "2024-05-17", stablecoinBalance: 23576, rewardsGenerated: 6533 },
  { date: "2024-05-18", stablecoinBalance: 23812, rewardsGenerated: 6567 },
  { date: "2024-05-19", stablecoinBalance: 24051, rewardsGenerated: 6600 },
  { date: "2024-05-20", stablecoinBalance: 24292, rewardsGenerated: 6633 },
  { date: "2024-05-21", stablecoinBalance: 24536, rewardsGenerated: 6667 },
  { date: "2024-05-22", stablecoinBalance: 24783, rewardsGenerated: 6700 },
  { date: "2024-05-23", stablecoinBalance: 25032, rewardsGenerated: 6733 },
  { date: "2024-05-24", stablecoinBalance: 25284, rewardsGenerated: 6767 },
  { date: "2024-05-25", stablecoinBalance: 25539, rewardsGenerated: 6800 },
  { date: "2024-05-26", stablecoinBalance: 25797, rewardsGenerated: 6833 },
  { date: "2024-05-27", stablecoinBalance: 26057, rewardsGenerated: 6867 },
  { date: "2024-05-28", stablecoinBalance: 26320, rewardsGenerated: 6900 },
  { date: "2024-05-29", stablecoinBalance: 26586, rewardsGenerated: 6933 },
  { date: "2024-05-30", stablecoinBalance: 26855, rewardsGenerated: 6967 },
  { date: "2024-05-31", stablecoinBalance: 27126, rewardsGenerated: 7000 },
  { date: "2024-06-01", stablecoinBalance: 27400, rewardsGenerated: 7033 },
  { date: "2024-06-02", stablecoinBalance: 27677, rewardsGenerated: 7067 },
  { date: "2024-06-03", stablecoinBalance: 27957, rewardsGenerated: 7100 },
  { date: "2024-06-04", stablecoinBalance: 28240, rewardsGenerated: 7133 },
  { date: "2024-06-05", stablecoinBalance: 28525, rewardsGenerated: 7167 },
  { date: "2024-06-06", stablecoinBalance: 28813, rewardsGenerated: 7200 },
  { date: "2024-06-07", stablecoinBalance: 29104, rewardsGenerated: 7233 },
  { date: "2024-06-08", stablecoinBalance: 29398, rewardsGenerated: 7267 },
  { date: "2024-06-09", stablecoinBalance: 29695, rewardsGenerated: 7300 },
  { date: "2024-06-10", stablecoinBalance: 29995, rewardsGenerated: 7333 },
  { date: "2024-06-11", stablecoinBalance: 30297, rewardsGenerated: 7367 },
  { date: "2024-06-12", stablecoinBalance: 30602, rewardsGenerated: 7400 },
  { date: "2024-06-13", stablecoinBalance: 30910, rewardsGenerated: 7433 },
  { date: "2024-06-14", stablecoinBalance: 31221, rewardsGenerated: 7467 },
  { date: "2024-06-15", stablecoinBalance: 31535, rewardsGenerated: 7500 },
  { date: "2024-06-16", stablecoinBalance: 31852, rewardsGenerated: 7533 },
  { date: "2024-06-17", stablecoinBalance: 32172, rewardsGenerated: 7567 },
  { date: "2024-06-18", stablecoinBalance: 32495, rewardsGenerated: 7600 },
  { date: "2024-06-19", stablecoinBalance: 32821, rewardsGenerated: 7633 },
  { date: "2024-06-20", stablecoinBalance: 33150, rewardsGenerated: 7667 },
  { date: "2024-06-21", stablecoinBalance: 33482, rewardsGenerated: 7700 },
  { date: "2024-06-22", stablecoinBalance: 33817, rewardsGenerated: 7733 },
  { date: "2024-06-23", stablecoinBalance: 34155, rewardsGenerated: 7767 },
  { date: "2024-06-24", stablecoinBalance: 34496, rewardsGenerated: 7800 },
  { date: "2024-06-25", stablecoinBalance: 34840, rewardsGenerated: 7833 },
  { date: "2024-06-26", stablecoinBalance: 35187, rewardsGenerated: 7867 },
  { date: "2024-06-27", stablecoinBalance: 35537, rewardsGenerated: 7900 },
  { date: "2024-06-28", stablecoinBalance: 35890, rewardsGenerated: 7933 },
  { date: "2024-06-29", stablecoinBalance: 36246, rewardsGenerated: 7967 },
  { date: "2024-06-30", stablecoinBalance: 36605, rewardsGenerated: 8000 },
]

const chartConfig = {
  stablecoinBalance: {
    label: "Stablecoin Balance",
    color: "var(--chart-1)",
  },
  rewardsGenerated: {
    label: "Rewards Generated",
    color: "#22c55e",
  },
} satisfies ChartConfig

export default function UserStats() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0 w-full bg-[#102E37] border border-[#B5CAA9/20] mb-8">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Stablecoin Investment Performance</CardTitle>
          <CardDescription>
            Showing your stablecoin balance and rewards generated over time
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full min-w-0"
        >
          <ComposedChart data={filteredData}>
            <defs>
              <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-stablecoinBalance)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-stablecoinBalance)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillRewards" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#22c55e"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#22c55e"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="stablecoinBalance"
              type="natural"
              fill="url(#fillBalance)"
              stroke="var(--color-stablecoinBalance)"
            />
            <Area
              dataKey="rewardsGenerated"
              type="natural"
              fill="url(#fillRewards)"
              stroke="#22c55e"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}