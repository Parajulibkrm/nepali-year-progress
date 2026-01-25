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
import Image, { StaticImageData } from "next/image";
import days from "@/assets/days.png";
import months from "@/assets/months.png";

type WallpaperType = "days" | "months";

interface MainCardProps {
  onOpenSetup: (type: WallpaperType) => void;
}

const items: {
  title: string;
  description: string;
  image: StaticImageData;
  type: WallpaperType;
  icon: React.ReactNode;
}[] = [
  {
    title: "Days Grid",
    description: "A minimal grid of dots representing each day of the year.",
    image: days,
    type: "days",
    icon: <Calendar className="size-5" />,
  },
  {
    title: "Months Grid",
    description: "A grid of months, showing progress within each month.",
    image: months,
    type: "months",
    icon: <LayoutGrid className="size-5" />,
  },
];
export function MainCard({ onOpenSetup }: MainCardProps) {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-4xl gap-4">
      {items.map((item) => (
        <Card className="flex-1 flex flex-col" key={item.type}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {item.icon}
              {item.title}
            </CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center bg-[#1a1a1a] rounded-lg mt-0 overflow-hidden">
            <Image
              src={item.image}
              alt={`${item.title} Preview`}
              className="object-scale-down h-[400px] hover:scale-105 transition-transform duration-500"
            />
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => onOpenSetup(item.type)}
              className="w-full"
              variant={"default"}
            >
              Setup {item.title}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
