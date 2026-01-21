import { useState } from "react";
import { devices } from "./devices";
import { MainCard } from "./components/home";
import SetupDialog from "./components/setup";
import { CalendarRange } from "lucide-react";

type Platform = "ios" | "android";
type Step = "platform" | "setup";

export function App() {
  const previewUrl = `/api/year-progress?width=1179&height=2556`;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState<Step>("platform");
  const [platform, setPlatform] = useState<Platform | null>(null);

  const handleOpenSetup = () => {
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
      <div className="p-4 rounded-lg bg-[#DC143C] text-white">
        <CalendarRange className="size-14" />
      </div>

      <MainCard previewUrl={previewUrl} onOpenSetup={handleOpenSetup} />
      <SetupDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        step={step}
        platform={platform}
        devices={devices}
        onSelectPlatform={handleSelectPlatform}
        onBack={handleBack}
      />
    </div>
  );
}

export default App;
