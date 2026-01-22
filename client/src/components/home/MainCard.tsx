import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "../ui/card";
import { Calendar, LayoutGrid } from "lucide-react";
import days from "@/assets/days.png";
import months from "@/assets/months.png";

type WallpaperType = "days" | "months";

interface MainCardProps {
  onOpenSetup: (type: WallpaperType) => void;
}

export function MainCard({ onOpenSetup }: MainCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl px-4">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-5 text-primary" />
            Days Grid
          </CardTitle>
          <CardDescription>
            A minimal grid of dots representing each day of the year.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center min-h-[300px] bg-muted/30 rounded-md mt-0 overflow-hidden">
          <img
            src={days}
            alt="Days Progress Preview"
            className="object-scale-down h-[400px] hover:scale-105 transition-transform duration-500"
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => onOpenSetup("days")}
            className="w-full"
            variant={"outline"}
          >
            Setup Days Grid
          </Button>
        </CardFooter>
      </Card>

      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutGrid className="size-5 text-primary" />
            Months Grid
          </CardTitle>
          <CardDescription>
            A grid of months, showing progress within each month.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center min-h-[300px] bg-muted/30 rounded-md mt-0 overflow-hidden">
          <img
            src={months}
            alt="Months Progress Preview"
            className="object-scale-down h-[400px] hover:scale-105 transition-transform duration-500"
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => onOpenSetup("months")}
            className="w-full"
            variant="outline"
          >
            Setup Months Grid
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
