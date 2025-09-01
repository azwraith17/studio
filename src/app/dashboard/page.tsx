"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, PlusCircle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { mockTestHistory } from "@/lib/data";
import { format, parseISO } from "date-fns";

const chartData = mockTestHistory
  .slice()
  .reverse()
  .map(test => ({
    date: format(parseISO(test.date), "MMM d"),
    score: test.score,
  }));

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--primary))",
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
             <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Line
                    dataKey="score"
                    type="monotone"
                    stroke="var(--color-score)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--color-score)",
                      r: 4,
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test History</CardTitle>
          <CardDescription>View your previously completed assessments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTestHistory.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">
                     <Badge variant={test.type === 'Depression' ? 'default' : 'secondary'}>{test.type}</Badge>
                  </TableCell>
                  <TableCell>{format(parseISO(test.date), "MMMM d, yyyy")}</TableCell>
                  <TableCell>{test.score} / {test.maxScore}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                       <Link href={`/results/${test.id}`}>
                        View Results <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
