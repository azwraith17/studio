
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mockTestHistory } from "@/lib/data";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";

export default function TestHistoryPage() {
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
