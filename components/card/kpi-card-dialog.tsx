"use client";

import {Badge} from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {KpiData} from "@/lib/types";
import {LayoutGrid} from "lucide-react";
import {Separator} from "../ui/separator";

type KPICardDialogProps = KpiData & {
  children: React.ReactNode;
};

export function KPICardDialog({
  id,
  title,
  description,
  tags,
  stats,
  questions,
  children,
}: KPICardDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full text-center">
        <DialogTitle className="hidden">{title}</DialogTitle>
        <Card className="w-full border-none shadow-none">
          <CardHeader className="w-full">
            <div className="flex justify-center mb-4">
              <LayoutGrid className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <CardTitle className="text-xl font-semibold">{title}</CardTitle>
              <Badge variant="secondary" className="text-xs">
                Layout
              </Badge>
            </div>
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 w-full flex flex-col items-center justify-center">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-row text-sm w-full items-center justify-between gap-x-2">
              <div className="flex flex-col">
                <span className="font-medium">{stats.commits}</span>
                <span className="text-xs text-muted-foreground">Used</span>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="flex flex-col">
                <span className="font-medium">{stats.type}</span>
                <span className="text-xs text-muted-foreground">Type</span>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="flex flex-col">
                <span className="font-medium">{stats.pages}</span>
                <span className="text-xs text-muted-foreground">Pages No.</span>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="flex flex-col">
                <span className="font-medium">{stats.lastUpdated}</span>
                <span className="text-xs text-muted-foreground">
                  Last Updated
                </span>
              </div>
            </div>

            <div className="w-full h-48 rounded-lg border border-border bg-muted" />

            {/* Business Questions */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Business Questions</h4>
              <div className="space-y-1">
                {questions.map((question, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    {question}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
