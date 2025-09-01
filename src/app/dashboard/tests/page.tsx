
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Combine, FileText } from "lucide-react";

const combinationTests = [
     {
        name: "Standard Combination",
        description: "Take the Depression (BDI) and Anxiety (GAD-7) assessments together for a comprehensive view of your current well-being.",
        href: "/test/depression?name=Client%20Name&email=client@example.com",
        icon: <Combine className="w-8 h-8 mb-4 text-primary" />
    }
]

const individualTests = [
    {
        name: "Depression (BDI)",
        description: "A 21-question assessment based on the Beck Depression Inventory to screen for symptoms of depression.",
        href: "/test/depression?name=Client%20Name&email=client@example.com",
        icon: <FileText className="w-8 h-8 mb-4 text-primary" />
    },
    {
        name: "Anxiety (GAD-7)",
        description: "A 7-question assessment based on the GAD-7 scale to screen for symptoms of generalized anxiety disorder.",
        href: "/test/anxiety?name=Client%20Name&email=client@example.com",
        icon: <FileText className="w-8 h-8 mb-4 text-primary" />
    }
]


export default function TestsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Available Assessments</h1>
        <p className="text-muted-foreground">Choose an assessment to begin.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Featured Combinations</h2>
        <div className="grid gap-6 md:grid-cols-2">
            {combinationTests.map(test => (
                <Card key={test.name}>
                    <CardHeader>
                        {test.icon}
                        <CardTitle>{test.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{test.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                         <Button asChild>
                            <Link href={test.href}>Start Test <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Individual Assessments</h2>
        <div className="grid gap-6 md:grid-cols-2">
            {individualTests.map(test => (
                <Card key={test.name}>
                    <CardHeader>
                        {test.icon}
                        <CardTitle>{test.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{test.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button asChild>
                            <Link href={test.href}>Start Test <ArrowRight className="ml-2 h-4 w-4"/></Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      </section>
      
    </div>
  );
}
