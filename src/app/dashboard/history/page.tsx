
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";
import { mockTestHistory, TestResult } from "@/lib/data";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function TestHistoryPage() {
  const { toast } = useToast();

  const handleExport = (test: TestResult) => {
    toast({
        title: `Exporting Test ${test.id}...`,
        description: "Your results are being prepared for download.",
    });

    let exportContent = `Test Report: ${test.id}\n`;
    exportContent += `Test Type: ${test.type}\n`;
    exportContent += `Date: ${format(parseISO(test.date), "MMMM d, yyyy")}\n`;
    exportContent += `Score: ${test.score} / ${test.maxScore}\n\n`;
    exportContent += `AI Summary:\n${test.summary}\n\n`;

    if (test.professionalAnalysis) {
      exportContent += `--- Professional Analysis ---\n`;
      exportContent += `Overview: ${test.professionalAnalysis.overview}\n\n`;
      exportContent += `Symptom Analysis: ${test.professionalAnalysis.symptomAnalysis}\n\n`;
      exportContent += `Potential Indicators: ${test.professionalAnalysis.potentialIndicators}\n\n`;
      exportContent += `Recommendations: ${test.professionalAnalysis.recommendations}\n`;
    }

    const blob = new Blob([exportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MindMetrics_Test_Report_${test.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
       <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Test History</h1>
        <p className="text-muted-foreground">Review your previously completed assessments.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Completed Tests</CardTitle>
          <CardDescription>Here is a list of all the tests you have taken.</CardDescription>
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
                  <TableCell>{test.score} / {test.type === 'Depression' ? 63 : 21}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/results/${test.id}?history=true`}>
                            <ArrowRight className="mr-2 h-4 w-4" />
                            View Results
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport(test)}>
                          <FileDown className="mr-2 h-4 w-4" />
                          Export
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
