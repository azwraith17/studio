
"use client";

import { useParams } from 'next/navigation';
import { mockPsychologistClients, mockTestHistory, TestResult } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ClientDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const clientId = params.id;

  // In a real app, you'd fetch this data. Here, we'll filter mock data.
  const client = mockPsychologistClients.find(c => c.id === clientId);
  // This is a simplification. In a real app, you'd fetch tests for this specific client.
  const clientTests = mockTestHistory;

  const handleExport = (test: TestResult) => {
    toast({
        title: `Exporting Test ${test.id}...`,
        description: "The results are being prepared for download.",
    });

    let exportContent = `Test Report for ${client?.name}\n\n`;
    exportContent += `Test ID: ${test.id}\n`;
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
    link.download = `MindMetrics_Report_${client?.name}_${test.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!client) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Client not found</h1>
        <p className="text-muted-foreground">The requested client could not be found.</p>
        <Button asChild className="mt-4">
          <Link href="/psychologist/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
         <Button asChild variant="outline" size="icon">
          <Link href="/psychologist/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{client.name}'s History</h1>
          <p className="text-muted-foreground">Review your client's assessment history and results.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Test History</CardTitle>
          <CardDescription>A list of all assessments completed by {client.name}.</CardDescription>
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
              {clientTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">
                    <Badge variant={test.type === 'Depression' ? 'default' : 'secondary'}>{test.type}</Badge>
                  </TableCell>
                  <TableCell>{format(parseISO(test.date), "MMMM d, yyyy")}</TableCell>
                  <TableCell>{test.score} / {test.type === 'Depression' ? 63 : 21}</TableCell>
                  <TableCell className="text-right">
                     <Button variant="ghost" size="sm" onClick={() => handleExport(test)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Export
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
