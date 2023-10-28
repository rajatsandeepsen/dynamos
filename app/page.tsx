"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, DraftingCompass } from "lucide-react";
import Link from "next/link";

export default function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl px-3">
        <div className="flex flex-col gap-16 items-center">
          <div className="flex gap-8 justify-center items-center">
            <h1 className="text-2xl flex gap-3">TEAM NEXUS
              <DraftingCompass />
            </h1>
          </div>
          <p className="text-4xl lg:text-5xl !leading-tight mx-auto max-w-2xl text-center">
            Streamline Your Workforce, Effortlessly Manage Tasks
          </p>
          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
        </div>
        <main className="flex flex-col gap-6">
          <Button asChild>
            <Link href="/dashboard">
              Go to Dashboard <ChevronRight size={20} />
            </Link>
          </Button>
        </main>
      </div>
    </div>
  );
}
