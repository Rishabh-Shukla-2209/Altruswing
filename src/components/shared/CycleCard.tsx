import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface CycleCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  fillClass: string;
}

export function CycleCard({
  icon,
  title,
  description,
  fillClass,
}: CycleCardProps) {
  return (
    <Card className="bg-surface-container-lowest border-none shadow-sm flex flex-col items-center text-center overflow-hidden">
      <CardHeader className="flex flex-col items-center space-y-6 pt-10 pb-2">
        <div className="w-20 h-20 rounded-full bg-secondary-fixed flex items-center justify-center text-primary">
          {icon}
        </div>
        <CardTitle className="font-headline text-2xl font-bold text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-10 grow flex flex-col justify-between">
        <p className="text-on-surface-variant text-sm leading-relaxed tracking-wide">
          {description}
        </p>
      </CardContent>
      {/* The progress bar element */}
      <div className="w-full h-1 bg-surface-container-low">
        <div className={`h-full impact-gradient ${fillClass}`} />
      </div>
    </Card>
  );
}
