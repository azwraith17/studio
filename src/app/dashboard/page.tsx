
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { mockTestHistory } from "@/lib/data";
import { format, parseISO } from "date-fns";

const chartData = mockTestHistory
  .slice()
  .reverse()
  .map(test => ({
    date: format(parseISO(test.date), "MMM d"),
    depression: test.type === 'Depression' ? test.score : null,
    anxiety: test.type === 'Anxiety' ? test.score : null,
  }));

const chartConfig = {
  depression: {
    label: "Depression",
    color: "hsl(var(--primary))",
  },
  anxiety: {
    label: "Anxiety",
    color: "hsl(var(--chart-2))",
  },
};

export default function ClientDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground">Here&apos;s a summary of your recent activity and progress.</p>
        </div>
        <Button asChild size="lg">
          <Link href="/test/depression">
            <PlusCircle className="mr-2 h-5 w-5" />
            Start New Test
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>This chart shows your test scores over time.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 20,
                    left: -10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                    <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    domain={[0, 'dataMax + 5']}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Legend />
                  <Line
                    dataKey="depression"
                    type="monotone"
                    stroke="var(--color-depression)"
                    strokeWidth={2}
                    dot={true}
                    connectNulls={false}
                  />
                   <Line
                    dataKey="anxiety"
                    type="monotone"
                    stroke="var(--color-anxiety)"
                    strokeWidth={2}
                    dot={true}
                    connectNulls={false}
                  />
                </LineChart>
              </ChartContainer>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
