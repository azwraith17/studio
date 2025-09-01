
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";
import { mockTestHistory } from "@/lib/data";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function TestHistoryPage() {
  const { toast } = useToast();

  const handleExport = (testId: string) => {
    // This is a placeholder for a real export implementation
    toast({
        title: `Exporting Test ${testId}...`,
        description: "Your results are being prepared for download.",
    });
    console.log(`Exporting results for test ${testId}...`);
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
                  <TableCell>{test.score} / {test.maxScore}</TableCell>
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
                          <Link href={`/results/${test.id}?depressionScore=${test.score}`}>
                            <ArrowRight className="mr-2 h-4 w-4" />
                            View Results
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExport(test.id)}>
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
