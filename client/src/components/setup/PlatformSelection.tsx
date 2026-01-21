import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";


type Platform = "ios" | "android";

interface PlatformSelectionProps {
    onSelectPlatform: (platform: Platform) => void;
}

export function PlatformSelection({ onSelectPlatform }: PlatformSelectionProps) {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Choose Your Platform</DialogTitle>
                <DialogDescription>
                    Select your device platform to get started with the setup.
                </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                    onClick={() => onSelectPlatform("ios")}
                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
                >
                    <svg
                        className="w-12 h-12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <span className="font-medium">iOS</span>
                    <span className="text-xs text-muted-foreground">
                        iPhone Shortcuts
                    </span>
                </button>
                <button
                    onClick={() => onSelectPlatform("android")}
                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg border border-border hover:border-primary hover:bg-muted transition-colors"
                >
                    <svg
                        className="w-12 h-12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24C14.86 8.32 13.47 8 12 8s-2.86.32-4.47.91L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48C3.3 11.25 1.28 14.44 1 18h22c-.28-3.56-2.3-6.75-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
                    </svg>
                    <span className="font-medium">Android</span>
                    <span className="text-xs text-muted-foreground">
                        MacroDroid
                    </span>
                </button>
            </div>
        </>
    );
}
