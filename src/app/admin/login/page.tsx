
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    
    const success = await login(email, password);
    
    if (success) {
      router.push('/admin/dashboard');
    } else {
      toast({ title: "Login Failed", description: "Invalid email or password.", variant: "destructive" });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
       <div className="absolute top-6 left-6">
        <Logo />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Admin Portal</CardTitle>
          <CardDescription>Enter credentials to access the admin dashboard.</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@example.com" required defaultValue="admin@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
            </Button>
             <p className="text-xs text-center text-muted-foreground">
              Not an admin? Go to{' '}
              <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
                Client Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
