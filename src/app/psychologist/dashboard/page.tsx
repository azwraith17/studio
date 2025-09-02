
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockPsychologistClients } from "@/lib/data";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PsychologistDashboard() {
  return (
    <div className="space-y-6">
       <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Psychologist Dashboard</h1>
          <p className="text-muted-foreground">Oversee your clients' progress and history.</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Client Roster</CardTitle>
          <CardDescription>A list of clients under your care.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Last Test Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPsychologistClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{format(parseISO(client.lastTestDate), "MMMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                       <Link href={`/psychologist/clients/${client.id}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4" />
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
