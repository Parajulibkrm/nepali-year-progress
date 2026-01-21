import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import days from "@/assets/days.png";

interface MainCardProps {
  previewUrl: string;
  onOpenSetup: () => void;
}

export function MainCard({ onOpenSetup }: MainCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Days Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
          <img
            src={days}
            alt="Year Progress Preview"
            className="object-scale-down h-[500px]"
          />
      </CardContent>
      <CardFooter>
        <Button onClick={onOpenSetup} className="w-full" size="lg">
          Setup Lock Screen
        </Button>
      </CardFooter>
    </Card>
  );
}
