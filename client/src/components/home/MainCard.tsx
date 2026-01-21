import { Button } from "../ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "../ui/card";

interface MainCardProps {
    previewUrl: string;
    onOpenSetup: () => void;
}

export function MainCard({ previewUrl, onOpenSetup }: MainCardProps) {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div>
                        <CardTitle className="text-2xl">Nepali Year Progress</CardTitle>
                        <CardDescription>
                            Track the progress of the Nepali year with a beautiful lock screen wallpaper that updates daily.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="aspect-9/16 max-h-80 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                        src={previewUrl}
                        alt="Year Progress Preview"
                        className="w-full h-full object-contain"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={onOpenSetup} className="w-full" size="lg">
                    Setup Lock Screen
                </Button>
            </CardFooter>
        </Card>
    );
}
