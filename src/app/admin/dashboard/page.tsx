
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Mock data for psychologists
const mockPsychologists = [
  { id: 'psych-1', name: 'Dr. Evelyn Reed', email: 'e.reed@example.com', status: 'Active', clients: 15 },
  { id: 'psych-2', name: 'Dr. Samuel Green', email: 's.green@example.com', status: 'Active', clients: 12 },
  { id: 'psych-3', name: 'Dr. Olivia Blue', email: 'o.blue@example.com', status: 'Inactive', clients: 0 },
];

export default function AdminDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreatePsychologist = (e: React.FormEvent) => {
      e.preventDefault();
      // In a real app, you'd handle form submission to your backend here.
      setIsDialogOpen(false);
      toast({
          title: "Account Created",
          description: "The new psychologist account has been successfully created.",
      })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage psychologists and oversee the platform.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New Psychologist
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Psychologist</DialogTitle>
              <DialogDescription>
                Create a new psychologist account. They will receive an email to set up their password.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreatePsychologist}>
                <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                    Name
                    </Label>
                    <Input id="name" placeholder="Dr. John Doe" className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                    Email
                    </Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" className="col-span-3" required/>
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                    Temporary Password
                    </Label>
                    <Input id="password" type="password" className="col-span-3" required/>
                </div>
                </div>
                 <DialogFooter>
                    <Button type="submit">Create Account</Button>
                </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Psychologist Management</CardTitle>
          <CardDescription>A list of all psychologist accounts on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Clients</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPsychologists.map((psych) => (
                <TableRow key={psych.id}>
                  <TableCell className="font-medium">{psych.name}</TableCell>
                  <TableCell>{psych.email}</TableCell>
                  <TableCell>
                      <Badge variant={psych.status === 'Active' ? 'default' : 'secondary'}>{psych.status}</Badge>
                  </TableCell>
                  <TableCell>{psych.clients}</TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Deactivate</DropdownMenuItem>
                         <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
