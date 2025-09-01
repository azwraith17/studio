"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import Image from 'next/image';
import { BarChart, ClipboardCheck, History } from 'lucide-react';

export default function Home() {
  const [year, setYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b z-10 bg-background/95 backdrop-blur-sm sticky top-0">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Understand Your Mind, Track Your Wellness
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  MindMetrics provides confidential, evidence-based assessments to help you gain insight into your mental well-being and track your journey over time.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/start-test">Get Started</Link>
                </Button>
              </div>
            </div>
            <Image
              alt="A person meditating peacefully"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-lg"
              height="400"
              src="https://picsum.photos/600/400"
              width="600"
              data-ai-hint="peaceful meditation"
            />
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A simple, three-step process to begin your mental wellness journey.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <Card className="text-left shadow-md">
                <CardContent className="p-6">
                  <ClipboardCheck className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="text-xl font-bold">1. Take an Assessment</h3>
                  <p className="text-muted-foreground mt-2">Start with a confidential depression screening based on the Becker's Depression Inventory.</p>
                </CardContent>
              </Card>
              <Card className="text-left shadow-md">
                <CardContent className="p-6">
                  <BarChart className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="text-xl font-bold">2. View Your Results</h3>
                  <p className="text-muted-foreground mt-2">Receive your results in an easy-to-understand format, with an AI-powered summary and visualizations.</p>
                </CardContent>
              </Card>
              <Card className="text-left shadow-md">
                <CardContent className="p-6">
                  <History className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="text-xl font-bold">3. Track Your Progress</h3>
                  <p className="text-muted-foreground mt-2">Create an account to see your test history and track how your well-being changes over time.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; {year} MindMetrics. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
