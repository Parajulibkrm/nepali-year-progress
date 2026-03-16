import { Dialog, DialogContent } from "../ui/dialog";
import { PlatformSelection } from "./PlatformSelection";
import { DeviceSetup } from "./DeviceSetup";
import {
  type DeviceSpec as Device,
  type Platform,
  type WallpaperType,
} from "@/lib/types";
type Step = "platform" | "setup";

interface SetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step: Step;
  platform: Platform | null;
  wallpaperType: WallpaperType;
  devices: Device[];
  onSelectPlatform: (platform: Platform) => void;
  onBack: () => void;
}

export default function SetupDialog({
  open,
  onOpenChange,
  step,
  platform,
  wallpaperType,
  devices,
  onSelectPlatform,
  onBack,
}: SetupDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        {step === "platform" && (
          <PlatformSelection onSelectPlatform={onSelectPlatform} />
        )}
        {step === "setup" && platform && (
          <DeviceSetup
            platform={platform}
            devices={devices}
            wallpaperType={wallpaperType}
            onBack={onBack}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
