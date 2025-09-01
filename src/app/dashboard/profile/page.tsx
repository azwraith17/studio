
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Profile Updated",
            description: "Your information has been successfully saved.",
        });
    };

  return (
    <div className="space-y-6">
       <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and personal information.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal and medical details.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="Client Name" />
                  </div>
                  <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="client@example.com" />
                  </div>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="Enter your age" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="medical-info">Medical Conditions or Current Medications</Label>
                    <Textarea id="medical-info" placeholder="e.g., Asthma, Allergy medication" rows={4} />
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
      </form>
       <form onSubmit={handleSubmit}>
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password here. Leave fields blank to keep your current password.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Update Password</Button>
            </CardFooter>
        </Card>
      </form>
    </div>
  );
}
