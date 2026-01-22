import { useState } from "react";
import { devices } from "./devices";
import { MainCard, Footer, Header } from "./components/home";
import SetupDialog from "./components/setup";
import { DevTestView } from "./components/dev/DevTestView";
import { Toaster } from "./components/ui/sonner";

type Platform = "ios" | "android";
type Step = "platform" | "setup";
type WallpaperType = "days" | "months";

export function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState<Step>("platform");
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [wallpaperType, setWallpaperType] = useState<WallpaperType>("days");

  const handleOpenSetup = (type: WallpaperType) => {
    setWallpaperType(type);
    setDialogOpen(true);
    setStep("platform");
    setPlatform(null);
  };

  const handleSelectPlatform = (p: Platform) => {
    setPlatform(p);
    setStep("setup");
  };

  const handleBack = () => {
    if (step === "setup") {
      setStep("platform");
      setPlatform(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 flex-col gap-4">
      <Header />

      <MainCard onOpenSetup={handleOpenSetup} />
      <Footer />
      <SetupDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        step={step}
        platform={platform}
        wallpaperType={wallpaperType}
        devices={devices}
        onSelectPlatform={handleSelectPlatform}
        onBack={handleBack}
      />

      <Toaster />

      {import.meta.env.DEV && <DevTestView />}
    </div>
  );
}

export default App;
