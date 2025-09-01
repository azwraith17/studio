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
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function FinishSignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(searchParams.get('name') || '');
    setEmail(searchParams.get('email') || '');
  }, [searchParams]);

  const handleFinishSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the user with their password
    // and associate the previous test results.
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="absolute top-6 left-6">
        <Logo />
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Complete Your Account</CardTitle>
          <CardDescription>Just one more step to save your progress.</CardDescription>
        </CardHeader>
        <form onSubmit={handleFinishSignup}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} readOnly disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} readOnly disabled />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Choose a Password</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit">Create Account & Save</Button>
            <p className="text-sm text-center text-muted-foreground">
              By creating an account, you agree to our{' '}
              <Link href="#" className="font-semibold text-primary underline-offset-4 hover:underline">
                Terms
              </Link>.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
